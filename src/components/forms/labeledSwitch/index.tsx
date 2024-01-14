import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import {Typography} from "@mui/material";

const StyledSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 48,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: '2px',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        opacity: 1,
        border: 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 20,
    height: 20
  },
  '& .MuiSwitch-track': {
    borderRadius: 23 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));

export function LabeledSwitch({
  onChange,
  label,
  checked,
  labelPlacement = 'start',
  padding = '8px',
  color = '#172D32',
  disabled = false
}: {
  onChange: () => void;
  label?: string;
  checked: boolean;
  labelPlacement?: 'start' | 'end';
  padding?: string;
  color?: string;
  disabled?: boolean;
}) {
  return (
    <FormGroup>
      <FormControlLabel
        onChange={onChange}
        control={<StyledSwitch sx={{ m: 1 }} checked={checked} />}
        label={<Typography variant={"medium"}>{label}</Typography>}
        labelPlacement={labelPlacement}
        disabled={disabled}
        sx={{
          margin: '0px!important',
          gap: '8px',
          padding: padding,
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
          '.MuiSwitch-root': {
            margin: '0px',
          },
          '.MuiTypography-root': {
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            color: color,
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden'
          }
        }}
      />
    </FormGroup>
  );
}
