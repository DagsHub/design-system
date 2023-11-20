import {Icon} from "../../../icons";
import {Box} from "@mui/material";
import React from "react";

export function ItemFallback({
                                 height,
                                 width,
                                 onClick,
                                 disableHoverMode
                             }: {
    height: number|string;
    width: number|string;
    onClick?: () => void;
    disableHoverMode?: boolean;
}) {
    return (
        <Box
            role={'button'}
            onClick={onClick}
            height={height}
            width={width}
            p={3}
            sx={{
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                border: '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                '&:hover': {
                    boxShadow: !disableHoverMode? '0px 0px 0px 3px rgba(196, 181, 253, 0.50)':undefined,
                },
            }}
        >
            <Icon icon={'outline-file'} width={24} height={24} fill={'#94A3B8'} />
        </Box>
    );
}
