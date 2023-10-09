
import { getPost } from '@/lib/mdx';
import { notFound } from 'next/navigation'
import { ParsedUrlQuery } from 'querystring';
import { MDXLayoutRenderer } from '@/components/layout/mdx-renderer';

interface PageParams extends ParsedUrlQuery {
  id: string
}
export default async function PagePostDetail({
  params,
}: {
  params: PageParams;
}) {
  // @TODO: 适配旧版blog，待删除
  const id = params.id.endsWith('.html') ? params.id.slice(0, -5) : params.id

  const postPayload = await getPost(id).catch(e => notFound())

  return (
    <div className="w-full break-words whitespace-normal markdown-body">
      <MDXLayoutRenderer mdxSource={postPayload.mdxSource} />
    </div>
  )
}

