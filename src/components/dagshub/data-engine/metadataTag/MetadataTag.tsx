import { Box } from '@mui/system';
import React from 'react';
import { SxProps } from '@mui/material';
import { Theme } from '@emotion/react';

export function MetadataTag({
  label,
  value,
  maxWidth,
  sx,
}: {
  label?: string;
  value: any;
  maxWidth?: number | string;
  sx?: SxProps<Theme> | undefined;
}) {
  return (
    <Box
      style={{
        lineHeight: '16px',
        paddingRight: '8px',
        paddingLeft: '8px',
        borderRadius: '32px',
        maxWidth: maxWidth ? maxWidth : '100%',
        height: '16px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'block',
        cursor: 'default',
        fontSize: '12px',
        fontFamily: 'Inter',
        fontWeight: 600,
        boxSizing: 'border-box',
        backgroundColor: 'rgba(241, 245, 249, 1)',
        color: 'rgba(100, 116, 139, 1)',
      }}
      sx={sx}
      key={label}
    >
      {label && `${label} : `}
      {`${value}`}
    </Box>
  );
}
