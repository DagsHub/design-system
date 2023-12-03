import React, { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import StyledTextField from './StyledTextField';
import './style.scss';

function CustomTextField({
  readOnly,
  value,
  onSaveHandler,
  placeholder,
  helperText,
  shouldHighlightIfEmpty,
  autoFocus
}: {
  readOnly: boolean;
  value?: string;
  onSaveHandler: (newVal?: string) => void;
  placeholder?: string;
  helperText?: string;
  shouldHighlightIfEmpty?: boolean;
  autoFocus?: boolean;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isHovered, setHovered] = useState(false);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const textFieldWrapperContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        isEditing &&
        textFieldWrapperContainerRef.current &&
        !textFieldWrapperContainerRef.current.contains(event.target)
      ) {
        saveChangesHandler();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [textFieldWrapperContainerRef, isEditing, editedValue]);

  const handleEditClick = () => {
    if (!readOnly) {
      setEditing(true);
      textFieldRef.current?.focus();
    }
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedValue(currentValue);
    textFieldRef.current?.blur();
  };

  const saveChangesHandler = () => {
    setCurrentValue(editedValue);
    onSaveHandler(editedValue);
    setHovered(false);
    setEditing(false);
    textFieldRef.current?.blur();
  };

  const handleKeyDown = (event: any) => {
    if (isEditing && event.key === 'Enter') {
      saveChangesHandler();
    }
    if (isEditing && event.key === 'Escape') {
      handleCancelClick();
    }
  };
  const getValue = () => {
    if (isEditing) {
      return editedValue ?? '';
    } else if (!!currentValue) {
      return currentValue ?? '';
    }
    return '';
  };

  useEffect(() => {
    function highlightDiv() {
      // Add the "highlight" class to the div
      textFieldWrapperContainerRef.current?.classList.add('highlight');

      // Remove the "highlight" class after 2 seconds
      setTimeout(() => {
        textFieldWrapperContainerRef.current?.classList.remove('highlight');
      }, 1000);
    }

    if (shouldHighlightIfEmpty && !currentValue) {
      highlightDiv();
    }
  }, [currentValue, shouldHighlightIfEmpty]);

  return (
    <Box
      sx={{ width: '100%', height: '100%' }}
      onMouseEnter={() => {
        if (currentValue) {
          setHovered(true);
        }
      }} //have the pencil logic only if a value already exists
      onMouseLeave={() => {
        if (currentValue) {
          setHovered(false);
        }
      }} //have the pencil logic only if a value already exists
      onMouseDown={(e) => {
        if (currentValue) {
          e.preventDefault();
        } //When there is value, make text field not focused on a regular click, but only when clicking on the edit button
      }}
      ref={textFieldWrapperContainerRef}
    >
      <StyledTextField
        changeColorOnHover={!readOnly || isEditing}
        inputRef={textFieldRef}
        helperText={helperText}
        autoFocus={autoFocus}
        InputProps={{
          autoComplete: 'off',
          readOnly: readOnly && !isEditing,
          endAdornment: isEditing ? (
            <IconButton sx={{ zIndex: 1 }} onClick={handleCancelClick}>
              <CancelIcon fontSize={'small'} />
            </IconButton>
          ) : isHovered && !readOnly ? (
            <IconButton sx={{ zIndex: 1 }} onClick={handleEditClick}>
              <EditIcon fontSize={'small'} />
            </IconButton>
          ) : null,
          sx: {
            input: {
              width: isEditing || (isHovered && !readOnly) ? 'calc(100% - 45px)' : '100%'
            }
          }
        }}
        onChange={(e: any) => {
          setEditing(true);
          setEditedValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        value={getValue()}
        placeholder={placeholder}
      />
    </Box>
  );
}

export default CustomTextField;
