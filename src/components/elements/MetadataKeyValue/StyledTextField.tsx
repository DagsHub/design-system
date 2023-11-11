import React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';

function StyledTextField({changeColorOnHover, ...restProps}: { changeColorOnHover?: boolean } & TextFieldProps) {

    return (
        <TextField
            {...restProps}
            sx={{
                width: "100%",
                height: "100%",
                '.Mui-focused': {
                    background: 'rgba(255, 255, 255, 1)!important',
                    boxShadow: "inset 0px 0px 0px 3px rgba(196, 181, 253, 0.5)!important",
                },
                '.MuiInputBase-root': {
                    width: "100%",
                    height: '100%',
                    backgroundColor: 'rgba(248, 250, 252, 1)',
                    borderRadius:0,
                    '&:hover': {
                        background: changeColorOnHover ? 'rgba(241, 245, 249, 1)' : undefined,
                    },
                },
                '.MuiInputBase-input': {
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "20px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: '8px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: '0px',
                },
                '.MuiSvgIcon-root ': {
                    fill: 'rgba(148, 163, 184, 1)',
                },
                '.MuiButtonBase-root':{
                    padding: "6px"
                },
                '.MuiFormHelperText-root': {
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: "12px",
                    lineHeight: "16.8px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: "rgba(71, 85, 105, 1)",
                    margin: "0px",
                    paddingLeft: "8px",
                    paddingBottom: "8px",
                }
            }}
        />
    );
}

export default StyledTextField;
