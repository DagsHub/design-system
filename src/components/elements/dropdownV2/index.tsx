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
  isSquareCorners,
  withoutBorder,
  disableClearable,
  shouldHighlightIfEmpty,
  makeWidthDynamic,
  menuWidth,
  removeEndAdornment,
  unsetMenuMaxHeight,
  placeholderColor,
  alignInputTextToCenter,
  height = '44px',
  backgroundColorFocus = 'rgba(241, 245, 249, 1)',
  inputColor = 'rgba(23, 45, 50, 1)',
  inputBorderRadius = '12px',
  borderColor = '#cbd5e1',
  borderColorHover = '#cbd5e1',
  bgColor = '#f8fafc',
  bgColorHover = 'rgba(241, 245, 249, 1)',
  autoFocus
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
  makeWidthDynamic?: boolean;
  menuWidth?: string;
  removeEndAdornment?: boolean;
  unsetMenuMaxHeight?: boolean;
  inputColor?: string;
  inputBorderRadius?: string;
  borderColor?: string;
  borderColorHover?: string;
  bgColor?: string;
  bgColorHover?: string;
  placeholderColor?: string;
  alignInputTextToCenter?: boolean;
  autoFocus?: boolean;
}) {
  const [inputValue, setInputValue] = React.useState(initialChecked?.label ?? '');
  const [open, setOpen] = useState(false);
  const autoCompleteWrapperRef = useRef<HTMLDivElement | null>(null);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const copyTextFieldRef = useRef<HTMLDivElement | null>(null);
  const END_ADORNMENT_WIDTH = 24;
  const [inputWidth, setInputWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    setInputValue(initialChecked?.label ?? '');
  }, [initialChecked]);

  useEffect(() => {
    if (makeWidthDynamic) {
      setInputWidth(copyTextFieldRef.current?.scrollWidth ?? 0);
    }
  }, [inputValue, label, makeWidthDynamic]);

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
          maxWidth: maxWidth,
          minWidth: '40px',
          width: makeWidthDynamic ? `${inputWidth}px` : '100%',
          height: '100%',
          flexDirection: 'column',
          '.MuiPaper-root': {
            borderRadius: '12px',
            marginTop: '2px',
            width: menuWidth ? '200px' : undefined
          },
          '.MuiAutocomplete-endAdornment': {
            display: removeEndAdornment ? 'none' : undefined,
            right: makeWidthDynamic ? '4px!important' : undefined
          },
          '.MuiAutocomplete-option': {
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: '8px!important',
            boxSizing: 'border-box!important',
            height: '36px!important',
            minHeight: 'unset!important'
          }
        }}
      >
        <Typography
          variant={'medium'}
          ref={copyTextFieldRef}
          style={{
            display: 'flex',
            zIndex: -1,
            color: 'transparent',
            borderRadius: '8px',
            padding: '0px 10px',
            flexWrap: 'nowrap',
            width: 'max-content',
            boxSizing: 'border-box',
            height: '0px',
            paddingRight: removeEndAdornment ? '10px' : `${END_ADORNMENT_WIDTH + 10}px`
          }}
        >
          {inputValue ? inputValue : label}
        </Typography>
        {/*This is a hidden div that is used to calculate the width of the input field*/}
        <Autocomplete
          isOptionEqualToValue={(option: RadioButtonItemProps, value:RadioButtonItemProps) => option.id === value.id && option.label === value.label}
          noOptionsText={
            <Typography
              sx={{
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              No matching options
            </Typography>
          }
          disableClearable={disableClearable}
          ListboxProps={{
            style: {
              maxHeight: unsetMenuMaxHeight ? 'unset' : undefined,
              padding: '8px',
              left: '0px'
            }
          }}
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
          onInputChange={(event, newInputValue, reason) => {
            if (makeWidthDynamic && reason === 'input' && newInputValue === '') {
              // Erasing input
              setOpen(false);
            }
            setInputValue(newInputValue);
          }}
          sx={{
            height: '100%',
            display: 'flex',
            '.Mui-focused': {
              background: `${backgroundColorFocus}!important`,
              boxShadow: 'inset 0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important',
              '.MuiOutlinedInput-notchedOutline': {
                border: '0px!important'
              }
            },
            '.MuiInputBase-root': {
              boxSizing: 'border-box',
              height: height,
              backgroundColor: bgColor,
              '&:hover': {
                background: bgColorHover,
                borderColor: `${borderColorHover}!important`
              },
              borderColor: errored ? '#ef4444!important' : `${borderColor}!important`,
              borderRadius: isSquareCorners ? '0px' : inputBorderRadius,
              border: !withoutBorder ? '1px solid' : '0px',
              padding: '0px 8px!important'
            },
            '.MuiInputBase-input': {
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              color: inputColor,
              padding: '0px!important',
              fontFamily: 'Inter',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '20px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minWidth: '0px!important',
              textAlign: alignInputTextToCenter ? 'center' : undefined,
              '&::placeholder': {
                color: placeholderColor ? placeholderColor : undefined,
                opacity: placeholderColor ? 1 : undefined
              }
            },
            '.MuiOutlinedInput-notchedOutline': {
              border: '0px'
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
              autoFocus={autoFocus}
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
