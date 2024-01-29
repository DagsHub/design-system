import React, { useState } from 'react';
import { Box, IconButton, Collapse, Stack, Typography } from '@mui/material';
import { Icon } from '../../../icons';
import { Tooltip } from '../../../elements';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FileList } from './FileList';

export interface FileItemInterface {
  selected: string | null;
  label: string;
  type: string;
  emptyMessage?: string;
  id: string;
  href?: string;
  getFilesCb: (id: string) => Promise<any>;
  setSelected: (id: string) => void;
}

export type FileListItemType = {
  id: string;
  type: string;
  label: string;
  href?: string;
};

export function FileTreeItem({
  selected,
  label,
  id,
  getFilesCb,
  setSelected,
  type,
  href,
  emptyMessage,
}: FileItemInterface) {
  const [open, setOpen] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [children, setChildren] = useState<FileListItemType[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState<any>({});

  const getChildren = async (id: string) => {
    try {
      setLoading(true);
      const res = await getFilesCb(id);
      setChildren(res);
      if (!res?.length) {
        setIsEmpty(true);
      }
      const newCache = { ...cache };
      newCache[id] = res;
      setCache(newCache);
    } catch (e) {
      setChildren(null);
    } finally {
      setLoading(false);
    }
  };

  const onItemClick = () => setSelected(id);

  const isSelected = id === selected;

  const openFileHandler = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      if (cache[id]) {
        return cache[id];
      } else {
        getChildren(id);
      }
    }
  };

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        onClick={onItemClick}
        px={1}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            border: '1px solid #C4B5FD',
            borderRadius: '6px',
            backgroundColor: '#F8FAFC',
          },
          height: '32px',
          border: isSelected ? '1px solid rgba(196, 181, 253, 0.5)' : '1px solid white',
          background: isSelected ? '#F7F8FF' : 'unset',
          borderRadius: isSelected ? '6px' : 'unset',
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <IconButton
            onClick={openFileHandler}
            disableRipple
            sx={{
              visibility: isEmpty ? 'hidden' : 'unset',
              transition: '.1s ease-in-out',
              transform: open ? 'rotate(90deg)' : 'unset',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                height: '12px',
                width: '16px',
              }}
            />
          </IconButton>
          <Icon
            width={20}
            height={20}
            icon={`solid-${type}`}
            fill={isSelected ? '#5467DE' : '#94A3B8'}
          />
          <Typography
            variant={'body1'}
            sx={{ color: isSelected ? '#5467DE' : '#172D32', paddingLeft: '5px' }}
          >
            {label}
          </Typography>
        </Box>

        {href && (
          <Tooltip content="Open in new tab" placement="right">
            <a className="see-all" href={href} target={'_blank'}>
              <Icon width={12} height={12} icon={'redirect'} fill={'#94A3B8'} />
            </a>
          </Tooltip>
        )}
      </Box>

      {!isEmpty && (
        <Collapse sx={{ ml: 2 }} in={open}>
          <Stack>
            <FileList
              emptyMessage={emptyMessage}
              children={children}
              loading={loading}
              setSelected={setSelected}
              getFilesCb={getFilesCb}
              selected={selected}
            />
          </Stack>
        </Collapse>
      )}
    </Box>
  );
}
