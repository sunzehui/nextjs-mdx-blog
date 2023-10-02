
import { GapPoint, Tag } from '@/components/ui';
import { dateFormat, durationFormat } from '@/utils/time';
import { EnterAnimation } from '@/components/common';
import { getAllPostsMeta, getPost, Markdown } from '@/lib/mdx';
import { FC, ReactNode, Suspense, useMemo } from 'react';
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PostMeta } from '@/types/post';
import { OutlineContainer } from '@/components/layout';
import { ParsedUrlQuery } from 'querystring';
import { getMDXComponent } from 'mdx-bundler/client'

interface PostNavProps {
  prevPost: PostMeta | null
  nextPost: PostMeta | null
}




// const PostNav = ({ prevPost, nextPost }: PostNavProps) => {
//   const getNavItemClass = (post: PostMeta) => classnames(
//     'cursor-pointer w-2/5 px-3 max-w-64 h-14 bg-white rounded-lg justify-end items-center gap-2.5 inline-flex',
//     post ? 'text-black' : 'text-gray-600',
//     post ? 'cursor-pointer' : 'cursor-not-allowed',
//   )
//   return <nav className='w-full mt-5 flex justify-between'>
//     <div
//       className={getNavItemClass(prevPost)}
//     >
//       <div className="w-5 h-5 relative ">
//         <img src={iconRight.src} className="w-full h-full" />
//       </div>
//       <div className="flex-1 text-black text-lg font-normal leading-relaxed">
//         <When condition={prevPost} other={'没有了'}>
//           <Link href={`/post/${prevPost?.id}`}>
//             {prevPost?.title}
//           </Link>
//         </When>
//       </div>
//     </div>
//     <div
//       className={getNavItemClass(nextPost)}
//     // className="w-2/5 px-3 max-w-64 h-14 bg-white rounded-lg justify-start items-center gap-2.5 inline-flex"
//     >
//       <div className="flex-1 text-right text-black text-lg font-normal leading-relaxed">
//         <When condition={nextPost} other={'没有了'}>
//           <Link href={`/post/${nextPost?.id}`}>
//             {nextPost?.title}
//           </Link>
//         </When>
//       </div>
//       <div className="w-5 h-5 relative rotate-180">
//         <img src={iconRight.src} className="w-full h-full" />
//       </div>
//     </div>
//   </nav >
// }
interface PostHeaderProps {
  post: PostMeta
}
const PostHeader: FC<PostHeaderProps> = ({ post }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full text-zinc-800 dark:text-zinc-200 text-2xl font-normal leading-relaxed">
        {post.title}
      </div>
      <div className="text-neutral-500 text-md font-light ">
        发布日期：{dateFormat(post.date)}
        <GapPoint />
        {durationFormat(post.readingTime.time)}
        <GapPoint />
        {post.readingTime.words}字

      </div>

      <p>
        {post.desc}
      </p>
      <span className='h-px bg-slate-300'></span>
    </div>
  )
}


interface PostContentProps {
  code: string
}
const PostContent = ({ code }: PostContentProps) => {
  const Component = useMemo(() => getMDXComponent(code), [code])

  return (
    <div className="markdown-body w-full break-words whitespace-normal ">
      <Suspense fallback={<>Loading...</>}>
        <Component />
      </Suspense>
    </div>
  )
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
      <OutlineContainer>
        <EnterAnimation>
          <PostHeader post={post} />
          {children}
          <PostFooter post={post} />
        </EnterAnimation>
      </OutlineContainer>
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