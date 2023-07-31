import { EnterAnimation } from "@/components/common"
import { OutlineContainer } from "@/components/layout"
import { Metadata } from "next"
import Link from "next/link"
import { getTags } from "../feed/post"

export const metadata: Metadata = {
  title: '标签-孙泽辉',
  description: '标签'
}
export default async function Page() {
  const tags = await getTags()

  return (
    <OutlineContainer className="py-4">
      <EnterAnimation>

        <div className="word-container">
          {
            tags.map(tag => {
              return (
                <Link key={tag.name} href={`/tags/${tag.name}`}
                  className="inline leading-none p-2 hover-underline"
                  style={{
                    fontSize: `${Math.min(1.4, tag.count * 0.1 + .3)}rem`,
                    color: `hsl(0, 0%, ${Math.max(0, 70 - tag.count)}%)`
                  }}
                >
                  {tag.name}
                </Link>
              )
            })
          }
        </div>
      </EnterAnimation>
    </OutlineContainer>
  )
}
