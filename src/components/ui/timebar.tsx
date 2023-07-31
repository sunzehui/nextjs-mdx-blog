'use client'
import { fromNow } from "@/utils/time"
import { FC } from "react"

interface TagProps {
  time: Date | string
}
export const TimeBar: FC<TagProps> = ({ time }) => {
  const timeNow = fromNow(time)

  return (
    <div className="text-neutral-500 text-md font-light ">
      {timeNow}
    </div>
  )
}
