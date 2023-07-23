import { getAllPostsMeta } from '@/lib/mdx'

export const getPostList = async () => {
  const posts = await getAllPostsMeta()
  return posts
}
