import { getList } from "@/app/feed/post"
import { Metadata } from "next";
import { EnterAnimation } from "@/components/common";
import { OutlineContainer } from "@/components/layout";
import { Post } from "@/components/ui";

export const metadata: Metadata = {
  title: '文章-孙泽辉',
}

export default async function Home() {
  const posts = await getList()

  return (
    <OutlineContainer>
      {
        posts.map((post, idx) => {
          return (
            <EnterAnimation key={post.id} delay={idx / 10}>
              <Post  {...post} />
            </EnterAnimation>)
        })
      }
    </OutlineContainer>
  )
}

