import { Box, Divider, ThemeProvider } from '@mui/material';
import { DisplayFilter } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';
import theme from '../../../theme';

export type FilterType = {
  alias: string;
  value?: number; // unix
  name: string;
};

export interface ControlledDisplayFiltersGroupProps {
  filters: FilterType[];
  toggleAllLabel?: string;
  showAll: boolean;
  toggleShowAll: () => void;
  displayedFilters?: Map<string, FilterType>;
  onChange: (activeFilters: FilterType) => void;
  addNewFilter: ({ alias, value, name }: { alias: string; value: number; name: string }) => void;
  showCompareButton?: boolean;
}

export function ControlledDisplayFiltersGroup({
  filters,
  toggleAllLabel,
  showAll,
  toggleShowAll,
  displayedFilters,
  addNewFilter,
  onChange,
  showCompareButton,
}: ControlledDisplayFiltersGroupProps) {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}>
        <Box>
          <LabeledSwitch label={toggleAllLabel} onChange={toggleShowAll} checked={showAll} />
        </Box>
        {filters.map((item) => {
          return (
            <>
              <DisplayFilter
                showCompareButton={showCompareButton}
                addNewFilter={addNewFilter}
                value={showAll || !!displayedFilters?.has(item.alias)}
                filter={item}
                onChange={onChange}
              />
              <Divider sx={{ backgroundColor: '#F8FAFC' }} />
            </>
          );
        })}
      </Box>
    </ThemeProvider>
  );
}
