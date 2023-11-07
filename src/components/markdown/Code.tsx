import { PropsWithChildren, ReactNode } from "react"

interface CodeProps extends PropsWithChildren {
  className?:string
}

const Code = (props: CodeProps)=>{
  if (props.className?.startsWith('language-')) {
    return <>
      {props.children}
    </>
  }
  return <code className="highlight-words">
    {props.children}
  </code>
}

export default Code
