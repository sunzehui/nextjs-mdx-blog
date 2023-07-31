import { getList } from "@/app/feed/post";
import { notFound } from "next/navigation";
import { OutlineContainer } from "@/components/layout";
import { Post } from "@/components/ui";
import { EnterAnimation } from "@/components/common";
type tag = string
interface PageProps {
  params: {
    slug: tag
  }
}
export default async function Page({ params }: PageProps) {
  const { slug: tag } = params

  let posts = await getList({ tag }).catch(e => {
    notFound()
  })

  return (
    <>
      <OutlineContainer className="!shadow-[0_8px_30px_rgb(0,0,0,0.12)] mb-2 h-16 flex items-center">
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
      <OutlineContainer>
        <EnterAnimation delay={.2}>
          <div className="post-list px-2 ">
            {
              posts.map((post, idx) => {
                return (
                  <Post key={post.id} {...post} />
                )
              })
            }
          </div>
        </EnterAnimation>
      </OutlineContainer>

    </>
  )
}

export const generateMetadata = async ({ params }: { params: { slug: tag } }) => {
  const { slug: tag } = params

  return {
    title: `标签-${tag}-孙泽辉`,
    description: `标签-${tag}`
  }
}
