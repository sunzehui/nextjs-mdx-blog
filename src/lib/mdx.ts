import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import path from 'path'
import crc32 from 'crc/crc32'
import { PostDetail } from '@/types/post'
const rootDirectory = path.join(process.cwd(), 'posts')

export const getPostBySlug = async (slug: string) => {
  const realSlug = slug.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, `${realSlug}.mdx`)

  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data, content } = matter(fileContent)

  const id = crc32(realSlug).toString(16)

  return {
    meta: {
      ...data, slug: realSlug, id, readingTime: readingTime(content)
    },
    content: fileContent
  } as PostDetail
}

export const mapSlug = async (slug: string) => {
  const idMap = await getPostsIdMap()
  return idMap[slug]
}
export const getPostsIdMap = async () => {
  const files = fs.readdirSync(rootDirectory)
  const idMap = files.reduce((acc, cur) => {
    if (!cur.endsWith('.mdx')) {
      return acc
    }
    const realSlug = cur.replace(/\.mdx$/, '')
    return {
      ...acc,
      [crc32(realSlug).toString(16)]: cur
    }
  }, {})

  return idMap as Record<string, string>
}
export const getAllPostsMeta = async () => {
  const files = fs.readdirSync(rootDirectory)

  let metas = await Promise.all(files.map(async filename => {
    const { meta } = await getPostBySlug(filename)
    return meta
  }))
  return metas
}

export const getPostName = async (id: string) => {
  return await mapSlug(id)
}
export const getPost = async (id: string) => {
  // key to slug
  const slug = await getPostName(id);
  if (!slug) throw new Error('not found')
  const post = await getPostBySlug(slug)
  return post
}

