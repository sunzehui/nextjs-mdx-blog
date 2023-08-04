'use server'
import { getAllPostsMeta } from '@/lib/mdx'
import { PostMeta } from '@/types/post'


const getListByTag = async (tag: string) => {
  const metas = await getAllPostsMeta()
  return metas
    .filter(meta => meta.tags)
    .filter((meta) => meta.tags.includes(tag))
}

interface GetListParams {
  tag?: string
  page?: number
  size?: number
}
export const getList = async ({ tag }: GetListParams = {}) => {
  if (tag) {
    const postList = await getListByTag(tag)
    if (!postList.length) {
      throw new Error('Not Found')
    }
    return postList
  }

  return await getAllPostsMeta()
}
interface QueryPostsResult {
  posts: PostMeta[]
  pagination: {
    postCount: number
    pageCount: number
  }
}
export const getListWithPagination = async ({ page, size }: GetListParams = {}) => {
  const allPosts = await getList()
  let posts = allPosts
  if (page && size) {
    const start = (page - 1) * size
    const end = start + size
    posts = posts.slice(start, end)
  }
  const result: QueryPostsResult = {
    posts,
    pagination: {
      postCount: posts.length,
      pageCount: 1
    }
  }
  if (page && size) {
    result.pagination.pageCount = Math.ceil(allPosts.length / size)
  }
  return result
}

export interface Archives {
  [year: string]: PostMeta[];
}
export const getArchives = async () => {
  const metas = await getAllPostsMeta()
  const archives = metas
    .reduce((acc, cur) => {
      const year = cur.date.getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(cur)
      return acc
    }, {} as Record<string, any>)

  return archives as Archives
}

export const getTags = async () => {
  const metas = await getAllPostsMeta()
  const tags = metas.map((meta) => meta.tags)
    .flat()
    .reduce((acc, cur) => {
      if (!acc[cur]) {
        acc[cur] = 0
      }
      acc[cur]++
      return acc
    }, {} as Record<string, number>)
  const tagsList = Object.keys(tags).map((tag) => {
    return {
      name: tag,
      count: tags[tag]
    }
  })
  return tagsList
}

