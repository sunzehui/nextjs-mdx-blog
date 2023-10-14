import { When } from "@/components/common"
import { GapPoint } from "@/components/ui"
import { clsxm } from "@/utils/helper"
import { FC } from "react"
const config = {
  siteName: "孙泽辉",
  system: "Next.js",
  designer: "孙泽辉",
  ICP: "鲁ICP备2021017637号"
}
interface RecordProps {
  className?: string
  k?: string,
  v: string
  link?: string
}
const Record: FC<RecordProps> = ({ className, k, v }) => {
  return (
    <div className={clsxm("Record flex justify-center items-center flex-wrap text-sm desktop:text-base", className)}>
      <When condition={!!k}>
        <span className="text-neutral-500 font-normal flex-shrink-0">{k}</span>
      </When>
      <span className="ml-1 text-zinc-800 font-blod flex-shrink-0">{v}</span>
    </div>
  )
}
export default function Footer() {
  return (
    <footer style={{ boxShadow: '0 4px 10px rgba(0,2,4,.06),0 0 1px rgba(0,2,4,.11)' }} className="py-10 mt-5 w-full flex   dark:bg-slate-600 bg-white justify-center items-center">
      <div className="grow shrink  blog-container basis-0 self-stretch px-3 flex flex-col items-center desktop:flex-row  desktop:justify-between">
        <div className="Left flex flex-wrap justify-center">
          <Record k="Copyright © 2023" v={config.siteName} />
          <GapPoint />
          <Record v={config.ICP} />
        </div>

        <div className="Right flex  flex-wrap justify-center">
          <Record k={'Powered by'} v={config.system} />
          <GapPoint />
          <Record k={'Designed by'} v={config.designer} />
        </div>
      </div>
    </footer>
  )
}
