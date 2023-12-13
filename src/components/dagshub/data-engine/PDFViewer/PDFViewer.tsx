import { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './PDFViewer.css';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import React from 'react';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
};

type PDFFile = string | File | null;

export default function PDFViewer({ filePath }: { filePath: string }) {
  const [file, setFile] = useState<PDFFile>(filePath);
  const [numPages, setNumPages] = useState<number>();

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }

  useEffect(() => {
    setFile(filePath);
  }, [filePath]);

  return (
    <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}
