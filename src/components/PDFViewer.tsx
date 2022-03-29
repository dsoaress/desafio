import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import workerSrc from '../../pdf-worker'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function PDFViewer({ file }: { file: string }) {
  const [numPages, setNumPages] = useState(0)

  return (
    <Document
      file={file}
      loading="Carregando..."
      onLoadSuccess={({ numPages }) => setNumPages(numPages)}
    >
      {Array.from({ length: numPages }, (_, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          renderAnnotationLayer={false}
          renderTextLayer={false}
          className="mb-4 shadow-md"
          width={window.innerWidth}
          loading="Carregando..."
        />
      ))}
    </Document>
  )
}
