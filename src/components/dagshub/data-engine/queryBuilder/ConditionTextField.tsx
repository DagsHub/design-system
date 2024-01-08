import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import StyledTextField from '../metadataKeyValue/StyledTextField';
import '../metadataKeyValue/style.scss';
import { ThemeProvider, Typography } from '@mui/material';
import theme from '../../../../theme';

export function ConditionTextField({
  disabled,
  value,
  onChange,
  placeholder,
  helperText,
  autoFocus,
  isErrored
}: {
  disabled: boolean;
  value?: string;
  onChange: (newVal?: string) => void;
  placeholder?: string;
  helperText?: string;
  shouldHighlightIfEmpty?: boolean;
  autoFocus?: boolean;
  isErrored?: boolean;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [inputWidth, setInputWidth] = useState<number>();

  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const textFieldWrapperContainerRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);
  const copyTextFieldRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setInputWidth(copyTextFieldRef.current?.scrollWidth ?? 0);
  }, [currentValue, placeholder, focused]);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        textFieldWrapperContainerRef.current &&
        !textFieldWrapperContainerRef.current.contains(event.target)
      ) {
        textFieldRef.current?.blur();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [textFieldWrapperContainerRef]);

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      textFieldRef.current?.blur();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          position: 'relative'
        }}
        onMouseDown={(e) => {
          if (disabled) {
            e.preventDefault();
          } //When disabled, make text field not focused on a regular click
        }}
        ref={textFieldWrapperContainerRef}
      >
        <StyledTextField
          helperTextPaddingBottom={'0px'}
          isErrored={isErrored}
          setBorder={!disabled}
          backgroundColor={'rgba(255, 255, 255, 1)'}
          backgroundColorHover={'rgba(248, 250, 252, 1)'}
          backgroundColorFocus={'rgba(248, 250, 252, 1)'}
          helperTextPaddingLeft={'0px'}
          disabled={disabled}
          width={'auto'}
          borderRadius={'8px'}
          changeColorOnHover={!disabled}
          inputRef={textFieldRef}
          helperText={helperText}
          autoFocus={autoFocus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          InputProps={{
            autoComplete: 'off',
            readOnly: disabled,
            sx: {
              input: {
                '&::placeholder': {
                  color: 'rgba(23, 45, 50, 1)!important',
                  opacity: 1
                },
                height: '28px',
                minWidth: '40px',
                width: `${inputWidth}px`,
                boxSizing: 'border-box'
              }
            }
          }}
          onChange={(e: any) => {
            setCurrentValue(e.target.value);
            onChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          value={currentValue}
          placeholder={focused ? undefined : placeholder}
        />
        <Typography
          variant={'medium'}
          ref={copyTextFieldRef}
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            width: 'max-content',
            zIndex: -1,
            color: 'transparent',
            borderRadius: '8px',
            padding: '0px 9px',
            minWidth: '40px',
            position: 'absolute',
            top: 0,
            left: 0,
            boxSizing: 'border-box'
          }}
        >
          {currentValue ? currentValue : focused ? undefined : placeholder}
        </Typography>
        {/*This is a hidden div that is used to calculate the width of the input field*/}
      </Box>
    </ThemeProvider>
  );
}

export default ConditionTextField;
