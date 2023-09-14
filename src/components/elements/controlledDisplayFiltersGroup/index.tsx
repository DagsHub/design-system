import { useState } from 'react';
import { Box } from '@mui/material';
import { DisplayFilter, DisplayFilterProps } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';

export interface ControlledDisplayFiltersGroupProps {
  filters: DisplayFilterProps[];
  label?: string;
  toggleShowAll: (show: boolean) => void;
  onFilterChange: (name: string, show: boolean) => void;
}

export function ControlledDisplayFiltersGroup({
  filters,
  onFilterChange,
  toggleShowAll,
  label
}: ControlledDisplayFiltersGroupProps) {
  const [showAll, setShowAll] = useState<boolean>(false);

  const toggleAll = () => {
    setShowAll(!showAll);
    toggleShowAll(!showAll);
  };

  const updateFilter = (name: string, show: boolean) => {
    onFilterChange(name, show);
  };

  return (
    <Box>
      <Box>
        <LabeledSwitch label={label} onChange={toggleAll} />
      </Box>
      {filters.map((item) => {
        return (
          <DisplayFilter
            value={showAll}
            label={item.label}
            onChange={(show) => updateFilter(item.label, show)}
          />
        );
      })}
    </Box>
  );
}
