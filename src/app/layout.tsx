import '@/assets/styles/global.scss'
import PKG from '../../package.json'
import Footer from './footer'
import Header from './header'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const generateMetadata = async () => {
  return {
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({
  children
}: RootLayoutProps) {
  return (
    <html lang="zh-Hans" className='noise'>
      <head>
        <SayHi />
      </head>
      <body className="scroll-smooth antialiased bg-orange-50/20 " >
        <div className="desktop:w-4/6 max-w-5xl h-full desktop:px-6 px-3 mx-auto">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}


const SayHi = () => {
  const { version } = PKG
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `var version = "${version}";
    (${function () {
            console.log(
              `%c hui ${version} %c https://hui.zone `,
              'color: #fff; margin: 1em 0; padding: 5px 0; background: #39C5BB;',
              'margin: 1em 0; padding: 5px 0; background: #efefef;',
            )

            const motto = `
Written by TypeScript, Coding with Love.
--------
Stay hungry. Stay foolish. --Steve Jobs
`

            if (document.firstChild?.nodeType !== Node.COMMENT_NODE) {
              document.prepend(document.createComment(motto))
            }
          }.toString()})();`,
      }}
    />
  )
}
