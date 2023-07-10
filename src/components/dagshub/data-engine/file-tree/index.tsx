import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { FileListItem } from './FileTreeItem';
import FileList from './FileList';

export interface FileTreeInterface {
  list: FileListItem[];
  loading: boolean;
  error: boolean;
  getFilesCb: (id: string) => Promise<any>;
}

export function FileTree({ list, loading, error, getFilesCb }: FileTreeInterface) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSetSelected = (id: string) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
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
}
