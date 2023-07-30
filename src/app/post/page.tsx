import { getList } from "@/app/feed/post"
import Link from "next/link"
import { TimeBar, Tag } from "@/components/ui"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '孙泽辉-文章',
}

interface PostProps {
  id: number | string
  title: string
  desc: string
  tags: string[]
  date: string
}
const Post = ({ ...props }: PostProps) => {
  const { title, desc: content, tags, date: time, id } = props

  return (
    <div className="py-3 desktop:py-[20px] flex flex-col gap-1">
      <Link href={`/post/${id}`}>
        <div className="w-full cursor-pointer text-zinc-800 text-2xl font-normal leading-10">
          {title}
        </div>
      </Link>
      <div className="w-full max-h-[90px] justify-start line-clamp-3 gap-2.5 text-zinc-800 text-md font-normal leading-[30px]">
        {content}
      </div>
      <div className="flex">
        <TimeBar time={time} />
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


export default async function Home() {
  const posts = await getList()

  return (
    <div className="w-full desktop:px-[20px] px-3 bg-white rounded-lg shadow border border-slate-300 flex flex-col">
      {
        posts.map(post => {
          return <Post key={post.id} {...post} />
        })
      }
    </div>
  )
}

