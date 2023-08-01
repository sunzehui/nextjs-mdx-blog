import fs from 'fs'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import path from 'path'
import crc32 from 'crc/crc32'
import { PostDetail } from '@/types/post'
import { time2timestamp } from '@/utils/time'
const rootDirectory = path.join(process.cwd(), 'posts')

const isSupportPost = (slug: string) => {
  const ext = slug.split('.').pop() || ''
  return ['md', 'mdx'].includes(ext)
}
/**
 * 
 * @param slug like '2021-08-01-xxx.md' | '2021-08-01-xxx.mdx'
 * @returns 
 */
const getPostFileName = (slug: string) => {

  const ext = slug.split('.').pop() || ''
  if (!isSupportPost(slug)) throw new Error('not support')
  const slugPattern = new RegExp(`\.${ext}$`)
  const realSlug = slug.replace(slugPattern, '')

  return {
    name: realSlug,
    ext: ext
  }
}

export const getPostBySlug = async (slug: string) => {
  const { name: fileName, ext } = getPostFileName(slug)

  const filePath = path.join(rootDirectory, `${slug}`)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf8' })
  const { data, content } = matter(fileContent)

  const id = crc32(fileName).toString(16)

  return {
    meta: {
      ...data, slug: fileName, id, readingTime: readingTime(content)
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
  const idMap = files
    .filter(isSupportPost)
    .reduce((acc, cur) => {
      const { name: fileName } = getPostFileName(cur)
      return {
        ...acc,
        [crc32(fileName).toString(16)]: cur
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
  const sortedMetas = metas.map((meta) => ({
    ...meta,
    timestamp: time2timestamp(meta.date)
  }))
    .sort((a, b) => b.timestamp - a.timestamp)
  return sortedMetas
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

