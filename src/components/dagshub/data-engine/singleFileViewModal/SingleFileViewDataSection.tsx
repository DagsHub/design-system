import React, { useRef, useState } from 'react';
import { Box } from '@mui/system';
import {
  MetadataKeyValueList,
  MetadataType,
  NewMetadataField,
} from '../metadataKeyValue/MetadataKeyValueList';
import { Button, ButtonVariant, CustomAccordion } from '../../../elements';
import { Icon } from '../../../icons';
import { ItemData, SidebarProps, VisualizerProps } from './SingleFileViewModal';
import { ThemeProvider, Tooltip } from '@mui/material';
import theme from '../../../../theme';

export function SingleFileViewDataSection({
  isSmallScreen,
  itemData,
  onGetNextItemClickHandler,
  onGetPreviousItemClickHandler,
  showMetadataOverlay,
  metadataOnChangeHandler,
  enableMetadataEditing,
  enableMetadataDeletion,
  visualizerRenderer,
  sidebarRenderers,
  validateValueByType,
}: {
  isSmallScreen: boolean;
  itemData: ItemData;
  onGetNextItemClickHandler: () => void;
  onGetPreviousItemClickHandler: () => void;
  showMetadataOverlay: boolean;
  metadataOnChangeHandler?: (metadataList: NewMetadataField[]) => void;
  enableMetadataEditing?: boolean;
  enableMetadataDeletion?: boolean;
  visualizerRenderer: (props: VisualizerProps) => React.ReactNode;
  sidebarRenderers?: React.ReactNode;
  validateValueByType?: (valueType: MetadataType, value: string) => boolean;
}) {
  const SIDEBAR_WIDTH = 350; //I decided on this number
  const ARROWS_SECTION_HEIGHT = 52;

  const [showMetadataSidebar, setShowMetadataSidebar] = useState<boolean>(true);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          border: '2px solid #E2E8F0',
          width: '100%',
          height: '100%',
          flexDirection: 'row',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width:
              !isSmallScreen && !!showMetadataSidebar ? `CALC(100% - ${SIDEBAR_WIDTH}px)` : `100%`,
            flexDirection: 'column',
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          {isSmallScreen && showMetadataOverlay ? (
            <Box
              sx={{
                display: 'flex',
                width: !isSmallScreen ? `${SIDEBAR_WIDTH}px` : 'auto',
                flexDirection: 'column',
                height: `calc(100% - ${ARROWS_SECTION_HEIGHT}px)`,
              }}
            >
              <CustomAccordion label={'Metadata'}>
                <MetadataKeyValueList
                  metadataList={itemData.metadataList}
                  editingEnabled={!!enableMetadataEditing}
                  deletionEnabled={!!enableMetadataDeletion}
                  onSaveHandler={metadataOnChangeHandler}
                  validateValueByType={validateValueByType}
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
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              {!isSmallScreen && !showMetadataSidebar && (
                <Tooltip title={'Show metadata sidebar'} placement={'left'} arrow={true}>
                  <div
                    style={{
                      position: 'absolute',
                      top: '4px',
                      right: '4px',
                      zIndex: 200,
                      width: '44px',
                      height: '36px',
                    }}
                  >
                    {/*Tooltip doesn't work directly on Button soI need this dix wrapper*/}
                    <Button
                      onClick={() => {
                        setShowMetadataSidebar(!showMetadataSidebar);
                      }}
                      label={''}
                      iconRight={
                        <Icon
                          icon={'solid-sidebar-arrow-left'}
                          width={20}
                          height={20}
                          fill={'#172D32'}
                        />
                      }
                      variant={ButtonVariant.Secondary}
                      style={{ position: 'absolute', top: '4px', right: '4px', zIndex: 200 }}
                    />
                  </div>
                </Tooltip>
              )}
              {visualizerRenderer({ itemData })}
            </Box>
          )}
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              height: `${ARROWS_SECTION_HEIGHT}px`,
              justifyContent: 'center',
              boxSizing: 'border-box',
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
                tabIndex={0}
                timeToBlurMS={200}
                onClick={() => {
                  itemData.hasPrevious && onGetPreviousItemClickHandler();
                }}
                label={''}
                iconRight={
                  <Icon icon={'outline-arrow-sm-left'} width={11.67} height={10} fill={'#172D32'} />
                }
                variant={ButtonVariant.Secondary}
                disabled={!itemData.hasPrevious}
              />
              <Button
                tabIndex={0}
                timeToBlurMS={200}
                onClick={() => {
                  itemData.hasNext && onGetNextItemClickHandler();
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
                disabled={!itemData.hasNext}
              />
            </Box>
          </Box>
        </Box>
        {!isSmallScreen && showMetadataSidebar && (
          <Box
            sx={{
              display: 'flex',
              width: !isSmallScreen ? `${SIDEBAR_WIDTH}px` : '100%',
              borderLeft: !isSmallScreen ? '2px solid #E2E8F0' : undefined,
              flexDirection: 'column',
              paddingBottom: '12px',
            }}
          >
            <Tooltip title={'Hide metadata sidebar'} placement={'right'} arrow={true}>
              <div style={{ width: 'max-content' }}>
                {/*Tooltip doesn't work directly on Button soI need this dix wrapper*/}
                <Button
                  onClick={() => {
                    setShowMetadataSidebar(!showMetadataSidebar);
                  }}
                  label={''}
                  iconRight={
                    <Icon
                      icon={'solid-sidebar-arrow-right'}
                      width={20}
                      height={20}
                      fill={'#172D32'}
                    />
                  }
                  variant={ButtonVariant.Secondary}
                  style={{
                    width: 'fit-content',
                    alignSelf: 'flex-start',
                    marginTop: '4px',
                    marginLeft: '16px',
                    flexShrink: 0,
                  }}
                />
              </div>
            </Tooltip>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                overflow: 'auto',
                height: '100%',
              }}
            >
              <>
                <CustomAccordion label={'Metadata'}>
                  <MetadataKeyValueList
                    metadataList={itemData.metadataList}
                    editingEnabled={!!enableMetadataEditing}
                    deletionEnabled={!!enableMetadataDeletion}
                    onSaveHandler={metadataOnChangeHandler}
                    validateValueByType={validateValueByType}
                  />
                </CustomAccordion>
                {sidebarRenderers}
              </>
            </Box>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
}
