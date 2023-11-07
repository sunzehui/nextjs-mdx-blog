import '@/assets/styles/global.scss'
import RightSide from '@/components/layout/right-side'
import Footer from './footer'
import Header from './header'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { PropsWithChildren } from 'react'

export default async function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Header />
      <main className='flex blog-container mx-auto flex-col sm:flex-row'>
          <div className="content flex-1 min-w-0">
            {children}
          </div>
          <RightSide />
      </main>
      <Footer />

    </>
  )
}


