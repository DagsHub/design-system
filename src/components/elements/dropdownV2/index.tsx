import * as React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import { RadioButtonItemProps } from '../../forms';

export function DropdownV2({
  onChange,
  initialChecked,
  options,
  errored,
  isReadOnly,
  helperText,
  label,
  maxWidth
}: {
  onChange: (event: SyntheticEvent<Element, Event>, value: RadioButtonItemProps | null) => void;
  initialChecked?: RadioButtonItemProps | undefined;
  options: RadioButtonItemProps[];
  errored: boolean;
  isReadOnly: boolean;
  helperText?: string | undefined;
  label: string;
  maxWidth?: string;
}) {
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Box sx={{ display: 'flex', gap: '8px', width: maxWidth ?? '100%', flexDirection: 'column' }}>
      <Autocomplete
        disablePortal
        id="auto-complete-select"
        options={options ?? []}
        value={initialChecked}
        onChange={onChange}
        autoHighlight
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        sx={{
          '.Mui-focused': {
            background: 'rgba(241, 245, 249, 1)!important',
            boxShadow: '0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important'
          },
          '.MuiInputBase-root': {
            height: '44px',
            backgroundColor: '#f8fafc',
            border: errored ? '1px solid #ef4444' : '1px solid #cbd5e1',
            borderRadius: '12px',
            '&:hover': {
              background: 'rgba(241, 245, 249, 1)'
            },
            '&:focus': {
              background: 'rgba(241, 245, 249, 1)!important',
              boxShadow: '0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important'
            }
          },
          '.MuiInputBase-input': {
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            padding: '0px!important'
          },
          '.MuiOutlinedInput-notchedOutline': {
            border: '0px',
            '&:hover': {
              background: 'rgba(241, 245, 249, 1)'
            },
            '&:focus': {
              background: 'rgba(241, 245, 249, 1)!important',
              boxShadow: '0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important'
            }
          },
          '.MuiSvgIcon-root ': {
            fill: '#64748B !important'
          }
        }}
        renderInput={({ inputProps, ...rest }) => (
          <TextField
            {...rest}
            inputProps={{ ...inputProps, readOnly: isReadOnly }}
            placeholder={label}
          />
        )}
      />
      {helperText && (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: '20px',
            color: errored ? '#ef4444' : '#64748b'
          }}
        >
          {helperText}
        </Typography>
      )}
    </Box>
  );
}
