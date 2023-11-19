import {Box} from '@mui/system';
import React, {useEffect, useRef, useState} from 'react';
import {Typography, useMediaQuery} from "@mui/material";
import {GenericModal} from "../../index";
import {Button, ButtonVariant} from "../../../elements/button";
import {Icon} from "../../../icons";
import {ItemFallback} from "./ItemFallback";
import "./style.scss";

export interface MetadataField {
    key: string;
    value: string | number | boolean;
    valueType: "STRING" | "FLOAT" | "INTEGER" | "BOOLEAN" | "BLOB";
}

export interface Datapoint {
    id: number;
    path: string;
    metadata: MetadataField[];
}

export interface DatapointsConnectionEdge {
    node: Datapoint;
    cursor: string;
}

export interface itemData {
    itemType: string;
    repoFilePath: string;
    galleryFilePath: string;
    fileName: string;
}

export interface singleFileViewModalProps {
    closeModal: () => void;
    setActiveSingleItem: React.Dispatch<React.SetStateAction<Datapoint | null>>;
    activeSingleItemIndex: number | null;
    setActiveSingleItemIndex: React.Dispatch<React.SetStateAction<number | null>>;
    hasMoreItemsToFetch: boolean | null;
    loadMoreItems: () => void;
    itemData?: itemData | null;
    items?: DatapointsConnectionEdge[];
}

