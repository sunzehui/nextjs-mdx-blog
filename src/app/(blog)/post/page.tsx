import { getList, getListWithPagination } from "@/app/feed/post"
import { Metadata } from "next";
import { EnterAnimation } from "@/components/common";
import { Card } from "@/components/layout";
import { Post } from "@/components/ui";
import Link from "next/link";
import { clsxm } from "@/utils/helper";
import { PostMeta } from "@/types/post";
import { FC } from "react";

export const metadata: Metadata = {
  title: '文章-孙泽辉',
  description: 'szh'
}

const NoArticlesMessage = () => {
  return (
    <Card className="flex-1">
      <div className="text-center text-2xl font-bold leading-10">
        <h2 className="inline-block">
          暂无文章
        </h2>
      </div>
    </Card>
  );
};

interface PostListProps {
  posts: PostMeta[];
}

const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post, idx) => (
        <EnterAnimation key={post.id} delay={idx / 10}>
          <Post key={post.id} {...post} />
        </EnterAnimation>
      ))}
    </>
  );
};


interface PaginationProps {
  nextPage: number;
  pagination: {
    pageCount: number;
    postCount: number;
  }
}

const Pagination: React.FC<PaginationProps> = ({ nextPage, pagination }) => {
  const { pageCount } = pagination
  const isLastOrFirst = (page: number) => page <= 0 || page > pageCount
  const getNavCn = (page: number) => clsxm("btn px-9", isLastOrFirst(page) ? "hidden" : "")

  return (
    <nav className="flex justify-between mt-4">
      <Link href={`/post?page=${nextPage - 1}`} className={getNavCn(nextPage - 1)}>
        上一页
      </Link>
      <Link href={`/post?page=${nextPage + 1}`} className={getNavCn(nextPage + 1)}>
        下一页
      </Link>
    </nav>
  );
};

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

  const { posts, pagination } = await getListWithPagination({
    page: nextPage,
    size: nextSize
  })

  if (pagination.postCount === 0) return <NoArticlesMessage />

  return (
    <Card className="">
      <PostList posts={posts} />
      <Pagination nextPage={nextPage} pagination={pagination} />
    </Card>
  )
}

