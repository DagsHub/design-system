import React, {useState, useRef, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Box from "@mui/material/Box";
import CancelIcon from '@mui/icons-material/Cancel';

function CustomTextField({
                             readOnly,
                             value,
                             onChange,
                             placeholder,
                             helperText,
                         }: {
    readOnly: boolean;
    value?: string;
    onChange: (newVal?: string) => void;
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
        function handleClickOutside(event:any) {
            if (isEditing && textFieldWrapperContainerRef.current && !textFieldWrapperContainerRef.current.contains(event.target)) {
                handleSaveClick()
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
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

    const handleSaveClick = () => {
        setCurrentValue(editedValue)
        onChange(editedValue);
        setHovered(false);
        setEditing(false);
        textFieldRef.current?.blur();
    };

    const handleKeyDown = (event:any) => {
        if (isEditing && event.key === 'Enter') {
            handleSaveClick();
        }
    };

    return (
        <Box
            sx={{width: "100%", height:"100%"}}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseDown={e => {
                e.preventDefault() //make text field not focused on a regular click, but only when clicking in the edit button
            }}
            ref={textFieldWrapperContainerRef}
        >
            <TextField
                sx={{
                    width: "100%",
                    height:"100%",
                    '.Mui-focused': {
                        background: 'rgba(255, 255, 255, 1)!important',
                        boxShadow: "inset 0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important",
                    },
                    '.MuiInputBase-root': {
                        width:"100%",
                        height: '100%',
                        backgroundColor: 'rgba(248, 250, 252, 1)',
                        '&:hover': {
                            background: !readOnly && 'rgba(241, 245, 249, 1)',
                        },
                    },
                    '.MuiInputBase-input': {
                        fontFamily:"Inter",
                        fontWeight:500,
                        fontSize:"14px",
                        lineHeight:"20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: '8px',
                    },
                    '.MuiOutlinedInput-notchedOutline': {
                        border: '0px',
                    },
                    '.MuiSvgIcon-root ': {
                        fill: 'rgba(148, 163, 184, 1)'
                    },
                    '.MuiFormHelperText-root':{
                        fontFamily:"Inter",
                        fontWeight:500,
                        fontSize:"12px",
                        lineHeight:"16.8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        color: "rgba(71, 85, 105, 1)",
                        margin:"0px",
                        paddingLeft:"8px",
                        paddingBottom:"8px",
                    }
                }}
                inputRef={textFieldRef}
                InputProps={{
                    autoComplete:'off',
                    readOnly:readOnly && !isEditing,
                    endAdornment: isEditing ? (
                        <IconButton onClick={handleCancelClick}>
                            <CancelIcon fontSize={"small"}/>
                        </IconButton>
                    ) : (isHovered && !readOnly) ? (
                        <IconButton onClick={handleEditClick}>
                            <EditIcon fontSize={"small"}/>
                        </IconButton>
                    ) : null,
                }}
                onChange={(e) => {setEditedValue(e.target.value)}}
                onKeyDown={handleKeyDown}
                value={isEditing ? editedValue : currentValue}
                placeholder={placeholder}
                helperText={helperText}
            />
        </Box>
    );
}

export default CustomTextField;
