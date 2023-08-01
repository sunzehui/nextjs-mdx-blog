'use client'

import clsx from "clsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { When } from "../common"
// import { } from "react-icons/fa";
enum LinkType {
  Relative,
  InSite,
  OutSite,
  Github,
}
function checkLinkType(href: string): LinkType {
  if (href.startsWith('/')) return LinkType.Relative

  const locateUrl = new URL(location.href)
  const toUrlParser = new URL(href)

  if (toUrlParser.host === locateUrl.host) {
    const pathArr = toUrlParser.pathname.split('/').filter(Boolean)
    const headPath = pathArr[0]
    if (['post', 'tags', 'archives'].includes(headPath)) return LinkType.InSite
  }
  if (toUrlParser.host === 'github.com') return LinkType.Github
  return LinkType.OutSite
}

export const Link = ({ href, children, ...props }: any) => {
  const router = useRouter()
  const [linkType, setLinkType] = useState(LinkType.OutSite)

  useEffect(() => {
    setLinkType(checkLinkType(href))
    console.log('linkType', linkType, href);

  }, [])

  const handleUrlRedirect = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()

    if (linkType === LinkType.Relative) return router.push(href)

    const toUrlParser = new URL(href)
    if (linkType === LinkType.InSite) return router.push(toUrlParser.pathname)

    window.open(href)
  }

  return (
    <>
      <a href={href}
        target="_blank"
        onClick={handleUrlRedirect}
        className={'border-b border-blue-400 pb-1 hover:bg-blue-200 hover:border-none hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:rounded-md transition-all duration-300'}>

        <When condition={linkType === LinkType.Github}>

          <FontAwesomeIcon icon={faGithub} style={{ color: '#808091', }} className={'mr-1'} />
        </When>
        <When condition={linkType === LinkType.OutSite}>
          <FontAwesomeIcon icon={faLink} style={{ color: '#808091', }} className={'mr-1'} />
        </When>
        {children}
      </a>

    </>
  )
}
