import { Root as AspectRatio } from '@radix-ui/react-aspect-ratio'
import cn from 'classnames'
import { NextPage } from 'next'
import Image from 'next/image'
import { ReactNode } from 'react'

import { data } from '../../_data'
import { Hr } from '../components/Hr'
import { Title } from '../components/Title'
import { VideoModal } from '../components/VideoModal'

const Section = ({ children, className }: { children: ReactNode; className?: string }) => (
  <section className={cn('flex flex-col gap-4 my-12 lg:items-center lg:flex-row', className)}>
    {children}
  </section>
)

const Home: NextPage = () => {
  const { firstSection, fourthSection, secondSection, thirdSection } = data.home

  return (
    <div>
      <Section>
        <div className="lg:flex-1">
          <Title>{firstSection.title}</Title>
          <p>{firstSection.text}</p>
        </div>

        <div className="lg:flex-1">
          <VideoModal video={firstSection.video}>
            <Image
              src={firstSection.image.src}
              alt={firstSection.image.alt}
              objectFit="contain"
              layout="fill"
            />
          </VideoModal>
        </div>
      </Section>

      <Hr />

      <Section>
        <div className="lg:w-1/3 lg:flex-shrink-0 p-10">
          <AspectRatio ratio={1}>
            <Image
              src={secondSection.image.src}
              alt={secondSection.image.alt}
              objectFit="contain"
              layout="fill"
            />
          </AspectRatio>
        </div>

        <div>
          <Title>{secondSection.title}</Title>
          <p>{secondSection.text}</p>
        </div>
      </Section>

      <Section className="bg-neutral-200 -mx-6 md:-mx-8 lg:-mx-10 px-6 md:px-8 lg:px-10 py-12">
        <div className="mx-auto w-full">
          <Title>{thirdSection.title}</Title>
          <div className="grid gap-8 md:grid-cols-4">
            {thirdSection.videos.map(({ image, video }) => (
              <VideoModal key={video} video={video}>
                <Image src={image.src} alt={image.alt} objectFit="contain" layout="fill" />
              </VideoModal>
            ))}
          </div>
        </div>
      </Section>

      <Section>
        <div className="lg:w-1/3 lg:flex-shrink-0">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={fourthSection.image.src}
              alt={fourthSection.image.alt}
              objectFit="contain"
              layout="fill"
            />
          </AspectRatio>
        </div>

        <div>
          <Title>{fourthSection.title}</Title>
          <p>{fourthSection.text}</p>
        </div>
      </Section>
    </div>
  )
}

export default Home
