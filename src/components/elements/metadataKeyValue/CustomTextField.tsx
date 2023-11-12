import React, { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Cancel';
import StyledTextField from './StyledTextField';

function CustomTextField({
  readOnly,
  value,
  saveLocallyHandler,
  placeholder,
  helperText
}: {
  readOnly: boolean;
  value?: string;
  saveLocallyHandler: (newVal?: string) => void;
  placeholder?: string;
  helperText?: string;
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isEditing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isHovered, setHovered] = useState(false);
  const textFieldRef = useRef<HTMLDivElement | null>(null);
  const textFieldWrapperContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (
        isEditing &&
        textFieldWrapperContainerRef.current &&
        !textFieldWrapperContainerRef.current.contains(event.target)
      ) {
        onSaveHandler();
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

  const onSaveHandler = () => {
    setCurrentValue(editedValue);
    saveLocallyHandler(editedValue);
    setHovered(false);
    setEditing(false);
    textFieldRef.current?.blur();
  };

  const handleKeyDown = (event: any) => {
    if (isEditing && event.key === 'Enter') {
      onSaveHandler();
    }
  };

  return (
    <Box
      sx={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => {
        e.preventDefault(); //make text field not focused on a regular click, but only when clicking in the edit button
      }}
      ref={textFieldWrapperContainerRef}
    >
      <StyledTextField
        changeColorOnHover={!readOnly || isEditing}
        inputRef={textFieldRef}
        InputProps={{
          autoComplete: 'off',
          readOnly: readOnly && !isEditing,
          endAdornment: isEditing ? (
            <IconButton onClick={handleCancelClick}>
              <CancelIcon fontSize={'small'} />
            </IconButton>
          ) : isHovered && !readOnly ? (
            <IconButton onClick={handleEditClick}>
              <EditIcon fontSize={'small'} />
            </IconButton>
          ) : null
        }}
        onChange={(e: any) => {
          setEditedValue(e.target.value);
        }}
        onKeyDown={handleKeyDown}
        value={isEditing ? editedValue : currentValue}
        placeholder={placeholder}
        helperText={helperText}
      />
    </Box>
  );
}

export default CustomTextField;
