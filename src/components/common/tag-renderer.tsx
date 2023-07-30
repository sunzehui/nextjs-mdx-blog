import React, { PropsWithChildren } from 'react'
import classNames from 'classnames'

export const TagRenderer = (name: string) => {
  return (props => {
    const { children, className, ...rest } = props
    return React.createElement(
      name,
      { ...rest, className: classNames(`mdx-${name}`, className) },
      props.children,
    )
  }) as React.FC<PropsWithChildren<HTMLElement>>
}
