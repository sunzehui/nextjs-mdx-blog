import { Archives, getArchives, getTags } from "@/app/feed/post"
import Link from "next/link"
import { PropsWithChildren } from "react"
import { Card } from "./card"
import { Tag } from '@/types/tag'

interface TagProps {
  tags: Tag[]
}
const TagCard = ({ tags }: TagProps) => {
  return (
      <Card title={'标签'}>
        <div className="tag-group">
          {tags.map((tag) => (
            <Link
              className="inline-block leading-none text-md mr-2 py-2 hover-underline"
              key={tag.name} href={`/tags/${tag.name}`} >
              #{tag.name}
            </Link>
          ))}
        </div>
      </Card>
  )
}

interface ArchiveCardProps {
  archives: Archives
}
const ArchiveCard = ({ archives }: ArchiveCardProps) => {
  const years = Object.keys(archives).sort((a, b) => parseInt(b) - parseInt(a))

  return (
    <Card title='归档'>
      {
        years.map((year) => (
          <Link key={year} href={'/archives/'} className='flex justify-between items-center text-sm px-2 rounded-xl transition duration-300 py-1 hover:bg-gray-500'>
            <span className='year'>{year}</span>
            <span className='num bg-gray-500 rounded-xl px-3'>{archives[year].length}</span>
          </Link>
        ))
      }
    </Card>


  )
}

const RightSide = async (props: PropsWithChildren) => {
  const tags = await getTags()
  const archives = await getArchives()

  return (
    <div className="flex flex-col gap-5 sticky top-5 h-full min-w-[260px] shrink-0">
      <ArchiveCard archives={archives} />
      <TagCard tags={tags} />
      {props.children}
    </div>
  )
}

export default RightSide