function SingleFileViewModal({
                                 closeModal,
                                 setActiveSingleItem,
                                 activeSingleItemIndex,
                                 setActiveSingleItemIndex,
                                 hasMoreItemsToFetch,
                                 loadMoreItems,
                                 itemData,
                                 items
                             }: singleFileViewModalProps) {

    const [showMetadataOverlay, setShowMetadataOverlay] = useState<boolean>(false);
    const showSidebarButtonRef = useRef<HTMLButtonElement>(null);

    const breakpoint = useMediaQuery('(max-width: 800px)');
    const SIDEBAR_WIDTH = 333;

    useEffect(() => {
        if (!breakpoint) {
            setShowMetadataOverlay(false);
        }
    }, [breakpoint])

    return (
        <div id={"gallery"}>
            <GenericModal
                title={''}
                onClose={closeModal}
                elements={[
                    <Box sx={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        flexDirection: "column",
                        padding: "24px",
                        boxSizing: "border-box"
                    }}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '100%',
                                height: '52px',
                                flexDirection: 'row',
                                alignItems: "center",
                                justifyContent: "space-between",
                                flexShrink: 0
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 500,
                                    fontSize: "16px",
                                    lineHeight: "24px"
                                }}>
                                {itemData?.fileName}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    height: '100%',
                                    flexDirection: 'row',
                                    alignItems: "center",
                                    gap: "8px"
                                }}>
                                {breakpoint &&
                                    <Button
                                        ref={showSidebarButtonRef}
                                        onClick={() => setTimeout(() => {
                                            showSidebarButtonRef?.current?.blur();
                                        }, 400)}
                                        label={''}
                                        iconRight={
                                            <Icon
                                                icon={showMetadataOverlay ? 'solid-sidebar-collapse' : 'solid-sidebar-expand'}
                                                width={20}
                                                height={20}
                                                fill={'#172D32'}
                                                onClick={() => setShowMetadataOverlay(!showMetadataOverlay)}
                                            />
                                        }
                                        variant={ButtonVariant.Secondary}
                                    />}
                                <a href={itemData?.repoFilePath} target={"_blank"}>
                                    <Button
                                        label={''}
                                        iconRight={
                                            <Icon
                                                icon={'outline-external-link'}
                                                width={15}
                                                height={15}
                                                fill={'#172D32'}
                                            />
                                        }
                                        variant={ButtonVariant.Secondary}
                                    />
                                </a>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                border: '2px solid #E2E8F0',
                                width: '100%',
                                height: 'calc(100% - 52px)',
                                flexDirection: 'row',
                                boxSizing: "border-box"
                            }}
                        >
                            {!showMetadataOverlay && <Box
                                sx={{
                                    display: 'flex',
                                    width: !breakpoint ? `CALC(100% - ${SIDEBAR_WIDTH}px)` : `100%`,
                                    flexDirection: 'column',
                                    height: '100%',
                                    borderRight: '2px solid #E2E8F0',
                                    boxSizing: "border-box"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '100%',
                                        height: 'calc(100% - 52px)',
                                        padding: '8px',
                                        justifyContent: 'center',
                                        bgcolor: "#F8FAFC",
                                        alignItems: "center",
                                        boxSizing: "border-box"
                                    }}
                                >
                                    {!!itemData?.galleryFilePath && itemData.itemType === 'image' ? (
                                        <img
                                            style={{objectFit: 'contain', maxWidth: '100%', maxHeight: '100%'}}
                                            alt={''}
                                            src={itemData?.galleryFilePath}
                                        />
                                    ) : itemData?.itemType === 'video' ? (
                                        <video
                                            style={{objectFit: 'contain', maxWidth: '100%', maxHeight: '100%'}}
                                            controls
                                            src={itemData?.galleryFilePath}
                                        ></video>
                                    ) : itemData?.itemType === 'audio' ? (
                                        <audio
                                            controls
                                            preload="metadata"
                                            style={{
                                                objectFit: 'contain',
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                width: "80%"
                                            }}
                                        >
                                            <source src={itemData?.galleryFilePath}/>
                                            Your browser doesn't support HTML5 video tag.
                                        </audio>
                                    ) : (
                                        <ItemFallback height={"calc(100% - 52px)"} width={"100%"}/>
                                    )}
                                </Box>
                                {!!items && activeSingleItemIndex != null && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '100%',
                                            height: '52px',
                                            padding: '8px',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            boxSizing: "border-box"
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '8px',
                                            }}
                                        >
                                            <Button
                                                onClick={() => {
                                                    setActiveSingleItem(items[activeSingleItemIndex - 1]?.node);
                                                    setActiveSingleItemIndex(activeSingleItemIndex - 1);
                                                }}
                                                label={''}
                                                iconRight={
                                                    <Icon
                                                        icon={'outline-arrow-sm-left'}
                                                        width={11.67}
                                                        height={10}
                                                        fill={'#172D32'}
                                                    />
                                                }
                                                variant={ButtonVariant.Secondary}
                                                disabled={activeSingleItemIndex == 0}
                                            />
                                            <Button
                                                onClick={() => {
                                                    //if im close to the last fetched item, fetch more, so it won't get stack
                                                    if (activeSingleItemIndex + 10 == items?.length && hasMoreItemsToFetch) {
                                                        loadMoreItems();
                                                    }
                                                    setActiveSingleItem(items[activeSingleItemIndex + 1]?.node);
                                                    setActiveSingleItemIndex(activeSingleItemIndex + 1);
                                                }}
                                                label={''}
                                                iconRight={
                                                    <Icon
                                                        icon={'outline-arrow-sm-right'}
                                                        width={11.67}
                                                        height={10}
                                                        fill={'#172D32'}
                                                    />
                                                }
                                                variant={ButtonVariant.Secondary}
                                                disabled={!hasMoreItemsToFetch && activeSingleItemIndex + 1 == items?.length}
                                            />
                                        </Box>
                                    </Box>
                                )}
                            </Box>}
                            {(!breakpoint || showMetadataOverlay) &&
                                <Box sx={{
                                    display: 'flex',
                                    width: !breakpoint ? `${SIDEBAR_WIDTH}px` : "100%",
                                    padding: '8px'
                                }}>Metadata key value component</Box>
                            }
                        </Box>
                    </Box>,
                ]}
            /></div>
    );
}

export default SingleFileViewModal;
