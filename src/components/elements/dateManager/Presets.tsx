import React from 'react';
import { List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';

type PresetType = {
  alias: string;
  value: string;
};

const PresetsList = ({
  list,
  onPresetClick
}: {
  list: PresetType[];
  onPresetClick: (value: string) => void;
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
                borderRadius: '6px'
              }
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
                lineHeight: '20px'
              }}
              primary={item.alias}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

const Presets = ({
  onPresetClick,
  presets
}: {
  onPresetClick: (date: string) => void;
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
