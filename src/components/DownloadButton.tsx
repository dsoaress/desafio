import { ButtonHTMLAttributes } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'

export function DownloadButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className=" p-2 rounded-md text-center relative transition-opacity duration-200 hover:opacity-90 flex flex-col text-white mx-auto mt-12"
      type="button"
      {...props}
    >
      <div className="flex items-center justify-center h-16 w-16 mx-auto mb-2">
        <FaRegFilePdf size={56} />
      </div>

      <span className="text-white text-xs leading-none flex justify-center items-center flex-1">
        {children}
      </span>
    </button>
  )
}
