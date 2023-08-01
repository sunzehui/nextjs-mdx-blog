import '@/assets/styles/md-el.scss'
import { CodeBlock, Image, Link } from "@/components/markdown";
import { TagRenderer } from '@/components/common';

export const components = {
  img: Image,
  code: CodeBlock,
  a: Link,
  h1: TagRenderer('h1'),
  h2: TagRenderer('h2'),
  h3: TagRenderer('h3'),
  h4: TagRenderer('h4'),
  h5: TagRenderer('h5'),
  h6: TagRenderer('h6'),
  p: TagRenderer('p'),
  blockquote: TagRenderer('blockquote'),
  table: TagRenderer('table'),
  thead: TagRenderer('thead'),
  tbody: TagRenderer('tbody'),
  tr: TagRenderer('tr'),
  th: TagRenderer('th'),
  td: TagRenderer('td'),
  em: TagRenderer('em'),
  strong: TagRenderer('strong'),
  del: TagRenderer('del'),
  ul: TagRenderer('ul'),
  ol: TagRenderer('ol'),
  li: TagRenderer('li'),
}
