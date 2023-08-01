import { clsxm } from '@/utils/helper'
import React, { PropsWithChildren } from 'react'

const isHeading = (name: string) => {
  return ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(name)
}
export const TagRenderer = (name: string) => {

  return (props => {
    const { children, className, ...rest } = props
    const customPorps = {
      ...rest, className: clsxm(`mdx-${name}`, className)
    }
    if (isHeading(name)) {
      customPorps.id = children.toString()
    }
    return React.createElement(
      name,
      customPorps,
      props.children,
    )
  }) as React.FC<PropsWithChildren<HTMLElement>>
}
