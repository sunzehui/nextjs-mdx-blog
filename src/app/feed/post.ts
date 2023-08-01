'use server'
import { getAllPostsMeta } from '@/lib/mdx'
import { PostMeta } from '@/types/post'
import { time2timestamp } from '@/utils/time'


const getListByTag = async (tag: string) => {
  const metas = await getAllPostsMeta()
  return metas.filter((meta) => meta.tags.includes(tag))
}

interface GetListParams {
  tag?: string
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

  return archives as Record<string, PostMeta[]>
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

