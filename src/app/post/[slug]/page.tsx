import '@/assets/styles/md-el.scss'
import classnames from 'classnames'
import iconRight from '@/assets/icons/right-arrow.svg'
import { Tag } from '@/components/ui';
import { dateFormat, durationFormat } from '@/utils/time';
import Link from 'next/link';
import { When, TagRenderer, EnterAnimation } from '@/components/common';
import { getAllPostsMeta, getPost, getPostName } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Suspense } from 'react';
import { CodeBlock, Image } from '@/components/markdown';
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

const components = {
  img: Image,
  code: CodeBlock,
  h1: TagRenderer('h1'),
  h2: TagRenderer('h2'),
  h3: TagRenderer('h3'),
  h4: TagRenderer('h4'),
  h5: TagRenderer('h5'),
  h6: TagRenderer('h6'),
  p: TagRenderer('p'),
  a: TagRenderer('a'),
  blockquote: TagRenderer('blockquote'),
  table: TagRenderer('table'),
  thead: TagRenderer('thead'),
  tbody: TagRenderer('tbody'),
  tr: TagRenderer('tr'),
  th: TagRenderer('th'),
  td: TagRenderer('td'),
  em: TagRenderer('em'),
  strong: TagRenderer('strong'),
  del: TagRenderer('del'),
}
type Post = any

interface PostNavProps {
  prevPost: Post | null
  nextPost: Post | null
}

export async function generateStaticParams() {
  const metas = await getAllPostsMeta()
  return metas.map(meta => {
    return { slug: meta.id }
  })
}


const PostNav = ({ prevPost, nextPost }: PostNavProps) => {
  const getNavItemClass = (post: Post) => classnames(
    'cursor-pointer w-2/5 px-3 max-w-64 h-14 bg-white rounded-lg justify-end items-center gap-2.5 inline-flex',
    post ? 'text-black' : 'text-gray-600',
    post ? 'cursor-pointer' : 'cursor-not-allowed',
  )
  return <nav className='w-full mt-5 flex justify-between'>
    <div
      className={getNavItemClass(prevPost)}
    >
      <div className="w-5 h-5 relative ">
        <img src={iconRight.src} className="w-full h-full" />
      </div>
      <div className="flex-1 text-black text-lg font-normal leading-relaxed">
        <When condition={prevPost} other={'没有了'}>
          <Link href={`/post/${prevPost?.id}`}>
            {prevPost?.title}
          </Link>
        </When>
      </div>
    </div>
    <div
      className={getNavItemClass(nextPost)}
    // className="w-2/5 px-3 max-w-64 h-14 bg-white rounded-lg justify-start items-center gap-2.5 inline-flex"
    >
      <div className="flex-1 text-right text-black text-lg font-normal leading-relaxed">
        <When condition={nextPost} other={'没有了'}>
          <Link href={`/post/${nextPost?.id}`}>
            {nextPost?.title}
          </Link>
        </When>
      </div>
      <div className="w-5 h-5 relative rotate-180">
        <img src={iconRight.src} className="w-full h-full" />
      </div>
    </div>
  </nav >
}

const PostHeader = ({ post }: { post: Post }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-full text-zinc-800 text-2xl font-normal leading-relaxed">
        {post.title}
      </div>
      <div className="self-stretch justify-start text-neutral-500 text-md font-light items-start inline-flex">
        <div>
          发布日期：{dateFormat(post.date)}
        </div>

        <div className="ml-5">{durationFormat(post.readingTime.time)}</div>
        <div className="ml-5">{post.readingTime.words}字</div>
      </div>
    </div>
  )
}
const PostContent = ({ content }: { content: any }) => {
  return (
    <div className="markdown-body w-full break-words whitespace-normal ">
      <Suspense fallback={<>Loading...</>}>
        {/* @ts-ignore */}
        <MDXRemote source={content} options={{ parseFrontmatter: true, }} components={components} />
      </Suspense>
    </div>
  )
}
const PostFooter = ({ post }: { post: Post }) => {
  return (
    <div className="w-full justify-between items-start inline-flex">
      <div className="w-full h-10 py-[3px] justify-start items-center gap-3.5 flex">
        {
          post.tags.length <= 0 && <Tag val={'未归档'} />
        }
        {
          post.tags.map((tag, idx) => {
            return <Tag key={tag} val={tag} />
          })
        }
      </div>
    </div>
  )
}
export default async function Post({
  params,
}: {
  params: { slug: string };
}) {
  const postPayload = await getPost(params.slug).catch(e => notFound())
  const post = postPayload.meta

  return <div className="desktop:p-6 p-3  w-full bg-white rounded-lg border border-slate-200 ">
    <EnterAnimation>
      <PostHeader post={post} />
      <PostContent content={postPayload.content} />
      <PostFooter post={post} />
    </EnterAnimation>
  </div>

}

export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.slug
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
