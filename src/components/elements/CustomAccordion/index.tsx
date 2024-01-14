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
import theme from '../../../theme';

export function CustomAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Accordion
        disableGutters
        defaultExpanded
        variant={'outlined'}
        sx={{ border: 'none' }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant={'large'}>{label}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ padding: '0px 16px 0px 16px' }}
        >
          <Box sx={{ display: 'flex', gap: '8px', flexDirection: 'column', height: '100%' }}>
            {children}
          </Box>
        </AccordionDetails>
      </Accordion>
    </ThemeProvider>
  );
}
