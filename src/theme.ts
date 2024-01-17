import { createTheme } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    small: true;
    smallBold: true;
    medium: true;
    mediumBold: true;
    large: true;
    overflow: true;
    thin: true;
  }
}

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  typography: {
    fontFamily: 'Inter'
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          display: 'block',
          fontFamily: 'Inter',
          fontWeight: 500,
          fontSize: '12px',
          lineHeight: '16.8px',
          color: 'rgba(248, 250, 252, 1)',
          backgroundColor: 'rgba(25, 46, 54, 1)',
          borderRadius: '8px',
          padding: '4px',
          [`.${tooltipClasses.popper}[data-popper-placement*="top"] &`]: {
            margin: '0'
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="bottom"] &`]: {
            margin: '0',
            marginTop: '4px'
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="right"] &`]: {
            margin: '8px'
          },
          [`.${tooltipClasses.popper}[data-popper-placement*="left"] &`]: {
            margin: '8px'
          }
        },
        arrow: {
          color: 'rgba(25, 46, 54, 1)'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter'
        }
      },
      variants: [
        {
          props: { variant: 'thin' },
          style: {
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px'
          }
        },
        {
          props: { variant: 'overflow' },
          style: {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }
        },
        {
          props: { variant: 'small' },
          style: {
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '16.8px'
          }
        },
        {
          props: { variant: 'smallBold' },
          style: {
            fontWeight: 600,
            fontSize: '12px',
            lineHeight: '16px'
          }
        },
        {
          props: { variant: 'medium' },
          style: {
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px'
          }
        },
        {
          props: { variant: 'mediumBold' },
          style: {
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px'
          }
        },
        {
          props: { variant: 'large' },
          style: {
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px'
          }
        }
      ]
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '2px solid #cbd5e1',
          fontSize: '14px',
          fontWeight: 500,
          padding: '0',
          height: '44px',
          borderRadius: '12px',
          backgroundColor: '#f8fafc',
          outline: '0',
          '& fieldset': { border: 'none' },
          '&:focus-within': {
            boxShadow: '0px 0px 0px 3px rgba(196, 181, 253, 0.5)'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 500,
          borderRadius: '12px',
          border: '2px solid #cbd5e1',
          '& fieldset': { border: 'none' },
          '&:focus': {
            boxShadow: '0px 0px 0px 3px rgba(196, 181, 253, 0.5)'
          }
        }
      }
    }
  }
});

export default lightTheme;
