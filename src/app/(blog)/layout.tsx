import '@/assets/styles/global.scss'
import Footer from './footer'
import Header from './header'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { PropsWithChildren, ReactNode } from 'react'


export default async function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <div className="desktop:w-4/6 max-w-5xl h-full desktop:px-6 px-3 mx-auto flex flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  )
}


