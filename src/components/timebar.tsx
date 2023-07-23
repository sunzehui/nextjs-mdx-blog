'use client'
import { fromNow } from "@/utils/time"

export const TimeBar = ({ time }: { time: string }) => {
  const timeNow = fromNow(time)

  return (
    <div className="text-neutral-500 text-md font-light ">
      {timeNow}
    </div>
  )
}
