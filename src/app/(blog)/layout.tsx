import '@/assets/styles/global.scss'
import Footer from './footer'
import Header from './header'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { PropsWithChildren, ReactNode } from 'react'
import { Card } from '@/components/layout'
import Link from 'next/link'
import { Archives, getArchives, getTags } from '../feed/post'
import { Tag } from '@/types/tag'

interface TagProps {
  tags: Tag[]
}
const TagCard = ({ tags }: TagProps) => {
  return (
    <>
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
    </>
  )
}
// const Profile = () => {
//   return (
//     <Card>
//       <div className="flex flex-col gap-3">
//         <div className="w-full text-zinc-800 dark:text-zinc-200 text-2xl font-normal leading-relaxed">
//           <h2 className="inline-block">
//             孙泽辉
//           </h2>
//         </div>
//         <div className="w-full text-neutral-500 text-md font-light ">
//           <p>我是描述</p>
//         </div>
//       </div>
//     </Card>
//   )
// }

// const LeftSide = ({ tags }) => {
//   return (
//     <div className="sidebar flex flex-col gap-5">
//       <Profile />

//     </div>
//   )
// }
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
            <span className='num bg-gray-500 text-white rounded-xl px-3'>{archives[year].length}</span>
          </Link>
        ))
      }
    </Card>


  )
}
interface RightSideProps {
  archives: Archives
  tags: Tag[]
}
const RightSide = ({ archives, tags }: RightSideProps) => {
  return (<div className="sidebar flex flex-col gap-5 ">

    <ArchiveCard archives={archives} />
    <TagCard tags={tags} />

  </div>)
}

export default async function RootLayout({
  children,
}: PropsWithChildren) {
  const tags = await getTags()
  const archives = await getArchives()

  return (
    <div>
      <Header />
      <main className='flex blog-container mx-auto flex-col desktop:flex-row'>
        <div className="flex-1 min-w-0 desktop:pr-6 pr-3 pb-3">
          {children}
        </div>
        <RightSide archives={archives} tags={tags} />
      </main>
      <Footer />
    </div>
  )
}


