import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, IconButton, Collapse, Stack, Typography, CircularProgress } from '@mui/material';
import { Icon } from '../../../icons';
import { Tooltip } from '../../../elements';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const FILE_TYPES = {
  bucket: 'bucket',
  folder: 'folder'
};
// files, dir, storage

const fileTypeArr = [FILE_TYPES.bucket, FILE_TYPES.folder] as const;

type FileType = (typeof fileTypeArr)[number];

export interface FileItemInterface {
  selected: boolean;
  label: string;
  type: FileType;
  id: string;
  getFilesCb: (id: string) => Promise<any>;
  setSelected: (id: string) => void;
}

export type FileListItem = {
  id: string;
  type: string;
  label: string;
};

function FileTreeItem({ selected, label, id, getFilesCb, setSelected }: FileItemInterface) {
  const [open, setOpen] = useState(false);
  const [children, setChildren] = useState<FileListItem[] | null>(null);

  const [loading, setLoading] = useState(false);
  const getChildren = async (e: { stopPropagation: () => void }) => {
    e.stopPropagation();

    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
      try {
        setLoading(true);
        const res = await getFilesCb(id);
        setChildren(res);
      } catch (e) {
        // TODO error handler
      } finally {
        setLoading(false);
      }
    }

    // const children: FileListItem[] = await getFilesCb(id);
    // console.log('id', id);
    // console.log(children);
    // setChildren(children);
    // setOpen(!open);
  };

  const onItemClick = () => {
    console.log('clicked on item', id);
    setSelected(id);
  };

  return (
    <Box>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        onClick={onItemClick}
        p={1}
        sx={{
          cursor: 'pointer',
          '&:hover': {
            border: '1px solid #C4B5FD',
            borderRadius: '6px',
            backgroundColor: '#F8FAFC'
          },
          height: '32px',
          border: selected ? '1px solid rgba(196, 181, 253, 0.5)' : '1px solid white',
          background: selected ? '#F7F8FF' : 'unset',
          borderRadius: selected ? '6px' : 'unset'
        }}
      >
        <Box display={'flex'} alignItems={'center'}>
          <IconButton
            onClick={getChildren}
            disableRipple
            sx={{
              animation: 'rotation 1s infinite linear',
              transform: open ? 'rotate(90deg)' : 'unset',
              '&:hover': {
                backgroundColor: 'transparent'
              }
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                height: '12px',
                width: '16px'
              }}
            />
          </IconButton>
          <Icon
            width={20}
            height={20}
            // icon={type === 'storage' ? 'solid-bucket' : 'solid-folder'}
            icon={'solid-bucket'}
            fill={selected ? '#5467DE' : '#94A3B8'}
          />
          <Typography
            variant={'body1'}
            sx={{ color: selected ? '#5467DE' : '#172D32', paddingLeft: '5px' }}
          >
            {label}
          </Typography>
        </Box>

        <Tooltip content="Open in new tab" placement="right">
          <a className="see-all" href={''} target={'_blank'}>
            <Icon width={12} height={12} icon={'redirect'} fill={'#94A3B8'} />
          </a>
        </Tooltip>
      </Box>

      <Collapse sx={{ ml: 1 }} in={open}>
        <Stack>
          {loading && (
            <Box
              sx={{
                padding: '8px 0',
                height: '200px',
                overflowY: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <CircularProgress />
            </Box>
          )}
          {children?.map((child: FileListItem) => (
            <FileTreeItem
              setSelected={setSelected}
              getFilesCb={getFilesCb}
              selected={false}
              key={child.id}
              type={child.type}
              label={child.label}
              id={child.id}
            />
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
}

export default FileTreeItem;
