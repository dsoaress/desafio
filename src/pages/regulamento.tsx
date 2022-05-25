import { Root as AspectRatio } from '@radix-ui/react-aspect-ratio'
import { saveAs } from 'file-saver'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { DownloadButton } from '../components/DownloadButton'

const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
  ssr: false
})

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
