import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page',
}

export default async function Page() {
  return <>
    <h1>Page</h1>
  </>
}
