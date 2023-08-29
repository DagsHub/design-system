import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';

export interface DisplayFilterProps {
  label: string;
  onChange: (show: boolean) => void;
  value: boolean;
}
export function DisplayFilter({ label, onChange, value }: DisplayFilterProps) {
  const [show, setShow] = useState<boolean>(false);

  const filterClicked = () => {
    setShow(!show);
    onChange(!show);
  };

  useEffect(() => {
    setShow(value);
  }, [value]);

  return (
    <Stack
      gap={1}
      direction={'row'}
      sx={{ cursor: 'pointer', width: 'fit-content' }}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      onClick={filterClicked}
      role={'button'}
    >
      <Typography
        sx={{
          padding: 1,
          lineHeight: '20px',
          color: '#172D32',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          width: '144px'
        }}
      >
        {label}
      </Typography>

      <Icon icon={show ? 'eye' : 'eye-off'} height={16} width={16} fill={'#94A3B8'} />
    </Stack>
  );
}
