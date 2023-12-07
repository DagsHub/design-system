import React, { useRef } from 'react';
import { Box } from '@mui/system';
import { ThemeProvider, Typography } from '@mui/material';
import { Button, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import theme from '../../../../theme';

export default function TopButtonsSection({
  height,
  isSmallScreen,
  fileName,
  linkToFile,
  onMetadataIconClick,
  metadataButtonIcon
}: {
  height: string;
  isSmallScreen: boolean;
  fileName: string;
  linkToFile: string;
  onMetadataIconClick: () => void;
  metadataButtonIcon: string;
}) {
  const showSidebarButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: height,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          flexWrap: isSmallScreen ? 'wrap' : 'nowrap'
        }}
      >
        <Typography
          variant={'large'}
          sx={{
            width: '100%'
          }}
        >
          {fileName}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {isSmallScreen && (
            <Button
              ref={showSidebarButtonRef}
              onClick={() => {
                onMetadataIconClick();
                setTimeout(() => {
                  showSidebarButtonRef?.current?.blur();
                }, 400);
              }}
              label={''}
              iconRight={<Icon icon={metadataButtonIcon} width={20} height={20} fill={'#172D32'} />}
              variant={ButtonVariant.Secondary}
            />
          )}
          <a href={linkToFile} target={'_blank'}>
            <Button
              label={''}
              iconRight={
                <Icon icon={'outline-external-link'} width={15} height={15} fill={'#172D32'} />
              }
              variant={ButtonVariant.Secondary}
            />
          </a>
        </Box>
      </Box>
    </ThemeProvider>
  );
}