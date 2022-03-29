import { Root as AspectRatio } from '@radix-ui/react-aspect-ratio'
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { BsXCircle } from 'react-icons/bs'

type VideoModalProps = {
  video: string
  children: ReactNode
}

export function VideoModal({ children, video }: VideoModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild style={{ cursor: 'pointer' }}>
        <AspectRatio ratio={16 / 9}>{children}</AspectRatio>
      </Dialog.Trigger>
      <Dialog.Portal>
        <div className="bg-black bg-opacity-50 fixed inset-0" />
        <Dialog.Content className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 max-w-full rounded-xl shadow-2xl p-4 pt-8">
          <AspectRatio ratio={16 / 9} className="rounded-md overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={video}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </AspectRatio>
          <Dialog.Close asChild>
            <button className="absolute top-3 right-3">
              <BsXCircle />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
