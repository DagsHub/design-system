import React from 'react';
import { IconButton, Popover, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import 'dayjs/locale/en-gb';
import { DateManager } from '../dateManager';

export function deductDays(days: number) {
  let newDate = new Date();
  newDate.setDate(newDate.getDate() - days);

  return newDate;
}

const defaultPresets = [
  {
    name: '1 day ago',
    value: deductDays(1)
  },
  {
    name: '1 week ago',
    value: deductDays(7)
  },
  {
    name: '1 month ago',
    value: deductDays(30)
  }
];

const ComparePopover = ({ presets }: { presets?: { name: string; value: Date; }[]} ) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
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
          sx={{ padding: 0, height: '20px', width: '21.08px' }}
          disableRipple
          onClick={handleClick}
        >
          <AddIcon sx={{ height: '20px', width: '21.08px' }} fill={'#94A3B8'} />
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
        {presets && <DateManager presets={presets?.length ? presets : defaultPresets} />}
      </Popover>
    </div>
  );
};

export default ComparePopover;
