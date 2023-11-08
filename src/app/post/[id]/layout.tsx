
import { GapPoint, Tag } from '@/components/ui';
import { dateFormat, durationFormat } from '@/utils/time';
import { EnterAnimation } from '@/components/common';
import { getAllPostsMeta, getPost } from '@/lib/mdx';
import { FC, ReactNode } from 'react';
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostMeta } from '@/types/post';
import { Card } from '@/components/layout';
import TableOfContent from '@/components/ui/table-of-content';
import { ParsedUrlQuery } from 'querystring';
import RightSide from '@/components/layout/right-side';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

interface PostNavProps {
  prevPost: PostMeta | null
  nextPost: PostMeta | null
}
interface PostHeaderProps {
  post: PostMeta
}
const PostHeader: FC<PostHeaderProps> = ({ post }) => {
  return (
    <div>
      <h1 className="w-full text-zinc-800 dark:text-zinc-200 ">
        {post.title}
      </h1>
      <div className="text-neutral-500 text-md font-light ">
        发布日期：{dateFormat(post.date)}
        <GapPoint />
        {durationFormat(post.readingTime.time)}
        <GapPoint />
        {post.readingTime.words}字
      </div>
      <p className='mt-5'>
        {post.desc}
      </p>
      <span className='h-px bg-slate-300'></span>
    </div>
  )
}


interface PostContentProps {
  code: string
}

const PostFooter = ({ post }: { post: PostMeta }) => {
  return (
    <div className="w-full justify-between items-start inline-flex">
      <div className="w-full py-[3px] flex flex-wrap">
        {
          !post.tags && <Tag val={'未归档'} />
        }
        {
          post.tags && post.tags.map((tag, idx) => {
            return <Tag key={tag} val={tag} />
          })
        }
      </div>
    </div>
  )
}
interface PageParams extends ParsedUrlQuery {
  id: string
}
const LeftSide = () => {
  return (
    <div className="flex flex-col gap-5 break-words">
      <TableOfContent />
    </div>
  )
}
interface PostLayoutProps {
  params: PageParams;
  children: ReactNode
}
export default async function PagePostDetail({
  params,
  children
}: PostLayoutProps) {
  // @TODO: 适配旧版blog，待删除
  const id = params.id.endsWith('.html') ? params.id.slice(0, -5) : params.id

  const postPayload = await getPost(id).catch(e => notFound())
  const post = postPayload.meta

  return (
    <>
      <Header />
      <main className='flex blog-container mx-auto flex-col sm:flex-row'>
        <div className="flex-1 min-w-0 desktop:pr-6 pr-3 pb-3">
          <Card>
            <EnterAnimation>
              <PostHeader post={post} />
              {children}
              <PostFooter post={post} />
            </EnterAnimation>
          </Card>
        </div>
        <RightSide>
            <TableOfContent />
        </RightSide>
      </main>
      <Footer />
    </>
  )
}

export async function generateMetadata(
  { params }: { params: PageParams }
): Promise<Metadata> {
  const id = params.id.endsWith('.html') ? params.id.slice(0, -5) : params.id
  try {
    const post = await getPost(id)

    return {
      title: `${post.meta.title}-孙泽辉`,
      description: post.meta.desc || '',
    }
  } catch (e) {
    return {
      title: '404',
      description: 'not found'
    }
  }
}

export async function generateStaticParams() {
  const metas = await getAllPostsMeta()
  return metas.map(meta => {
    return { id: `${meta.id}.html` }
  })
}
