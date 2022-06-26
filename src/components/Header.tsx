import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BiDirections } from 'react-icons/bi'
import { BsInfoLg, BsPencilSquare } from 'react-icons/bs'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { IoMdTrophy } from 'react-icons/io'

import { data } from '../../_data'

type NavLinkProps = {
  title: string
  url: string
  icon: string
  color: string
  active: boolean
}

const icons = {
  BsInfoLg,
  BsPencilSquare,
  BiDirections,
  HiOutlineClipboardList,
  IoMdTrophy
}

function NavLink({ title, url, icon, color, active }: NavLinkProps) {
  const Icon = icons[icon as keyof typeof icons]

  return (
    <Link href={url} key={title}>
      <a
        style={{
          backgroundColor: active ? 'transparent' : color,
          color: active ? color : 'white',
          borderColor: active ? color : 'transparent'
        }}
        className="inline-flex items-center gap-2 border-2 rounded-full font-semibold w-full transition-opacity duration-300 hover:opacity-90"
      >
        <div className="border-2 border-white rounded-full">
          <div
            className="rounded-full p-1 border-2 md:text-xl lg:text-3xl"
            style={{ borderColor: color, backgroundColor: active ? color : 'white' }}
          >
            <Icon color={active ? 'white' : color} />
          </div>
        </div>
        <span className="pr-2">{title}</span>
      </a>
    </Link>
  )
}

export function Header() {
  const { asPath } = useRouter()

  return (
    <header id="top">
      <div className="relative w-full h-36">
        <Image
          src={data.seo.logo.src}
          alt={data.seo.logo.alt}
          objectFit="contain"
          layout="fill"
          quality={100}
        />
      </div>

      <nav className="w-full flex justify-center">
        <ul className="grid sm:grid-cols-2 gap-4 lg:grid-cols-4 my-12 w-full">
          {data.nav.map(link => (
            <li key={link.url}>
              <NavLink
                title={link.title}
                url={link.url}
                icon={link.icon}
                color={link.color}
                active={asPath === link.url}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
