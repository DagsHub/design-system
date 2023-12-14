import {ItemFallback} from './ItemFallback';
import React, {useEffect, useState} from 'react';
import {CSVViewer} from "../CSVViewer/CSVViewer";


export function SingleFileViewFileRenderer({
                                               galleryFilePath,
                                               itemType,
                                               itemFallbackHeight
                                           }: {
    galleryFilePath: string;
    itemType: string;
    itemFallbackHeight: string;
}) {

    const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
    const [csvValues, setCsvValues] = useState<string[][]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    useEffect(()=>{
        if(itemType === 'csv'){
            fetch(galleryFilePath)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then((data) => {
                    debugger;
                    setCsvValues(data.values);
                    setCsvHeaders(data.headers);
                })
                .catch((error) => {
                    setIsError(true);
                });
        }
    },[galleryFilePath, itemType])

  if (!!galleryFilePath && !!itemType) {
    if (itemType === 'image') {
      return (
        <img
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
          alt={''}
          src={galleryFilePath}
        />
      );
    }
    if (itemType === 'video') {
      return (
        <video
          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
          controls
          src={galleryFilePath}
        ></video>
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
            width: '80%'
          }}
        >
          <source src={galleryFilePath} />
          Your browser doesn't support HTML5 video tag.
        </audio>
      );
    }
      if (itemType === 'csv') {
          return (
              <CSVViewer headers={csvHeaders} values={csvValues}/>
          );
      }
  }
  return <ItemFallback height={itemFallbackHeight} width={'100%'} disableHoverMode />;
}
