import '@/assets/styles/global.scss'
import Footer from './footer'
import Header from './header'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { PropsWithChildren, ReactNode } from 'react'


export default async function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <>
      <Header />
      <div className=" blog-container desktop:px-6 px-3 mx-auto flex flex-col pb-3">
        {children}
      </div>
      <Footer />
    </>
  )
}


