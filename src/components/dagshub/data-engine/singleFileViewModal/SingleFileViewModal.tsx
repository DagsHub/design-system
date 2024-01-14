import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import {GenericModal, MetadataField, NewMetadataField, RGB} from '../../index';
import './style.scss';
import TopButtonsSection from './TopButtonsSection';
import { SingleFileViewDataSection } from './SingleFileViewDataSection';

export interface Datapoint {
  id: number;
  path: string;
  metadata: MetadataField[];
}

export interface ItemData {
  itemIndex: number;
  itemType: string;
  repoFilePath: string;
  galleryFilePath: string;
  fileName: string;
  metadataList: MetadataField[];
  hasNext: boolean;
  hasPrevious: boolean;
  isSelected?: boolean;
  item?: Datapoint;
}

export type VisualizerProps = {
  itemData: ItemData;
}

export type SidebarProps = {
  itemData: ItemData;
}

export interface singleFileViewModalProps {
  closeModal: () => void;
  itemData: ItemData;
  onGetNextItemClickHandler: () => void;
  onGetPreviousItemClickHandler: () => void;
  metadataOnChangeHandler?: (metadataList: NewMetadataField[]) => void;
  enableMetadataEditing?: boolean;
  enableMetadataDeletion?: boolean;
  onSelectItemToggle?: (e?: any) => void;
  areAllSelected?: boolean;
  onAnnotatedClick?: () => void;
  enableDatapointAnnotating?: boolean;
  enableFileDownloading?: boolean;
  visualizerRenderer: (props: VisualizerProps) => React.ReactNode;
  sidebarRenderers?: () => React.ReactNode;
}

export function SingleFileViewModal({
  closeModal,
  itemData,
  onGetNextItemClickHandler,
  onGetPreviousItemClickHandler,
  metadataOnChangeHandler,
  enableMetadataEditing,
  enableMetadataDeletion,
  onSelectItemToggle,
  areAllSelected,
  onAnnotatedClick,
  enableDatapointAnnotating,
  enableFileDownloading,
  visualizerRenderer,
  sidebarRenderers,
}: singleFileViewModalProps) {
  const [showMetadataOverlay, setShowMetadataOverlay] = useState<boolean>(false);
  const breakpoint = useMediaQuery('(max-width: 800px)');
  const TOP_SECTION_HEIGHT = 52;
  const TOP_SECTION_HEIGHT_ON_SMALL_SCREEN = 100;
  const modalRef = useRef<HTMLDivElement>();

  const handleKeyDown = (event: any) => {
    if (event.key === 'ArrowLeft') {
      itemData.hasPrevious && onGetPreviousItemClickHandler();
    }
    if (event.key === 'ArrowRight') {
      itemData.hasNext && onGetNextItemClickHandler();
    }
    if (event.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    modalRef.current?.focus();
    // Autofocus on the modal when it's open, so it will be possible to navigate between the items using the arrows
  }, []);

  return (
    <Box id={'gallery'} onKeyDown={handleKeyDown} tabIndex={0} ref={modalRef}>
      <GenericModal
        title={''}
        onClose={closeModal}
        elements={[
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              padding: '8px',
              paddingTop: '0px',
              boxSizing: 'border-box',
              justifyContent: 'space-between'
            }}
          >
            <TopButtonsSection
              height={`${breakpoint ? TOP_SECTION_HEIGHT_ON_SMALL_SCREEN : TOP_SECTION_HEIGHT}px`}
              isSmallScreen={breakpoint}
              fileName={itemData.fileName}
              linkToFile={itemData.repoFilePath}
              linkToDownloadFile={itemData.galleryFilePath}
              onMetadataIconClick={() => setShowMetadataOverlay(!showMetadataOverlay)}
              metadataButtonIcon={
                showMetadataOverlay ? 'solid-sidebar-arrow-left' : 'solid-sidebar-arrow-right'
              }
              metadataButtonTooltip={
                showMetadataOverlay ? 'Hide metadata sidebar' : 'Show metadata sidebar'
              }
              onSelectItemToggle={onSelectItemToggle}
              isSelected={itemData.isSelected}
              areAllSelected={areAllSelected}
              onAnnotatedClick={onAnnotatedClick}
              enableDatapointAnnotating={enableDatapointAnnotating}
              enableFileDownloading={enableFileDownloading}
            />
            <Box
              sx={{
                height: breakpoint
                  ? `calc(100% - ${TOP_SECTION_HEIGHT_ON_SMALL_SCREEN}px)`
                  : `calc(100% - ${TOP_SECTION_HEIGHT}px)`
              }}
            >
              <SingleFileViewDataSection
                isSmallScreen={breakpoint}
                itemData={itemData}
                onGetNextItemClickHandler={onGetNextItemClickHandler}
                onGetPreviousItemClickHandler={onGetPreviousItemClickHandler}
                showMetadataOverlay={showMetadataOverlay}
                metadataOnChangeHandler={metadataOnChangeHandler}
                enableMetadataEditing={enableMetadataEditing}
                enableMetadataDeletion={enableMetadataDeletion}
                visualizerRenderer={visualizerRenderer}
                sidebarRenderers={sidebarRenderers}
              />
            </Box>
          </Box>
        ]}
      />
    </Box>
  );
}

export default SingleFileViewModal;
