import { ItemFallback } from './ItemFallback';
import React, { useEffect, useState } from 'react';
import { CSVViewer } from '../CSVViewer/CSVViewer';
import { Box } from '@mui/system';
import { PDFViewer } from '../PDFViewer/PDFViewer';
import { VisualizerProps } from './SingleFileViewModal';

export const SingleFileViewFileRenderer = ({ itemData }: VisualizerProps) => {
  const [textContent, setTextContent] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvValues, setCsvValues] = useState<string[][]>([]);

  const { galleryFilePath, itemType } = itemData;

  useEffect(() => {
    setIsError(false);
    if (itemType === 'text') {
      fetch(galleryFilePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then((data) => {
          setTextContent(data);
        })
        .catch((error) => {
          setIsError(true);
        });
    } else if (itemType === 'csv') {
      fetch(galleryFilePath)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setCsvValues(data.values);
          setCsvHeaders(data.headers);
        })
        .catch((error) => {
          setIsError(true);
        });
    }
  }, [galleryFilePath, itemType]);

  if (!!galleryFilePath && !!itemType) {
    if (isError) {
      return (
        <ItemFallback height={'100%'} width={'100%'} disableHoverMode isError={true} />
      );
    }
    if (itemType === 'image') {
      return (
        <img
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
          alt={''}
          src={galleryFilePath}
          onError={() => {
            setIsError(true);
          }}
        />
      );
    }
    if (itemType === 'video') {
      return (
        <video
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%'
          }}
          controls
          src={galleryFilePath}
          onError={() => {
            setIsError(true);
          }}
        ></video>
      );
    }
    if (itemType === 'pdf') {
      return (
        <Box
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            overflowY: 'auto',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <PDFViewer
            filePath={galleryFilePath}
            onError={() => {
              setIsError(true);
            }}
          />
        </Box>
      );
    }
    if (itemType === 'text') {
      return (
        <Box
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'hidden',
            whiteSpace: 'pre-wrap',
            overflowX: 'hidden',
            overflowY: 'auto',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            width: '100%'
          }}
        >
          {textContent}
        </Box>
      );
    }
    if (itemType === 'audio') {
      return (
        <audio
          controls
          preload="metadata"
          style={{
            objectFit: 'contain',
            maxWidth: '100%',
            maxHeight: '100%',
            width: '80%',
            alignSelf: 'center'
          }}
          onError={() => {
            setIsError(true);
          }}
        >
          <source src={galleryFilePath} />
          Your browser doesn't support HTML5 video tag.
        </audio>
      );
    }
    if (itemType === 'csv') {
      return <CSVViewer headers={csvHeaders} values={csvValues} columnWidth={160} />;
    }
  }
  return <ItemFallback height={''} width={'100%'} disableHoverMode />;
};

