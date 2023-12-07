import { Box } from '@mui/system';
import React, { useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { GenericModal, MetadataField, MetadataKeyValueList, NewMetadataField } from '../../index';
import { Button, ButtonVariant } from '../../../elements/button';
import { Icon } from '../../../icons';
import { ItemFallback } from './ItemFallback';
import './style.scss';
import { CustomAccordion } from '../customAccordion/CustomAccordion';
import TopButtonsSection from './TopButtonsSection';
import { SingleFileViewDataSection } from './SingleFileViewDataSection';

export interface ItemData {
  itemIndex: number;
  itemType: string;
  repoFilePath: string;
  galleryFilePath: string;
  fileName: string;
  metadataList: MetadataField[];
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface singleFileViewModalProps {
  closeModal: () => void;
  itemData: ItemData;
  onGetNextItemClickHandler: () => void;
  onGetPreviousItemClickHandler: () => void;
  metadataOnChangeHandler?: (metadataList: NewMetadataField[]) => void;
  enableMetadataEditing?: boolean;
  enableMetadataDeletion?: boolean;
}

export function SingleFileViewModal({
  closeModal,
  itemData,
  onGetNextItemClickHandler,
  onGetPreviousItemClickHandler,
  metadataOnChangeHandler,
  enableMetadataEditing,
  enableMetadataDeletion
}: singleFileViewModalProps) {
  const [showMetadataOverlay, setShowMetadataOverlay] = useState<boolean>(false);
  const breakpoint = useMediaQuery('(max-width: 800px)');
  const TOP_SECTION_HEIGHT = 52;
  const LINE_HEIGHT = 24;
  const TOP_SECTION_HEIGHT_ON_SMALL_SCREEN = TOP_SECTION_HEIGHT + LINE_HEIGHT; //Because I fource it to wrap

  return (
    <div id={'gallery'}>
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
              padding: '24px',
              boxSizing: 'border-box',
              justifyContent: 'space-between'
            }}
          >
            <TopButtonsSection
              height={`${TOP_SECTION_HEIGHT}px`}
              isSmallScreen={breakpoint}
              fileName={itemData.fileName}
              linkToFile={itemData.repoFilePath}
              onMetadataIconClick={() => setShowMetadataOverlay(!showMetadataOverlay)}
              metadataButtonIcon={
                showMetadataOverlay ? 'solid-sidebar-arrow-left' : 'solid-sidebar-arrow-right'
              }
            />
            <Box
              sx={{
                height: breakpoint
                  ? `calc(100% - ${TOP_SECTION_HEIGHT_ON_SMALL_SCREEN}px)`
                  : `calc(100% - 52px)`
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
              />
            </Box>
          </Box>
        ]}
      />
    </div>
  );
}

export default SingleFileViewModal;