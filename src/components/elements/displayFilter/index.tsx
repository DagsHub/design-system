import { IconButton, Stack, ThemeProvider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';
import theme from '../../../theme';
import ComparePopover from './ComparePopover';
import { Box } from '@mui/system';

export interface DisplayFilterProps {
  filter: { alias: string; value: string };
  onChange: ({ alias, value }: { alias: string; value: string }) => void;
  value: boolean;
  search: ({
    alias,
    value
  }: {
    alias: string;
    value: string;
  }) => Promise<{ alias: string; value: string }[]>;
}

export function DisplayFilter({ filter, onChange, value, search }: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(false);

  const filterClicked = () => {
    setShow(!show);
    onChange(filter);
  };

  useEffect(() => {
    setShow(value);
  }, [value]);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        gap={1}
        direction={'row'}
        sx={{
          background: '#F8FAFC',
          color: '#172D32',
          '&:hover': {
            backgroundColor: '#F1F5F9'
          },
          '&:hover #cancel': {
            display: 'initial'
          },
          borderLeft: '3px solid transparent'
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
              '&:hover': { backgroundColor: 'transparent' }
            }}
            onClick={filterClicked}
          >
            <Icon icon={show ? 'eye' : 'eye-off'} height={20} width={21.08} fill={'#94A3B8'} />
          </IconButton>
          <Typography
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              width: '130px'
            }}
            variant={'medium'}
            component={'div'}
          >
            {filter.alias}
          </Typography>
        </Box>

        <ComparePopover search={search} />
      </Stack>
    </ThemeProvider>
  );
}
