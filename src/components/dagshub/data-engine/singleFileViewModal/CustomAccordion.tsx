import React from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ThemeProvider,
  Typography
} from '@mui/material';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../../../../../theme';

export function CustomAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Accordion
        disableGutters
        defaultExpanded
        variant={'outlined'}
        sx={{
          border: 'none',
          '&:before': {
            display: 'none'
          },
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          '.MuiCollapse-wrapper': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflow: 'auto'
          }
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant={'large'}>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: '0px 16px 0px 16px',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>{children}</Box>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
}
