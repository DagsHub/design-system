import {ItemFallback} from './ItemFallback';
import React, {useEffect, useState} from 'react';
import {Box} from "@mui/system";
import PDFViewer from "../PDFViewer/PDFViewer";

export function SingleFileViewFileRenderer({
                                               galleryFilePath,
                                               itemType,
                                               itemFallbackHeight
                                           }: {
    galleryFilePath: string;
    itemType: string;
    itemFallbackHeight: string;
}) {

    const [textContent, setTextContent] = useState<string>('');

    useEffect(() => {
        debugger;
        if (itemType === "text") {
            fetch(galleryFilePath, )
                .then((response) => response.text())
                .then((data) => {
                    setTextContent(data);
                })
                .catch(error => {
                    console.error('Error fetching text file:', error);
                });
        }
    }, [galleryFilePath, itemType])

    if (!!galleryFilePath && !!itemType) {
        if (itemType === 'image') {
            return (
                <img
                    style={{objectFit: 'contain', maxWidth: '100%', maxHeight: '100%'}}
                    alt={''}
                    src={galleryFilePath}
                />
            );
        }
        if (itemType === 'video') {
            return (
                <video
                    style={{objectFit: 'contain', maxWidth: '100%', maxHeight: '100%'}}
                    controls
                    src={galleryFilePath}
                ></video>
            );
        }
        if (itemType === 'pdf') {
            return (
                <Box sx={{
                    maxWidth: '100%', maxHeight: '100%',
                    overflow: "hidden",
                    overflowY: "auto",
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <PDFViewer filePath={galleryFilePath} />
                </Box>
            );
        }
        if (itemType === 'text') {
            return (
                <Box sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    overflow: 'hidden',
                    whiteSpace: 'pre-wrap',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '20px',
                }}>
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
                >
                    <source src={galleryFilePath}/>
                    Your browser doesn't support HTML5 video tag.
                </audio>
            );
        }
    }
    return <ItemFallback height={itemFallbackHeight} width={'100%'} disableHoverMode/>;
}
