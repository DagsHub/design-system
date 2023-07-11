import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { FileListItemType } from './FileTreeItem';
import { FileList } from './FileList';

export interface FileTreeInterface {
  list: FileListItemType[];
  loading: boolean;
  onSelect: (id: string | null) => void;
  getFilesCb: (id: string) => Promise<any>;
}

export const FileTree = ({ list, loading, getFilesCb, onSelect }: FileTreeInterface) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSetSelected = (id: string) => {
    if (selected === id) {
      setSelected(null);
      onSelect(null);
    } else {
      setSelected(id);
      onSelect(id);
    }
  };

  return (
    <Box>
      <Stack
        sx={{
          paddingBottom: 4,
          minHeight: '200px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}
      >
        <FileList
          children={list}
          loading={loading}
          setSelected={handleSetSelected}
          getFilesCb={getFilesCb}
          selected={selected}
        />
      </Stack>
    </Box>
  );
};
