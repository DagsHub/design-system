import {Box} from '@mui/system';
import React from 'react';

export function MetadataTag({
                                index,
                                label,
                                value,
                                maxWidth,
                            }: {
    index: number,
    label?: string;
    value: any;
    maxWidth?: number | string;
}) {

    const getColorByIndex = (index: number) => {
        const regularColors = [
            {backgroundColor: '#F3E8FF', color: '#7E22CE'},
            {backgroundColor: '#EEF0FC', color: '#5467DE'},
            {backgroundColor: '#CFFAFE', color: '#0E7490'},
            {backgroundColor: '#DCFCE7', color: '#166534'},
            {backgroundColor: '#FEF9C3', color: '#A16207'},
            {backgroundColor: '#FFEDD5', color: '#C2410C'},
            {backgroundColor: '#FEF2F2', color: '#DC2626'},
        ];

        const hoverColors = [
            {backgroundColor: '#E9D5FF', color: '#7E22CE'},
            {backgroundColor: '#CCD3FF', color: '#5467DE'},
            {backgroundColor: '#A5F3FC', color: '#0E7490'},
            {backgroundColor: '#BBF7D0', color: '#166534'},
            {backgroundColor: '#FEF08A', color: '#A16207'},
            {backgroundColor: '#FED7AA', color: '#C2410C'},
            {backgroundColor: '#FEE2E2', color: '#DC2626'},
        ];

        const colorIndex = index % 7;
        return {
            regular: regularColors[colorIndex],
            hover: hoverColors[colorIndex],
        };
    };

    const generateCssForIndex = (index: number) => {
        const colors = getColorByIndex(index);
        return {
            backgroundColor: `${colors.regular.backgroundColor}!important`,
            color: `${colors.regular.color}!important`,
            '&:hover': {
                backgroundColor: `${colors.hover.backgroundColor}!important`,
                color: `${colors.hover.color}!important`,
            },
        };
    };

    return (
        <Box
            style={{
                lineHeight: '16px',
                paddingRight: '8px',
                paddingLeft: '8px',
                borderRadius: '32px',
                maxWidth: maxWidth ? maxWidth : '100%',
                height: '16px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                display: 'block',
                cursor: 'default',
                fontSize: '12px',
                fontFamily: 'Inter',
                fontWeight: 600,
                boxSizing:"border-box"
            }}
            sx={generateCssForIndex(index)}
            key={label}
        >
            {label && `${label} : `}{value}
        </Box>
    );
}
