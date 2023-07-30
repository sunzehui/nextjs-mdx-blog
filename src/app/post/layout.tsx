import Header from './header'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="desktop:w-4/6 max-w-5xl h-full desktop:px-6 px-3 mx-auto">
        <Header />
        {children}
      </div>
    </>
  )
}
