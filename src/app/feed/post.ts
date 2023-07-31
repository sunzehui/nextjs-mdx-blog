'use server'
import { getAllPostsMeta } from '@/lib/mdx'
import { PostMeta } from '@/types/post'
import { time2timestamp } from '@/utils/time'

export const getList = async () => {
  return await getAllPostsMeta()
}

export const getArchives = async () => {
  const metas = await getAllPostsMeta()
  const archives = metas.map((meta) => {
    return {
      ...meta,
      timestamp: time2timestamp(meta.date)
    }
  })
    .sort((a, b) => b.timestamp - a.timestamp)
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
