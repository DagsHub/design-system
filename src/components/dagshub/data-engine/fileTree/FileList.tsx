import React from 'react';
import FileTreeItem, { FileListItem } from './FileTreeItem';
import { Box, CircularProgress } from '@mui/material';

interface FileListInterface {
  children: FileListItem[] | null;
  loading: boolean;
  selected: string | null;
  getFilesCb: (id: string) => Promise<any>;
  setSelected: (id: string) => void;
}

const Loader = () => (
  <Box
    sx={{
      padding: '8px 0',
      height: '100px',
      overflowY: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <CircularProgress />
  </Box>
);

const FileList = ({ children, loading, setSelected, getFilesCb, selected }: FileListInterface) => {
  if (loading) {
    return <Loader />;
  }
  if (!children?.length) {
    return <Box p={1}>This file is empty</Box>;
  }
  return (
    <Box>
      {children?.map((child: FileListItem) => (
        <FileTreeItem
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

export default FileList;
