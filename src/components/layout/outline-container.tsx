import classNames from "classnames"
import { FC } from "react"

interface OutlineContainerProps {
  className?: string
  children: React.ReactNode
}
export const OutlineContainer: FC<OutlineContainerProps> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        "outline-container w-full shadow-inner desktop:px-[20px] px-3 bg-white rounded-lg  border border-slate-300 flex flex-col",
        className
      )}
    >
      {children}
    </div>
  )
}
