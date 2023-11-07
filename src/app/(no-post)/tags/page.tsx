import { EnterAnimation } from "@/components/common"
import { Card } from "@/components/layout"
import { Metadata } from "next"
import Link from "next/link"
import { FC } from "react"
import { getTags } from "@app/feed/post"


interface Tag {
  name: string;
  count: number;
}

interface TagCloudProps {
  tags: Tag[];
}

const TagCloud: FC<TagCloudProps> = ({ tags }) => {
  return (
    <div className="tag-cloud">
      {tags.map((tag) => (
        <Link
          className="inline-block leading-none m-2 hover-underline py-1"
          style={{
            fontSize: `${Math.max(1.2, tag.count * 0.1 + 1.2)}rem`,
            color: `hsl(0, 0%, ${Math.max(0, 70 - tag.count)}%)`,
          }}
          key={tag.name} href={`/tags/${tag.name}`} >
          #{tag.name}
        </Link>
      ))}
    </div>
  );
};

export const metadata: Metadata = {
  title: '标签-孙泽辉',
  description: '标签'
}
export default async function Page() {
  const tags = await getTags()

  return (
    <Card>
      <EnterAnimation>
        <TagCloud tags={tags} />
      </EnterAnimation>
    </Card>
  )
}
