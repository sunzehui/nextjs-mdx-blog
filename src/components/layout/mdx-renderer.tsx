import { getMDXComponent, MDXContentProps } from "mdx-bundler/client"
import '@/assets/styles/md-el.scss'
import { Button } from '@/components/markdown/Button';
import { Image } from '@/components/markdown/Image'
import { Link } from '@/components/markdown/Link'
import CodeBlock from "@/components/markdown/CodeBlock";
import { useMemo } from "react";
import Code from '@/components/markdown/Code'

export const mdxComponents: MDXContentProps['components'] = {
  Button,
  a: Link,
  code:Code,
  pre: CodeBlock,
}
const DEFAULT_LAYOUT = 'PostLayout'
interface MDXLayoutRendererProps {
  mdxSource: string
}
export const MDXLayoutRenderer = ({ mdxSource, ...rest }: MDXLayoutRendererProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return <MDXLayout layout={DEFAULT_LAYOUT} components={mdxComponents} {...rest} />
}
