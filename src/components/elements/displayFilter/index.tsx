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
    const currentShow = show;
    setShow(!currentShow);
    onChange(!currentShow);
  };

  useEffect(() => {
    setShow(value);
  }, [value]);

  return (
    <Stack
      gap={1}
      direction={'row'}
      sx={{ cursor: 'pointer', width: '100%', backgroundColor: "rgba(248, 250, 252, 1)" }}
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      onClick={filterClicked}
      padding={"8px"}
      role={'button'}
      width={"100%"}
    >
      <Typography
        sx={{
          lineHeight: '20px',
          color: '#172D32',
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 500,
          width: '100%'
        }}
      >
        {label}
      </Typography>

      <Icon icon={show ? 'eye' : 'eye-off'} height={16} width={16} fill={'#94A3B8'} />
    </Stack>
  );
}
