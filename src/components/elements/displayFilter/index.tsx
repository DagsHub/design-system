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

export interface DisplayFilterProps {
  label: string;
  showAll?: boolean;
  onChange: () => void;
  value: boolean;
  showCancel?: boolean;
  showCompare?: boolean;
  isChild?: boolean;
  cancelFilter?: (e: any) => void;
}

export function DisplayFilter({ label, onChange, value, showCancel, showAll, showCompare, cancelFilter,
}: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [children, setChildren] = useState<{ name: string; value: string }[]>([{
    value: '',
    name: 'as of now'
  }]);

  const filterClicked = () => {
    setShow(!show);
    onChange();
  };

  const onToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  useEffect(() => {
    setShow(value);
  }, [value]);

  const search = ({ name, value }: { name: string; value: string }) => {
    console.log('value ', value);
    console.log('name ', name);
    // has results -
    // add the tag to the children list.
    const newChildren = [...children || [], { name, value}];
    setChildren(newChildren);
    // empty - toggle on no results
  };

  const removeChildFilter = (e: any) => {
    console.log('e', e);
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Stack
          width={'100%'}
          gap={1}
          direction={'row'}
          sx={{
            background: open ? '#F1F5F9' : '#F8FAFC',
            color: '#172D32',
            '&:hover': {
              backgroundColor: '#F1F5F9'
            },
            '&:hover #cancel': {
              display: 'initial'
            },
            borderLeft: open ? '3px solid #C4B5FD' : '3px solid transparent'
          }}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          padding={'8px'}
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

              {children?.length > 1 && (
                <IconButton
                  sx={{
                    padding: 0,
                    height: '20px',
                    width: '20px',
                    transition: '.3s ease-in-out',
                    transform: open ? 'rotate(180deg)' : 'unset',
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                  onClick={onToggle}
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
            </Box>

            <Stack direction={'row'} gap={1}>
              {!!cancelFilter && (
                <IconButton onClick={() => cancelFilter(label) } sx={{ padding: 0 }}>
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

              {showCompare && <ComparePopover search={search}/>}

              <IconButton
                sx={{ padding: 0, height: '20px', width: '21.08px' }}
                onClick={filterClicked}
              >
                <Icon icon={show ? 'eye' : 'eye-off'} height={20} width={21.08} fill={'#94A3B8'} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {/*annotations */}
        {children?.length > 1 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Box paddingLeft={2}>
                {children?.map((item) => (
                  <Tooltip title={item?.name}>
                    <div>
                      <DisplayFilter
                        isChild
                        value={!!showAll}
                        label={item?.name}
                        onChange={() => console.log('changed')}
                        showCancel
                        cancelFilter={removeChildFilter}
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
