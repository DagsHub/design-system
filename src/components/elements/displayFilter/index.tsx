import {IconButton, Stack, ThemeProvider, Typography} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';
import theme from '../../../theme';
import {Box} from "@mui/system";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface DisplayFilterProps {
  label: string;
  onChange: () => void;
  value: boolean;
}

export function DisplayFilter({ label, onChange, value }: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(false);

  const filterClicked = () => {
    const currentShow = show;
    setShow(!currentShow);
    onChange();
  };

  useEffect(() => {
    setShow(value);
  }, [value]);

  return (
    <ThemeProvider theme={theme}>
      <Stack
          width={'100%'}
        gap={1}
        direction={'row'}
        sx={{ cursor: 'pointer', backgroundColor: 'rgba(248, 250, 252, 1)', color: 'black' }}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        onClick={filterClicked}
        padding={'8px'}
        role={'button'}
      >
        <Box width={'inherit'} sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <Typography variant={'medium'}>{label}</Typography>
            <IconButton onClick={() => {console.log('clicked')}} >
              <ExpandMoreIcon />
            </IconButton>


          </Box>
          <Icon icon={show ? 'eye' : 'eye-off'} height={20} width={21.08} fill={'#94A3B8'} />

        </Box>
      </Stack>
    </ThemeProvider>
  );
}
