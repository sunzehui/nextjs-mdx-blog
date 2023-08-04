import type { FC, PropsWithChildren } from 'react'
import { ParsedUrlQuery } from "querystring";

declare global {
  export type NextPageParams<P extends ParsedUrlQuery, Props = {}> = PropsWithChildren<
    {
      params: P
    } & Props
  >

  export type Component<P = {}> = FC<ComponentType & P>

  export type ComponentType<P = {}> = {
    className?: string
  } & PropsWithChildren &
    P

}
