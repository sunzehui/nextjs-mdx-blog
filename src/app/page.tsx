import { Metadata } from 'next'
import style from '@/assets/styles/home.module.scss'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'home',
  description: 'home'
}

const listItems = [
  {
    title: 'blog',
    icon: 'bokeyuan',
    path: 'post/'
  },
  {
    title: 'archives',
    icon: 'xiaolian',
    path: 'archives/'
  }
]
export default async function Page() {
  return (
    <div className={style['page']}>
      <div className={style['card-inner']}>
        <header>
          <h1 >Sunzehui</h1>
          <h2>think input & output</h2>
        </header>
        <ul className="list">
          {
            listItems.map((item, idx) => {
              return (
                <li key={item.title}>
                  <Link href={item.path}>
                    <i className={`icon icon-${item.icon}`}></i>
                    <span>
                      {item.title}
                    </span>
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
