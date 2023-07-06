import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import FileTreeItem, { FileListItem } from './FileTreeItem';

export interface FileTreeInterface {
  list: FileListItem[];
  loading: boolean;
  error: boolean;
  getFilesCb: (id: string) => Promise<any>;
}

export const FileTree = ({ list, loading, error, getFilesCb }: FileTreeInterface) => {
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
        // spacing={1}
        sx={{
          paddingBottom: 4,
          minHeight: '200px',
          maxHeight: '300px',
          overflowY: 'auto'
        }}
      >
        <Box>selected {selected}</Box>
        {list.map((file) => (
          <FileTreeItem
            setSelected={handleSetSelected}
            getFilesCb={getFilesCb}
            selected={selected == file.id}
            key={file.id}
            type={file.type}
            label={file.label}
            id={file.id}
          />
        ))}
      </Stack>
    </Box>
  );
};
