import { Root as AspectRatio } from '@radix-ui/react-aspect-ratio'
import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { ButtonHTMLAttributes } from 'react'
import { FaRegFilePdf } from 'react-icons/fa'

const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
  ssr: false
})

function DownloadButton({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
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

const Regulamento: NextPage = () => {
  return (
    <div className="p-12 bg-[#005e67] rounded-3xl">
      <h1 className="text-center text-white text-2xl mb-8">
        Regulamento do <strong>Desafio FazGame Eletrobras60</strong>
      </h1>
      <div className="bg-white overflow-y-auto">
        <AspectRatio ratio={3 / 3}>
          <PDFViewer file="/assets/pdfs/regulamento.pdf" />
        </AspectRatio>
      </div>

      <DownloadButton
        onClick={() => saveAs('/assets/pdfs/regulamento.pdf', `/assets/pdfs/regulamento.pdf`)}
      >
        Baixar regulamento
      </DownloadButton>
    </div>
  )
}

export default Regulamento
