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
    <div className="py-3 desktop:py-[20px] flex flex-col gap-1">
      <Link href={`/post/${id}`}>
        <div className="cursor-pointer text-zinc-800 text-2xl font-normal leading-10 ">
          <h2 className="inline-block hover-underline">
            {title}
          </h2>
        </div>
      </Link>
      <div className="w-full max-h-[90px] justify-start line-clamp-3 gap-2.5 text-zinc-800 text-md font-normal leading-[30px]">
        {content}
      </div>
      <div className="flex">
        <TimeBar time={date} />
        <div className="ml-2 items-center flex">
          {
            tags.length <= 0 && <Tag val={'未归档'} />
          }
          {
            tags.map((tag, idx) => {
              if (idx > 3) return null;
              return <Tag key={tag} val={tag} />
            })
          }
          {
            tags.length > 3 && <Tag isMore />
          }
        </div>
      </div>
    </div>
  )
}
