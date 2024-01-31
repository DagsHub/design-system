import { IconButton, Popover, Tooltip } from '@mui/material';
import 'dayjs/locale/en-gb';
import { DateManager } from '../dateManager';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Icon } from '../../icons';

export type PresetType = {
  name: string;
  value: dayjs.Dayjs;
};

export const defaultPresets: PresetType[] = [
  {
    name: '1 day ago',
    value: dayjs().subtract(1, 'day'),
  },
  {
    name: '1 week ago',
    value: dayjs().subtract(7, 'day'),
  },
  {
    name: '1 month ago',
    value: dayjs().subtract(30, 'day'),
  },
];

const ComparePopover = ({
  presets,
  addNewFilter,
}: {
  presets?: PresetType[];
  addNewFilter: ({ alias, value }: { alias: string; value: number }) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'popover' : undefined;

  return (
    <div>
      <Tooltip title="Compare to other version">
        <IconButton
          aria-describedby={id}
          sx={{
            padding: 0,
            height: '24px',
            width: '32px',
            '&:hover': { backgroundColor: 'transparent' },
            borderRadius: '32px',
            border: '1px solid #E2E8F0',
          }}
          onClick={handleClick}
        >
          <Icon height={16} width={16} icon={'history'} fill={'#94A3B8'} />
        </IconButton>
      </Tooltip>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <DateManager
          close={handleClose}
          loading={loading}
          compare={addNewFilter}
          presets={presets?.length ? presets : defaultPresets}
        />
      </Popover>
    </div>
  );
};

export default ComparePopover;
