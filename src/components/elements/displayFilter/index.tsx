import {
  Collapse,
  Divider,
  IconButton,
  List,
  Stack,
  ThemeProvider,
  Tooltip,
  Typography
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';
import theme from '../../../theme';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import ComparePopover from './ComparePopover';

type childFilter = {
  label: string;
  onChange: (value: string) => void;
};
export interface DisplayFilterProps {
  label: string;
  showAll?: boolean;
  onChange: () => void;
  value: boolean;
  showCancel?: boolean;
  children?: childFilter[];
  isChild?: boolean;
}

export function DisplayFilter({
  label,
  onChange,
  value,
  showCancel,
  children,
  showAll
}: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const filterClicked = () => {
    setShow(!show);
    onChange();
  };

  const onToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const cancelFilter = (e: React.SyntheticEvent) => {
    e.stopPropagation();
  };

  useEffect(() => {
    setShow(value);
  }, [value]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Stack
          width={'100%'}
          gap={1}
          direction={'row'}
          sx={{
            cursor: 'pointer',
            background: '#F8FAFC',
            color: '#172D32',
            '&:hover #cancel': {
              display: 'initial'
            }
          }}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          onClick={filterClicked}
          padding={'8px'}
          role={'button'}
        >
          <Box
            alignItems={'center'}
            justifyContent={'space-between'}
            display={'flex'}
            width={'inherit'}
          >
            <Box display={'flex'} alignItems={'center'} width={'80%'}>
              <Typography
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                variant={'medium'}
              >
                {label}
              </Typography>

              {children?.length && (
                <IconButton
                  sx={{
                    transition: '.3s ease-in-out',
                    transform: open ? 'rotate(180deg)' : 'unset',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                  disableRipple
                  onClick={onToggle}
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
            </Box>

            <Stack direction={'row'} gap={1}>
              {showCancel && (
                <IconButton onClick={cancelFilter} sx={{ padding: 0 }} disableRipple>
                  <CancelIcon
                    id={'cancel'}
                    sx={{
                      padding: 0,
                      height: '20px',
                      width: '21.08px',
                      fill: '#94A3B8',
                      display: 'none'
                    }}
                  />
                </IconButton>
              )}

              <IconButton
                sx={{ padding: 0, height: '20px', width: '21.08px' }}
                disableRipple
                onClick={() => {}}
              >
                <Icon icon={show ? 'eye' : 'eye-off'} height={20} width={21.08} fill={'#94A3B8'} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        <ComparePopover />

        {/*annotations */}
        {children?.length && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Box borderLeft={'3px solid #C4B5FD'} paddingLeft={2}>
                {children?.map((item) => (
                  <Tooltip title={item?.label}>
                    <div>
                      <DisplayFilter
                        isChild
                        value={!!showAll}
                        label={item?.label}
                        onChange={() => console.log('changed')}
                        showCancel
                      />
                    </div>
                  </Tooltip>
                ))}

                <Divider sx={{ backgroundColor: '#F8FAFC' }} />
              </Box>
            </List>
          </Collapse>
        )}

        <Divider sx={{ backgroundColor: '#F8FAFC' }} />
      </ThemeProvider>
    </div>
  );
}
