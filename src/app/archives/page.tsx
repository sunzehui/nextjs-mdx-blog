import { EnterAnimation } from "@/components/common"
import { OutlineContainer } from "@/components/layout"
import { PostMeta } from "@/types/post"
import { dateFormat } from "@/utils/time"
import { Metadata } from "next"
import Link from "next/link"
import { FC } from "react"
import { Archives, getArchives } from "@app/feed/post"

export const metadata: Metadata = {
  title: '归档-孙泽辉',
  description: '归档'
}

interface RecordProps {
  post: PostMeta
}
const Record: FC<RecordProps> = ({ post }) => {
  return (
    <div className="gap-2 flex">
      <div className="w-24 text-zinc-400 text-base font-normal leading-relaxed flex-shrink-0">{dateFormat(post.date)}</div>
      <Link href={`/post/${post.id}`}
        className="inline-block  text-black text-base font-normal leading-relaxed hover-underline  break-all flex-grow ">
        {post.title}
      </Link>
    </div >
  )
}

interface TitleProps {
  year: string
  num: number
}
const Title: FC<TitleProps> = ({ year, num }) => {
  return (
    <div className="Title  justify-start items-end inline-flex  ">
      <span className="text-black text-3xl font-bold leading-none">{year}</span>
      <div className="ml-2 text-neutral-500 text-base font-normal leading-none">[{num}]</div>
    </div>
  )
}

interface YearProps {
  year: string
  posts: PostMeta[]
}
const Year: FC<YearProps> = ({ year, posts }) => {
  return (
    <div className="Year self-stretch  flex-col justify-start items-start gap-2.5 flex">
      <EnterAnimation >
        <Title year={year} num={posts.length} />
      </EnterAnimation>
      {
        posts.map((post, idx) => {
          return (
            <EnterAnimation key={post.id} delay={Math.min(2, 0.1 + idx / 10)}>
              <Record key={post.id} post={post} />
            </EnterAnimation>
          )
        })
      }
    </div>
  )
}

interface YearsProps {
  years: string[];
  archives: Archives;
}
const Years: FC<YearsProps> = ({ years, archives }) => {
  return (
    <>
      {years.map((year) => {
        const posts = archives[year];
        return <Year key={year} year={year} posts={posts} />;
      })}
    </>
  );
};
export default async function Page() {
  const archives = await getArchives()
  const years = Object.keys(archives).sort((a, b) => parseInt(b) - parseInt(a))
  return (
    <OutlineContainer className={`flex flex-col gap-10`}>
      <Years years={years} archives={archives} />
    </OutlineContainer>
  )
}
