import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Dayjs } from 'dayjs';

export type PresetType = {
  name: string;
  value: Dayjs;
};

const PresetsList = ({
  list,
  onPresetClick,
}: {
  list: PresetType[];
  onPresetClick: (value: Dayjs) => void;
}) => {
  return (
    <List>
      {list?.map((item, index) => (
        <ListItem key={`${index}${item.value}`} disablePadding>
          <ListItemButton
            sx={{
              padding: '8px',
              '&:hover': {
                background: '#F1F5F9',
                padding: '8px',
                borderRadius: '6px',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onPresetClick(item.value);
            }}
          >
            <ListItemText
              primaryTypographyProps={{
                fontSize: '14px',
                fontWeight: '500',
                lineHeight: '20px',
              }}
              primary={item.name}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Presets = ({
  onPresetClick,
  presets,
}: {
  onPresetClick: (date: Dayjs) => void;
  presets: PresetType[];
}) => {
  return (
    <>
      <Box p={1}>
        <Typography variant={'mediumBold'}>Quick presets:</Typography>
      </Box>
      <PresetsList list={presets} onPresetClick={onPresetClick} />
    </>
  );
};

export default Presets;
