import iconTag from "@/assets/icons/tag.svg"
import iconMore from "@/assets/icons/more.svg"
import Link from "next/link"


interface TagProps {
  isMore?: boolean
  val?: string
}
export const Tag = ({ isMore, val }: TagProps) => {
  return (
    <>
      <Link
        href={isMore ? '/tags' : `/tags/${val}`}
        className="ml-2 px-1  rounded-[15px] hover-underline">
        <span className="text-neutral-500 text-sm font-light leading-relaxed">#{isMore ? '...' : val}</span>
      </Link>
    </>
  )
}

