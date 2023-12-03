import * as React from 'react';
import { Autocomplete, TextField, ThemeProvider, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { RadioButtonItemProps } from '../../forms';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import './style.scss';
import theme from '../../../theme';

export function DropdownV2({
  onChange,
  initialChecked,
  options,
  errored,
  isReadOnly,
  helperText,
  label,
  maxWidth,
  height,
  isSquareCorners,
  backgroundColorFocus,
  withoutBorder,
  disableClearable,
  shouldHighlightIfEmpty
}: {
  onChange: (event: SyntheticEvent<Element, Event>, value: RadioButtonItemProps | null) => void;
  initialChecked?: RadioButtonItemProps | undefined;
  options: RadioButtonItemProps[];
  errored: boolean;
  isReadOnly: boolean;
  helperText?: string | undefined;
  label: string;
  maxWidth?: string;
  height?: string;
  isSquareCorners?: boolean;
  backgroundColorFocus?: string;
  withoutBorder?: boolean;
  disableClearable?: boolean;
  shouldHighlightIfEmpty?: boolean;
}) {
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = useState(false);

  const autoCompleteWrapperRef = useRef<HTMLDivElement | null>(null);
  const textFieldRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (autoCompleteWrapperRef.current && !autoCompleteWrapperRef.current.contains(event.target)) {
      setOpen(false);
      textFieldRef.current?.blur();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      setOpen(!open);
    }
  };

  useEffect(() => {
    function highlightDiv() {
      // Add the "highlight" class to the div
      autoCompleteWrapperRef.current?.classList.add('highlight');

      // Remove the "highlight" class after 2 seconds
      setTimeout(() => {
        autoCompleteWrapperRef.current?.classList.remove('highlight');
      }, 1000);
    }

    if (shouldHighlightIfEmpty && !inputValue) {
      highlightDiv();
    }
  }, [inputValue, shouldHighlightIfEmpty]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        ref={autoCompleteWrapperRef}
        sx={{
          display: 'flex',
          gap: '8px',
          width: maxWidth ?? '100%',
          height: '100%',
          flexDirection: 'column',
          '.MuiAutocomplete-option': {
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '8px'
          }
        }}
      >
        <Autocomplete
          disableClearable={disableClearable}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          onKeyDown={handleKeyDown}
          popupIcon={<ExpandMoreIcon />}
          clearIcon={<CancelIcon fontSize={'small'} />}
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
            height: '100%',
            display: 'flex',
            '.Mui-focused': {
              background: backgroundColorFocus
                ? `${backgroundColorFocus}!important`
                : 'rgba(241, 245, 249, 1)!important',
              boxShadow: 'inset 0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important'
            },
            '.MuiInputBase-root': {
              height: height ? height : '44px',
              backgroundColor: '#f8fafc',
              border: !withoutBorder
                ? errored
                  ? '1px solid #ef4444'
                  : '1px solid #cbd5e1'
                : undefined,
              borderRadius: isSquareCorners ? '0px' : '12px',
              '&:hover': {
                background: 'rgba(241, 245, 249, 1)'
              }
            },
            '.MuiInputBase-input': {
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              padding: '0px!important',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: '0px',
              '&:hover': {
                background: 'rgba(241, 245, 249, 1)'
              }
            },
            '.MuiSvgIcon-root ': {
              fill: 'rgba(148, 163, 184, 1)'
            }
          }}
          renderInput={({ inputProps, ...rest }) => (
            <TextField
              inputRef={textFieldRef}
              {...rest}
              inputProps={{
                ...inputProps,
                readOnly: isReadOnly
              }}
              placeholder={label}
            />
          )}
        />
        {helperText && (
          <Typography
            variant={'small'}
            sx={{
              color: errored ? '#ef4444' : '#64748b'
            }}
          >
            {helperText}
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
}
