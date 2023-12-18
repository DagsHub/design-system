import React, {useEffect, useRef} from 'react';
import { Box } from '@mui/system';
import { ThemeProvider, Typography } from '@mui/material';
import {Button, ButtonVariant, Tooltip} from '../../../elements';
import { Icon } from '../../../icons';
import theme from '../../../../theme';
import {Checkbox} from "../../../forms";

export default function TopButtonsSection({
  height,
  isSmallScreen,
  fileName,
  linkToFile,
  onMetadataIconClick,
  metadataButtonIcon,
  onSelectItem,
  selected,
  areAllSelected,
}: {
  height: string;
  isSmallScreen: boolean;
  fileName: string;
  linkToFile: string;
  onMetadataIconClick: () => void;
  metadataButtonIcon: string;
  onSelectItem?: () => void | undefined;
  selected?: boolean;
  areAllSelected?: boolean;
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
          gap: '5px',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          flexWrap: isSmallScreen ? 'wrap' : 'nowrap'
        }}
      >
        {
            (onSelectItem !== undefined && selected !== undefined) &&
            <span>
                <Tooltip
                    content={"Disable “Select all” to choose specific items"}
                    trigger={'click'}
                    placement={'bottom'}
                    interactive
                    disabled={!areAllSelected}>
                    <Box>
                        <Checkbox checked={selected} onChange={onSelectItem} disabled={areAllSelected}/>
                    </Box>
                </Tooltip>
            </span>
        }
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
