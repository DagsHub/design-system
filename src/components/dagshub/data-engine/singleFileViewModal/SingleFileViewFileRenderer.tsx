import { ItemFallback } from './ItemFallback';
import React from 'react';

export function SingleFileViewFileRenderer({
  galleryFilePath,
  itemType,
  itemFallbackHeight
}: {
  galleryFilePath: string;
  itemType: string;
  itemFallbackHeight: string;
}) {
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
            width: '80%',
            alignSelf: 'center'
          }}
        >
          <source src={galleryFilePath} />
          Your browser doesn't support HTML5 video tag.
        </audio>
      );
    }
  }
  return <ItemFallback height={itemFallbackHeight} width={'100%'} disableHoverMode />;
}
