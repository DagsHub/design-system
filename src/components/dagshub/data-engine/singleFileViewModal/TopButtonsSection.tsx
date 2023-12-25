import React from 'react';
import { Box } from '@mui/system';
import { ThemeProvider, Tooltip, Typography } from '@mui/material';
import { Button, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import theme from '../../../../theme';
import { Checkbox } from '../../../forms';

export default function TopButtonsSection({
  height,
  isSmallScreen,
  fileName,
  linkToFile,
  onMetadataIconClick,
  metadataButtonIcon,
  onSelectItemToggle,
  isSelected,
  areAllSelected,
  linkToDownloadFile,
  onAnnotatedClick,
  enableDatapointAnnotating,
  enableFileDownloading
}: {
  height: string;
  isSmallScreen: boolean;
  fileName: string;
  linkToFile: string;
  onMetadataIconClick: () => void;
  metadataButtonIcon: string;
  onSelectItemToggle?: () => void | undefined;
  isSelected?: boolean;
  areAllSelected?: boolean;
  linkToDownloadFile: string;
  onAnnotatedClick?: () => void;
  enableDatapointAnnotating?: boolean;
  enableFileDownloading?: boolean;
}) {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          width: 'calc(100% - 44px)',
          height: height,
          flexDirection: 'row',
          gap: '8px',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
          padding: '8px 0px',
          boxSizing: 'border-box'
        }}
      >
        <Box
          sx={{ display: 'flex', gap: '8px', justifyContent: 'flex-start', alignItems: 'center' }}
        >
          {!!onSelectItemToggle && isSelected !== undefined && (
            <span>
              <Tooltip
                title={areAllSelected ? 'Disable “Select all” to choose specific items' : ''}
                placement={'bottom-start'}
                arrow={true}
              >
                <Box>
                  <Checkbox
                    checked={isSelected || areAllSelected}
                    onChange={onSelectItemToggle}
                    disabled={areAllSelected}
                  />
                </Box>
              </Tooltip>
            </span>
          )}
          <Typography
            variant={'large'}
            sx={{
              width: '100%'
            }}
          >
            {fileName}
          </Typography>
          <Tooltip
            title={'Open file in new tab'}
            placement={'right'}
            disableInteractive={true}
            arrow={true}
          >
            <a href={linkToFile} target={'_blank'}>
              <Button
                label={''}
                iconRight={
                  <Icon
                    icon={'outline-external-link'}
                    width={15}
                    height={15}
                    fill={'rgba(148, 163, 184, 1)'}
                  />
                }
                variant={ButtonVariant.Ghost}
              />
            </a>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            columnGap: '8px',
            width: isSmallScreen ? '100%' : 'auto'
          }}
        >
          {isSmallScreen && (
            <Button
              onClick={() => {
                onMetadataIconClick();
              }}
              label={''}
              iconRight={<Icon icon={metadataButtonIcon} width={20} height={20} fill={'#172D32'} />}
              variant={ButtonVariant.Secondary}
            />
          )}
          {enableDatapointAnnotating && (
            <Button
              label={'Annotate this datapoint'}
              iconLeft={<Icon icon={'annotations'} width={20} height={20} fill={'#172D32'} />}
              variant={ButtonVariant.Secondary}
              style={{ flexShrink: 0 }}
              onClick={onAnnotatedClick}
            />
          )}
          {enableFileDownloading && (
            <a href={linkToDownloadFile} download={fileName}>
              <Button
                label={''}
                iconRight={
                  <Icon icon={'outline-download'} width={15} height={15} fill={'#172D32'} />
                }
                variant={ButtonVariant.Secondary}
              />
            </a>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
