'use client'
import { Highlight, Language, themes } from 'prism-react-renderer'
import { clsxm } from '@/utils/helper'

interface CodeBlockProps {
  className?: string
  children?: string
}
export function CodeBlock(
  props: any
) {
  const { className, children } = props as CodeBlockProps
  if (!children) return null

  const language = className?.replace(/language-/, '') as Language
  // 没有语言则表明它是 `code` 写法，而不是代码块
  if (!language && !children.endsWith('\n')) {
    return (
      <code className="mdx-code">{children}</code>
    )
  }
  const code = children.trim()

  return (
    <div className='code-block relative '>
      <div className="absolute right-2 top-0 px-3  rounded-tl-md rounded-tr-md bg-slate-100 text-slate-300 dark:bg-[#282a36] dark:text-slate-400 font-mono font-medium text-xl leading-none select-none">
        {language?.toUpperCase()}
      </div>
      <Highlight code={code} theme={themes.github} language={language || 'bash'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <div style={{ ...style, paddingTop: 5, paddingBottom: 5, overflowX: 'scroll' }} >
            {tokens.map((line, i) => {
              return (
                <div
                  key={i}
                  {...getLineProps({
                    line,
                    className: clsxm({
                      // highlight: highlightLines.includes(i + 1),
                      // added: addedLines.includes(i + 1),
                      // removed: removedLines.includes(i + 1),
                      // focused: focusedLines.includes(i + 1),
                      // error: errorLines.includes(i + 1),
                      // warning: warningLines.includes(i + 1),
                    }),
                  })}
                >
                  <span
                    className='pr-2 mr-2 min-w-[2em] text-right text-gray-600  inline-block select-none border-r border-gray-300'
                  >{i + 1}</span>
                  {line.map((token: any, key: any) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              )
            })}

          </div>
        )}
      </Highlight>
    </div>
  )
}
