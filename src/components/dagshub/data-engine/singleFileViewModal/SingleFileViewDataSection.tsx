import React, { useRef } from 'react';
import { Box } from '@mui/system';
import { CustomAccordion } from '../customAccordion/CustomAccordion';
import { MetadataKeyValueList, NewMetadataField } from '../metadataKeyValue/MetadataKeyValueList';
import { Button, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import { ItemData } from './SingleFileViewModal';
import { SingleFileViewFileRenderer } from './SingleFileViewFileRenderer';

export function SingleFileViewDataSection({
  isSmallScreen,
  itemData,
  onGetNextItemClickHandler,
  onGetPreviousItemClickHandler,
  showMetadataOverlay,
  metadataOnChangeHandler,
  enableMetadataEditing,
  enableMetadataDeletion
}: {
  isSmallScreen: boolean;
  itemData: ItemData;
  onGetNextItemClickHandler: () => void;
  onGetPreviousItemClickHandler: () => void;
  showMetadataOverlay: boolean;
  metadataOnChangeHandler?: (metadataList: NewMetadataField[]) => void;
  enableMetadataEditing?: boolean;
  enableMetadataDeletion?: boolean;
}) {
  const getPreviousItemButtonRef = useRef<HTMLButtonElement>(null);
  const getNextItemButtonRef = useRef<HTMLButtonElement>(null);
  const SIDEBAR_WIDTH = 350; //I decided on this number
  const ARROWS_SECTION_HEIGHT = 52;

  return (
    <Box
      sx={{
        display: 'flex',
        border: '2px solid #E2E8F0',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        boxSizing: 'border-box'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: !isSmallScreen ? `CALC(100% - ${SIDEBAR_WIDTH}px)` : `100%`,
          flexDirection: 'column',
          height: '100%',
          boxSizing: 'border-box'
        }}
      >
        {isSmallScreen && showMetadataOverlay ? (
          <Box
            sx={{
              display: 'flex',
              width: !isSmallScreen ? `${SIDEBAR_WIDTH}px` : 'auto',
              flexDirection: 'column',
              height: `calc(100% - ${ARROWS_SECTION_HEIGHT}px)`
            }}
          >
            <CustomAccordion label={'Metadata'}>
              <MetadataKeyValueList
                metadataList={itemData.metadataList}
                editingEnabled={!!enableMetadataEditing}
                deletionEnabled={!!enableMetadataDeletion}
                onChangeHandler={metadataOnChangeHandler}
              />
            </CustomAccordion>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: `calc(100% - ${ARROWS_SECTION_HEIGHT}px)`,
              padding: '8px',
              justifyContent: 'center',
              bgcolor: '#F8FAFC',
              boxSizing: 'border-box'
            }}
          >
            <SingleFileViewFileRenderer
              galleryFilePath={itemData.galleryFilePath}
              itemType={itemData.itemType}
              itemFallbackHeight={`calc(100% - ${ARROWS_SECTION_HEIGHT}px)`}
            />
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: `${ARROWS_SECTION_HEIGHT}px`,
            justifyContent: 'center',
            boxSizing: 'border-box'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Button
              ref={getPreviousItemButtonRef}
              onClick={() => {
                itemData.hasPrevious && onGetPreviousItemClickHandler();
                setTimeout(() => {
                  getPreviousItemButtonRef?.current?.blur();
                }, 200);
              }}
              label={''}
              iconRight={
                <Icon icon={'outline-arrow-sm-left'} width={11.67} height={10} fill={'#172D32'} />
              }
              variant={ButtonVariant.Secondary}
              disabled={!itemData.hasPrevious}
            />
            <Button
              ref={getNextItemButtonRef}
              onClick={() => {
                itemData.hasNext && onGetNextItemClickHandler();
                setTimeout(() => {
                  getNextItemButtonRef?.current?.blur();
                }, 200);
              }}
              label={''}
              iconRight={
                <Icon icon={'outline-arrow-sm-right'} width={11.67} height={10} fill={'#172D32'} />
              }
              variant={ButtonVariant.Secondary}
              disabled={!itemData.hasNext}
            />
          </Box>
        </Box>
      </Box>
      {!isSmallScreen && (
        <Box
          sx={{
            display: 'flex',
            width: !isSmallScreen ? `${SIDEBAR_WIDTH}px` : '100%',
            borderLeft: !isSmallScreen ? '2px solid #E2E8F0' : undefined,
            flexDirection: 'column',
            paddingBottom: '12px'
          }}
        >
          <CustomAccordion label={'Metadata'}>
            <MetadataKeyValueList
              metadataList={itemData.metadataList}
              editingEnabled={!!enableMetadataEditing}
              deletionEnabled={!!enableMetadataDeletion}
              onChangeHandler={metadataOnChangeHandler}
            />
          </CustomAccordion>
        </Box>
      )}
    </Box>
  );
}
