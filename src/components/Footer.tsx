import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'

import { data } from '../../_data'
import { Hr } from './Hr'

const icons = {
  Facebook: FaFacebookSquare,
  Instagram: FaInstagram
}

const Title = ({ children }: { children: ReactNode }) => (
  <h4 className="text-lg font-semibold mb-4">{children}</h4>
)

export function Footer() {
  const { firstSection, legal, logo, secondSection, social, thirdSection } = data.footer

  return (
    <footer>
      <Hr />
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <div className="relative w-full h-28 mb-8 md:h-32">
            <Image src={logo.src} alt={logo.alt} layout="fill" objectFit="contain" quality={100} />
          </div>
          <ul className="flex gap-2 justify-center">
            {social.map(({ name, url }) => {
              const Icon = icons[name as 'Facebook' | 'Instagram']
              return (
                <li key={name}>
                  <a
                    href={url}
                    aria-label={name}
                    className="transition-colors duration-300 hover:text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={26} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <Title>{firstSection.title}</Title>
          <nav>
            <ul className="flex flex-col gap-4">
              {firstSection.links.map(link => {
                if (!link.isActive) {
                  return (
                    <li key={link.title}>
                      <span>{link.title}</span>
                    </li>
                  )
                }

                return (
                  <li key={link.title}>
                    <Link href={link.url}>
                      <a className="transition-colors duration-300 hover:text-blue-500">
                        {link.title}
                      </a>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>

        <div>
          <Title>{secondSection.title}</Title>
          <div className="flex flex-col gap-4">
            <div>
              <div>{secondSection.firstBlock.title}</div>
              <div>{secondSection.firstBlock.email}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <Title>{thirdSection.firstBlock.title}</Title>
            <div className="relative w-full h-12">
              <a
                href={thirdSection.firstBlock.logo.url}
                aria-label={thirdSection.firstBlock.logo.alt}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={thirdSection.firstBlock.logo.src}
                  alt={thirdSection.firstBlock.logo.alt}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="left"
                  quality={100}
                />
              </a>
            </div>
          </div>

          <div>
            <Title>{thirdSection.secondBlock.title}</Title>
            <div className="flex flex-col gap-8">
              {thirdSection.secondBlock.logos.map(logo => (
                <div key={logo.url} className="relative w-full h-8">
                  <a
                    href={logo.url}
                    aria-label={logo.alt}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="left"
                      quality={100}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">{legal}</div>
    </footer>
  )
}
