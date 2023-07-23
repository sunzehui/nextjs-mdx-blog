interface RootLayoutProps {
  children: React.ReactNode
}
export const metadata = {
  title: '孙泽辉',
}
export default function RootLayout({
  children
}: RootLayoutProps) {
  return (
    <html lang="zh-Hans">
      <body className="scroll-smooth antialiased bg-orange-50/20 " >
        <div className="h-full overflow-scroll">
          {children}
        </div>
      </body>
    </html>
  )

}
