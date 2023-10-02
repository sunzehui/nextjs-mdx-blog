import { ReadTimeResults } from "reading-time"

export interface PostMeta {
  title: string
  date: Date
  desc: string
  slug: string
  id: string
  tags: string[]
  readingTime: ReadTimeResults
}

export interface PostDetail {
  mdxSource: any
  meta: PostMeta
}
