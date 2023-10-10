import '@/assets/styles/global.scss'
import PKG from '../../package.json'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { PropsWithChildren } from 'react'


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

export default async function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="zh-Hans" className='noise' >
      <head>
        <SayHi />
      </head>
      <body className="scroll-smooth antialiased bg-orange-50/20" >
        {children}
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
