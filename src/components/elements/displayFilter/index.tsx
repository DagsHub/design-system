import { Divider, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';

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
    <Stack
      gap={1}
      direction={'row'}
      sx={{ cursor: 'pointer', backgroundColor: 'rgba(248, 250, 252, 1)' }}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      onClick={filterClicked}
      padding={'8px'}
      role={'button'}
    >
      <Typography
        sx={{
          lineHeight: '20px',
          color: '#172D32',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden'
        }}
      >
        {label}
      </Typography>
      <Icon icon={show ? 'eye' : 'eye-off'} height={20} width={21.08} fill={'#94A3B8'} />
    </Stack>
  );
}
