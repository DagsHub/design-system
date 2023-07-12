import React from 'react';
import { FileListItemType, FileTreeItem } from './FileTreeItem';
import { Box, CircularProgress } from '@mui/material';

interface FileListInterface {
  children: FileListItemType[] | null;
  loading: boolean;
  selected: string | null;
  getFilesCb: (id: string) => Promise<any>;
  setSelected: (id: string) => void;
}

const Loader = () => (
  <Box
    sx={{
      height: '32px',
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <CircularProgress size={22} />
  </Box>
);

export const FileList = ({
  children,
  loading,
  setSelected,
  getFilesCb,
  selected
}: FileListInterface) => {
  if (loading) {
    return <Loader />;
  }
  if (!children?.length) {
    return <Box p={1}>This file is empty</Box>;
  }
  return (
    <Box>
      {children?.map((child: FileListItemType) => (
        <FileTreeItem
          href={child?.href}
          setSelected={setSelected}
          getFilesCb={getFilesCb}
          selected={selected}
          key={child.id}
          type={child.type}
          label={child.label}
          id={child.id}
        />
      ))}
    </Box>
  );
};
