import { clsxm } from "@/utils/helper"
import { FC, ReactNode } from "react"

interface Card {
  className?: string
  children: ReactNode[] | ReactNode
  title?: string
}
export const Card: FC<Card> = ({ children, className, title }) => {
  if (Array.isArray(children) && children.length === 0) return null;

  return (
    <div
      className={clsxm(
        "desktop:w-auto w-full desktop:px-[20px] px-3 py-3 rounded-lg bg-white dark:bg-[#252d38] dark:text-white",
        "flex flex-col",
        className
      )}
    >
      {title ?
        <span className="text-neutral-500 text-sm font-normal mb-3">{title}</span>
        : null
      }
      {children}
    </div>
  )
}
