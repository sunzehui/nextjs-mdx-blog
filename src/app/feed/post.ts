'use server'
import { getAllPostsMeta } from '@/lib/mdx'

export const getList = async () => {
  return await getAllPostsMeta()
}
