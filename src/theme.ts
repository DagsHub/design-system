import { createTheme } from '@mui/material/styles';

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        small: true;
        smallBold: true;
        medium: true;
        mediumBold: true;
        large: true;
        thin:true;
    }
}

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
    typography: {
        fontFamily: 'Inter',
    },
    components: {
        MuiTypography:{
            styleOverrides: {
                root: {
                    fontFamily: 'Inter',
                    color: 'rgba(23, 45, 50, 1)',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                },
            },
            variants: [
                {
                    props: { variant: 'thin' },
                    style: {
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "20px",
                    },
                },
                {
                    props: { variant: 'small' },
                    style: {
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "16.8px",
                    },
                },
                {
                    props: { variant: 'smallBold' },
                    style: {
                        fontWeight: 600,
                        fontSize: "12px",
                        lineHeight: "16px",
                    },
                },
                {
                    props: { variant: 'medium' },
                    style: {
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '20px',
                    },
                },
                {
                    props: { variant: 'mediumBold' },
                    style: {
                        fontWeight: 600,
                        fontSize: '14px',
                        lineHeight: '20px',
                    },
                },
                {
                    props: { variant: 'large' },
                    style: {
                        fontWeight: 500,
                        fontSize: '16px',
                        lineHeight: '24px'
                    },
                },
            ],
        },
    }
});

export default lightTheme;
