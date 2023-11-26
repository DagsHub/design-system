import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function CustomAccordion({ label, children }: { label: string; children: React.ReactNode }) {
  return (
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
        <Typography
          sx={{
            color: '#172D32',
            fontFamily: 'font-sans/text-base-reg',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '24px'
          }}
        >
          {label}
        </Typography>
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
  );
}
