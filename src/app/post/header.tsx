import Link from "next/link";

export default function Header() {
  return <>
    <div className="desktop:p-[20px] p-3 flex flex-col justify-center items-start ">
      <div className=" text-zinc-800 text-2xl font-blod leading-relaxed">
        <Link href={"/"}>
          孙泽辉
        </Link>
      </div>
      <div className="justify-start items-start gap-[20px] inline-flex">
        <Link href={`/`}>
          <div className="text-black text-sm font-normal leading-relaxed">首页</div>
        </Link>
        <div className="text-gray-700 text-sm font-normal leading-relaxed">归档</div>
        <div className="text-gray-700 text-sm font-normal leading-relaxed">标签</div>
        <div className="text-gray-700 text-sm font-normal leading-relaxed">友链</div>
        <div className="text-gray-700 text-sm font-normal leading-relaxed">关于</div>
      </div>
    </div>
  </>
}
