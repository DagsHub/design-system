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
  onChange: (filterName: string) => void;
  value: boolean;
  showCompare?: boolean;
  isChild?: boolean;
  showRemoveButton?: boolean;
  removeFilter?: (e: any) => void;
  addFilter?: (value: string) => void;
}

export function DisplayFilter({
  label,
  onChange,
  value,
  showCompare,
  removeFilter,
  addFilter,
  showRemoveButton
}: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(true);
  const [showAllChildren, setShowAllChildren] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [children, setChildren] = useState<{ name: string; value: string }[]>([
    {
      value: '',
      name: 'as of now'
    }
  ]);

  const filterClicked = () => {
    if (children.length > 1) {
      children.map((item) => onChange(item.value));
      setShowAllChildren(!showAllChildren);
      setShow(!showAllChildren);
    } else {
      onChange(label);
      setShow(!show);
    }
  };

  const onToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  // control the show indication from outside when value changes (toggle all button)
  useEffect(() => {
    setShow(value);
    if (value) {
      setShowAllChildren(value);
    }
  }, [value]);

  // when show changes from outside
  useEffect(() => {
    if (children.length > 1) {
      setShowAllChildren(show);
    }
  }, [show]);

  const search = ({ name, value }: { name: string; value: string }) => {
    // has results -
    // add the tag to the children list.
    const newChildren = [...(children || []), { name, value }];
    setChildren(newChildren);
    addFilter && addFilter(value);
    setOpen(true);

    // empty - toggle on no results
  };

  const removeChildFilter = (filterToRemove: string) => {
    const newChildren = children.filter((item) => item.name !== filterToRemove);
    setChildren(newChildren);
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
              {showRemoveButton && (
                <IconButton onClick={() => removeFilter && removeFilter(label)} sx={{ padding: 0 }}>
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

              {showCompare && <ComparePopover search={search} />}

              <IconButton
                sx={{ padding: 0, height: '20px', width: '21.08px' }}
                onClick={filterClicked}
              >
                <Icon icon={show ? 'eye' : 'eye-off'} height={20} width={21.08} fill={'#94A3B8'} />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {children?.length > 1 && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Box paddingLeft={2}>
                {children?.map((item, index) => (
                  <Tooltip title={item?.name}>
                    <div>
                      <DisplayFilter
                        showRemoveButton={index > 0}
                        isChild
                        value={showAllChildren}
                        label={item?.name}
                        onChange={() => onChange(item.name)}
                        removeFilter={removeChildFilter}
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
