import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { DisplayFilter } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';

export interface ControlledDisplayFiltersGroupProps {
  filters: { value: string; alias: string }[];
  toggleAllLabel?: string;
  isToggleAll?: boolean;
  toggledFilters?: Set<string>;
  onChange: (activeFilters: { value: string; alias: string }[]) => void;
  search: ({
    alias,
    value
  }: {
    alias: string;
    value: string;
  }) => Promise<{ alias: string; value: string }[]>;
}

export function ControlledDisplayFiltersGroup({
  filters,
  toggleAllLabel,
  isToggleAll,
  search,
  onChange
}: ControlledDisplayFiltersGroupProps) {
  const [displayedFilters, setDisplayedFilters] = useState<
    Map<string, { value: string; alias: string }>
  >(new Map<string, { value: string; alias: string }>());
  const [showAll, setShowAll] = useState<boolean>(isToggleAll ?? false);
  const [availableFiltersNames, setAvailableFiltersNames] = useState<
    Map<string, { value: string; alias: string }>
  >(new Map(filters.map((filter) => [filter.value, filter])));

  useEffect(() => {
    setAvailableFiltersNames(new Map(filters.map((filter) => [filter.value, filter])));
  }, [filters]);

  useEffect(() => {
    setShowAll(isToggleAll ?? false);
  }, [isToggleAll]);

  const toggleShowAll = () => {
    const updatedFiltersToDisplay = showAll ? new Map() : availableFiltersNames;

    setDisplayedFilters(updatedFiltersToDisplay);

    onChange([...updatedFiltersToDisplay.values()]);
    setShowAll(!showAll);
  };

  useEffect(() => {
    // toggle showAll when manually changing all the group to "on"
    const isEqual = availableFiltersNames.size === displayedFilters.size;
    setShowAll(isEqual);
  }, [displayedFilters, availableFiltersNames]);

  const onFilterDisplayStateChanged = (filter: { alias: string; value: string }) => {
    const updatedDisplayedFilters = new Map(displayedFilters);
    if (updatedDisplayedFilters.has(filter.value)) {
      updatedDisplayedFilters.delete(filter.value);
    } else {
      updatedDisplayedFilters.set(filter.value, filter);
    }
    setDisplayedFilters(updatedDisplayedFilters);
    onChange([...updatedDisplayedFilters.values()]);
  };

  return (
    <Box sx={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}>
      <Box>
        <LabeledSwitch label={toggleAllLabel} onChange={toggleShowAll} checked={showAll} />
      </Box>
      {[...availableFiltersNames.values()].map((item) => {
        return (
          <>
            <DisplayFilter
              search={search}
              value={showAll || displayedFilters.has(item.value)}
              filter={item}
              onChange={onFilterDisplayStateChanged}
            />
            <Divider sx={{ backgroundColor: '#F8FAFC' }} />
          </>
        );
      })}
    </Box>
  );
}
