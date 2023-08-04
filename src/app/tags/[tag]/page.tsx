import { getList, getTags } from "@/app/feed/post";
import { notFound } from "next/navigation";
import { OutlineContainer } from "@/components/layout";
import { Post } from "@/components/ui";
import { EnterAnimation } from "@/components/common";
import { ParsedUrlQuery } from "querystring";
import { PostMeta } from "@/types/post";


interface TagInfoProps {
  tag: string;
  posts: PostMeta[];
}

function TagInfo({ tag, posts }: TagInfoProps) {
  return (
    <OutlineContainer className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-2 h-16 flex items-center">
      <EnterAnimation>
        <div className="flex items-end">
          <span className="px-3 text-2xl ">
            标签：{tag}
          </span>
          <span className="text-font-secondary">
            共{posts.length}篇文章
          </span>
        </div>
      </EnterAnimation>
    </OutlineContainer>
  )
}
function PostList({ posts }: { posts: PostMeta[] }) {
  return (
    <OutlineContainer>
      <EnterAnimation delay={.2}>
        <div className="post-list px-2 ">
          {
            posts.map((post: PostMeta, idx: number) => {
              return (
                <Post key={post.id} {...post} />
              )
            })
          }
        </div>
      </EnterAnimation>
    </OutlineContainer>
  )
}
interface PageParams extends ParsedUrlQuery {
  tag: string
}
export default async function Page({ params }: NextPageParams<PageParams>) {
  const { tag } = params

  const posts = await getList({ tag }).catch(e => {
    if (e.message === 'Not Found') return notFound()
    throw e
  })

  return (
    <>
      <TagInfo tag={tag} posts={posts} />
      <PostList posts={posts} />
    </>
  )
}

export const generateMetadata = async ({ params }: { params: { tag: string } }) => {
  const { tag } = params

  return {
    title: `标签-${tag}-孙泽辉`,
    description: `标签-${tag}`
  }
}

export const generateStaticParams = async () => {
  // Get all tags
  const tags = await getTags()

  // Return static params
  return tags.map(tag => {
    return {
      tag: tag.name
    }
  })
}

