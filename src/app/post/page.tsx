import { getList, getListWithPagination } from "@/app/feed/post"
import { Metadata } from "next";
import { EnterAnimation } from "@/components/common";
import { OutlineContainer } from "@/components/layout";
import { Post } from "@/components/ui";
import Link from "next/link";
import { clsxm } from "@/utils/helper";

export const metadata: Metadata = {
  title: '文章-孙泽辉',
  description: 'szh'
}

interface PageProps {
  searchParams: {
    page?: string
    size?: string
  }
}


export default async function PagePostList(props: PageProps) {
  const { page, size } = props?.searchParams || {}
  const nextPage = page ? parseInt(page) : 1
  const nextSize = size ? parseInt(size) : 10

  const { posts, postCount, pageCount } = await getListWithPagination({
    page: nextPage,
    size: nextSize
  })

  if (postCount === 0) {
    return (
      <OutlineContainer>
        <div className="text-center text-2xl font-bold leading-10 ">
          <h2 className="inline-block">
            暂无文章
          </h2>
        </div>
      </OutlineContainer>
    )
  }
  const isLastOrFirst = (page: number) => page <= 0 || page > pageCount
  const getNavCn = (page: number) => clsxm("btn px-9", isLastOrFirst(page) ? "btn-disabled" : "")
  return (
    <OutlineContainer>
      {
        posts.map((post, idx) => {
          return (
            <EnterAnimation key={post.id} delay={idx / 10}>
              <Post key={post.id} {...post} />
            </EnterAnimation>)
        })
      }

      <nav className="flex justify-between mt-4">
        <Link href={`/post?page=${nextPage - 1}`} className={getNavCn(nextPage - 1)} >
          上一页
        </Link>
        <Link href={`/post?page=${nextPage + 1}`} className={getNavCn(nextPage + 1)}>
          下一页
        </Link>
      </nav>

    </OutlineContainer>
  )
}

