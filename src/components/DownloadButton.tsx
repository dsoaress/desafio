import cn from 'classnames'
import { ButtonHTMLAttributes } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'

type DownloadButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  dark?: boolean
}

export function DownloadButton({ children, dark = false, ...props }: DownloadButtonProps) {
  return (
    <button
      className={cn(
        'p-2 rounded-md text-center relative transition-opacity duration-200 hover:opacity-90 flex flex-col text-white mx-auto mt-12',
        {
          'text-neutral-600': dark
        }
      )}
      type="button"
      {...props}
    >
      <div className="flex items-center justify-center h-16 w-16 mx-auto mb-2">
        <FaRegFilePdf size={56} />
      </div>

      <span
        className={cn('text-white text-xs leading-none flex justify-center items-center flex-1', {
          'text-neutral-600': dark
        })}
      >
        {children}
      </span>
    </button>
  )
}
