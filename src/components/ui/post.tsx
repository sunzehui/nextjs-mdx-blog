import Link from "next/link"
import { TimeBar, Tag } from "@/components/ui"

export interface PostProps {
  id: number | string
  title: string
  desc: string
  tags: string[]
  date: Date
}
export const Post = ({ ...props }: PostProps) => {
  const { title, desc: content, tags, date, id } = props

  return (
    <div className="mb-3 flex flex-col gap-1">
      <Link href={`/post/${id}`}>
        <h1 className="cursor-pointer text-zinc-800 dark:text-zinc-200 leading-10">
          {title}
        </h1>
      </Link>
      <div className="w-full max-h-[90px] justify-start line-clamp-3 gap-2.5 text-zinc-800 dark:text-base-content text-md font-normal leading-[30px]">
        {content}
      </div>
      <div className="flex flex-wrap">
        <TimeBar time={date} />

        {
          !tags && <Tag val={'未归档'} />
        }
        {
          tags && tags.map((tag, idx) => {
            if (idx > 3) return null;
            return <Tag key={tag} val={tag} />
          })
        }
        {
          tags && tags.length && tags.length > 3 && <Tag isMore />
        }
      </div>
    </div>
  )
}
