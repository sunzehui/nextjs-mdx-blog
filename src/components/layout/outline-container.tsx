import { clsxm } from "@/utils/helper"
import { FC, ReactNode } from "react"

interface OutlineContainerProps {
  className?: string
  children: ReactNode[] | ReactNode
}
export const OutlineContainer: FC<OutlineContainerProps> = ({ children, className }) => {
  if (Array.isArray(children) && children.length === 0) return null;

  return (
    <div
      className={clsxm(
        "outline-container w-full shadow-inner desktop:px-[20px] px-3 py-4 bg-white rounded-lg  border border-slate-300 ",
        className
      )}
    >

      {children ? children : <>暂无文章！</>}
    </div>
  )
}
