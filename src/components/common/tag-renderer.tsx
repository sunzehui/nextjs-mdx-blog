import { clsxm } from '@/utils/helper'
import React, { PropsWithChildren } from 'react'

export const TagRenderer = (name: string) => {
  return (props => {
    const { children, className, ...rest } = props
    return React.createElement(
      name,
      { ...rest, className: clsxm(`mdx-${name}`, className) },
      props.children,
    )
  }) as React.FC<PropsWithChildren<HTMLElement>>
}
