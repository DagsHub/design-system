import { IconButton, Popover, Tooltip } from '@mui/material';
import 'dayjs/locale/en-gb';
import { DateManager } from '../dateManager';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Icon } from '../../icons';

function deductDays(days: number) {
  const date = new Date();
  return dayjs(date.setDate(date.getDay() - days)).format('YYYY-MM-DD');
}

export const defaultPresets: { alias: string; value: string }[] = [
  {
    alias: '1 day ago',
    value: deductDays(1)
  },
  {
    alias: '1 week ago',
    value: deductDays(7)
  },
  {
    alias: '1 month ago',
    value: deductDays(30)
  }
];

const ComparePopover = ({
  presets,
  search
}: {
  presets?: { alias: string; value: string }[];
  search: ({
    alias,
    value
  }: {
    alias: string;
    value: string;
  }) => Promise<{ alias: string; value: string }[]>;
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

  const compare = async ({ value, alias }: { value: string; alias: string }) => {
    setLoading(true);
    try {
      const res = await search({ alias, value });
      handleClose();
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

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
            border: '1px solid #E2E8F0'
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
          horizontal: 'left'
        }}
      >
        <DateManager
          close={handleClose}
          loading={loading}
          compare={compare}
          presets={presets?.length ? presets : defaultPresets}
        />
      </Popover>
    </div>
  );
};

export default ComparePopover;
