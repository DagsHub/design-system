import { IconButton, Stack, ThemeProvider, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';
import theme from '../../../theme';
import AddNewFieldPopover from './AddNewFieldPopover';
import { Box } from '@mui/system';
import { FilterType } from '../controlledDisplayFiltersGroup';

export interface DisplayFilterProps {
  filter: FilterType;
  onChange: (filter: FilterType) => void;
  addNewFilter: ({ alias, value, name }: { alias: string; value: number; name: string }) => void;
  value: boolean;
  showCompareButton?: boolean;
}

export function DisplayFilter({
  filter,
  onChange,
  value,
  addNewFilter,
  showCompareButton,
}: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(false);

  const filterClicked = () => {
    setShow(!show);
    onChange(filter);
  };

  useEffect(() => {
    setShow(value);
  }, [value]);

  const addNewFilterHandler = ({ alias, value }: { alias: string; value: number }) => {
    addNewFilter({ alias, value, name: filter.name });
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        gap={1}
        direction={'row'}
        sx={{
          background: '#F8FAFC',
          color: '#172D32',
          '&:hover': {
            backgroundColor: '#F1F5F9',
          },
          '&:hover #cancel': {
            display: 'initial',
          },
          borderLeft: '3px solid transparent',
        }}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'8px'}
      >
        <Box display={'flex'} gap={1.5} alignItems={'center'}>
          <IconButton
            sx={{
              height: '24px',
              width: '24px',
              padding: 0,
              '&:hover': { backgroundColor: 'transparent' },
            }}
            onClick={filterClicked}
          >
            <Icon icon={show ? 'eye' : 'eye-off'} height={20} width={21.08} fill={'#94A3B8'} />
          </IconButton>
          <Tooltip title={filter.alias}>
            <Typography
              sx={{
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: '130px',
                cursor: 'unset',
              }}
              variant={'medium'}
              component={'div'}
            >
              {filter.alias}
            </Typography>
          </Tooltip>
        </Box>

        {showCompareButton && (
          <AddNewFieldPopover oldReferenceName={filter.name} addNewFilter={addNewFilterHandler} />
        )}
      </Stack>
    </ThemeProvider>
  );
}
