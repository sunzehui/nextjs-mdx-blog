import { When } from "@/components/common"
import classNames from "classnames"
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
    <div className={classNames("Record justify-center items-center inline-flex", className)}>
      <When condition={!!k}>
        <div className="Copyright2023 text-neutral-500 text-base font-normal">{k}</div>
      </When>
      <div className="Website ml-1 text-zinc-800 text-base font-blod">{v}</div>
    </div>
  )
}
export default function Footer() {
  return (
    <div className="Footer mt-10 w-full justify-center items-center inline-flex">
      <div className="Frame15 grow shrink basis-0 self-stretch px-3 justify-between items-start gap-36 inline-flex">
        <div className="Left justify-start items-start gap-2.5 inline-flex">
          <Record k="Copyright © 2023" v={config.siteName} />
          <Record v={config.ICP} />
        </div>
        <div className="Right justify-start items-start gap-3.5 flex">
          <Record k={'Powered by'} v={config.system} />
          <Record k={'Designed by'} v={config.designer} />
        </div>
      </div>
    </div>
  )
}
