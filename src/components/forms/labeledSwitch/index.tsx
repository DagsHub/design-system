import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { useEffect } from 'react';

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
  checked
}: {
  onChange: () => void;
  label?: string;
  checked: boolean;
}) {
  return (
    <FormGroup>
      <FormControlLabel
        onChange={onChange}
        control={<StyledSwitch sx={{ m: 1 }} checked={checked} />}
        label={label}
        labelPlacement={'start'}
        sx={{
          margin: '0px!important',
          gap: '8px',
          padding: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          '.MuiSwitch-root': {
            margin: '0px'
          },
          '.MuiTypography-root': {
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 500,
            color: '#172D32'
          }
        }}
      />
    </FormGroup>
  );
}
