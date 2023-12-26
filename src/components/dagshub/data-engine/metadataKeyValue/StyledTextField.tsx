import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

function StyledTextField({
  changeColorOnHover,
  focusModeDisabled,
  borderRadius,
  width,
  isErrored,
  setBorder,
  disabled,
  backgroundColor = 'rgba(248, 250, 252, 1)',
  backgroundColorHover = 'rgba(241, 245, 249, 1)',
  backgroundColorFocus = 'rgba(255, 255, 255, 1)',
  helperTextPaddingLeft = '8px',
  ...restProps
}: {
  changeColorOnHover?: boolean;
  focusModeDisabled?: boolean;
  borderRadius?: string;
  width?: string;
  isErrored?: boolean;
  setBorder?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  backgroundColorHover?: string;
  backgroundColorFocus?: string;
  helperTextPaddingLeft?: string;
} & TextFieldProps) {
  return (
    <TextField
      {...restProps}
      sx={{
        width: width ?? '100%',
        '.Mui-focused': {
          background: !focusModeDisabled ? `${backgroundColorFocus}!important` : undefined,
          boxShadow: !focusModeDisabled
            ? 'inset 0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important'
            : undefined,
          '.MuiOutlinedInput-notchedOutline': {
            border: '0px!important'
          }
        },
        '.MuiInputBase-root': {
          width: '100%',
          backgroundColor: !disabled ? backgroundColor : undefined,
          borderRadius: borderRadius ?? 0,
          '&:hover': {
            background: changeColorOnHover ? backgroundColorHover : undefined
          },
          position: 'relative',
          paddingRight: '0px'
        },
        '.MuiInputBase-input': {
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '14px',
          lineHeight: '20px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          padding: '8px'
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: isErrored
            ? 'rgba(239, 68, 68, 1)!important'
            : 'rgba(226, 232, 240, 1)!important',
          '&:hover': {
            borderColor: isErrored
              ? 'rgba(239, 68, 68, 1)!important'
              : 'rgba(203, 213, 225, 1)!important'
          },
          border: setBorder ? (isErrored ? '2px solid' : '1px solid') : '0px'
        },
        '.MuiSvgIcon-root ': {
          fill: 'rgba(148, 163, 184, 1)'
        },
        '.MuiButtonBase-root': {
          padding: '6px',
          position: 'absolute',
          right: '8px'
        },
        '.MuiFormHelperText-root': {
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16.8px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: isErrored ? 'rgba(239, 68, 68, 1)' : 'rgba(71, 85, 105, 1)',
          margin: '0px',
          paddingLeft: helperTextPaddingLeft,
          paddingBottom: '8px',
          boxShadow: 'none!important'
        }
      }}
    />
  );
}

export default StyledTextField;
