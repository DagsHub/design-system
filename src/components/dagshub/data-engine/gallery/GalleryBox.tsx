import React, {CSSProperties} from 'react';
import {Box} from "@mui/system";
import {Link} from "@mui/material";

export const GalleryBox = ({
  style,
  cell,
  onClick,
  children,
  fileName,
  fileLink = "",
}: {
  cell: { height: number; width: number };
  fileName: string;
  children: React.ReactElement | React.ReactElement[];
  style?: CSSProperties | undefined;
  onClick?: () => void;
  fileLink?: string;
}) => {
  const FILENAME_SECTION_HEIGHT = 30;

  return (
    <Box
      sx={{
        ...style,
        borderRadius: '8px',
        height: cell.height,
        width: cell.width,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
      display={'flex'}
      flexDirection={'column'}
      border={''}
    >
      <Box
        onClick={onClick}
        style={{
          height: cell.height - FILENAME_SECTION_HEIGHT,
          width: cell.width,
          backgroundColor: '#F8FAFC',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          paddingRight: '8px',
          paddingLeft: '8px',
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'end',
          justifyContent: 'flex-start',
          height: '30px',
        }}
      >
        {fileName &&
        <Link
          sx={{
            color: '#5467DE',
            cursor: 'pointer',
            '&:hover': {
              color: '#5467DE',
            },
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          underline={'none'}
          href={fileLink}
          target="_blank"
        >
          {fileName}
        </Link>}
      </Box>
    </Box>
  );
}
