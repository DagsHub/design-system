import { useState } from 'react';
import { Box } from '@mui/material';
import { DisplayFilter } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';

export interface DisplayFilterPartialProps {
  label: string;
  onChange: (show: boolean) => void;
}

export interface ControlledDisplayFiltersGroupProps {
  filters: DisplayFilterPartialProps[];
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
    <Box
    sx={{width:"100%", backgroundColor:"rgba(248, 250, 252, 1)"}}
    >
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
