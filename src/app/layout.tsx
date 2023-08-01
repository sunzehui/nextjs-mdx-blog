import '@/assets/styles/global.scss'
import Footer from './footer'
import Header from './header'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({
  children
}: RootLayoutProps) {
  return (
    <html lang="zh-Hans" className='noise'>
      <body className="scroll-smooth antialiased bg-orange-50/20 " >
        <div className="h-full overflow-scroll">
          <div className="desktop:w-4/6 max-w-5xl h-full desktop:px-6 px-3 mx-auto">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
