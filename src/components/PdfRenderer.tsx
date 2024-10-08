'use client'

import React from 'react'
import {Document, Page, pdfjs} from "react-pdf"
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
// import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';
// import pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'


// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`
// pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
// GlobalWorkerOptions.workerSrc = '/static/pdf.worker.js';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfRendererProps {
  url: string
}


const PdfRenderer = ({url}: PdfRendererProps) => {
  return (
    <div className='w-full bg-white rounded-md shadow flex flex-col items-center'>
        <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
            <div className="flex items-center gap1.5">
                Top bar
            </div>
        </div>

        <div className="flex-1 w-full max-h-screen">
          <div>
            <Document file={url} className='max-h-full'>
              <Page pageNumber={1}/>
            </Document>
          </div>
        </div>
    </div>
  )
}

export default PdfRenderer