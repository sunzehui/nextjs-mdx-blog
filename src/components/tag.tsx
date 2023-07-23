import iconTag from "@/assets/icons/tag.svg"
import iconMore from "@/assets/icons/more.svg"


interface TagProps {
  isMore?: boolean
  val?: string
}
export const Tag = ({ isMore, val }: TagProps) => {
  return (
    <>
      <div className="self-stretch px-1  rounded-[15px]  justify-center items-center gap-[3px] flex">
        <div className="text-neutral-500 text-sm font-light ">#{isMore ? '...' : val}</div>
      </div>
    </>
  )
}

