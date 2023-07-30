import Link from "next/link";

export default function Header() {
  return <>
    <div className="desktop:p-[20px] p-3 flex flex-col justify-center items-start ">
      <div className=" text-zinc-800 text-2xl font-blod leading-relaxed">
        <Link href={"/"}>
          孙泽辉
        </Link>
      </div>
      <div className="justify-start items-start gap-[20px] inline-flex text-black text-sm font-normal leading-relaxed">
        <Link href={`/`}>
          首页
        </Link>
        <Link href={`/post`}>
          文章
        </Link>
        <div>归档</div>
        <div>标签</div>
        <div>友链</div>
        <div>关于</div>
      </div>
    </div>
  </>
}
