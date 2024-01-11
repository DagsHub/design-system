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
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';

type childFilter = {
  label: string;
  onChange: (value: string) => void;
};
export interface DisplayFilterProps {
  label: string;
  showAll?: boolean;
  onChange: () => void;
  value: boolean;
  showCollapse?: boolean;
  showCancel?: boolean;
  children?: childFilter[];
  isChild?: boolean;
}

const CompareButton = () => {
  return (
    <Stack
      width={'100%'}
      direction={'row'}
      sx={{ cursor: 'pointer', backgroundColor: 'rgba(248, 250, 252, 1)', color: 'black' }}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      padding={'8px'}
    >
      <Typography variant={'medium'}>Compare to</Typography>
      <IconButton
        sx={{ padding: 0, height: '20px', width: '21.08px' }}
        disableRipple
        onClick={() => console.log('Compare')}
      >
        <AddIcon sx={{ height: '20px', width: '21.08px' }} fill={'#94A3B8'} />
      </IconButton>
    </Stack>
  );
};

class value {}

export function DisplayFilter({
  label,
  onChange,
  value,
  showCollapse,
  showCancel,
  children,
  showAll,
  isChild
}: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [localChildren, setLocalChildren] = useState<childFilter[] | undefined>(children);

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
            width={'inherit'}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '80%'
              }}
            >
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

              {showCollapse && (
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
        <Divider sx={{ backgroundColor: '#F8FAFC' }} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Box borderLeft={'3px solid #C4B5FD'} paddingLeft={2}>
              {localChildren?.map((item) => (
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

              <CompareButton />
              <Divider sx={{ backgroundColor: '#F8FAFC' }} />
            </Box>
          </List>
        </Collapse>
      </ThemeProvider>
    </div>
  );
}
