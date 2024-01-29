import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { DisplayFilter } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';

export type FilterType = { alias: string; value: string };

export interface ControlledDisplayFiltersGroupProps {
  filters: FilterType[];
  toggleAllLabel?: string;
  isToggleAll?: boolean;
  toggledFilters?: Set<string>;
  onChange: (activeFilters: FilterType[]) => void;
  search: ({ alias, value }: FilterType) => Promise<FilterType[]>;
  showCompareButton?: boolean
}

export function ControlledDisplayFiltersGroup({
  filters,
  toggleAllLabel,
  isToggleAll,
  search,
  onChange,
                                                showCompareButton,
}: ControlledDisplayFiltersGroupProps) {
  const [displayedFilters, setDisplayedFilters] = useState<Map<string, FilterType>>(
    isToggleAll
      ? new Map<string, FilterType>(
          filters.map((filter) => {
            return [filter.value, filter];
          })
        )
      : new Map<string, FilterType>()
  );
  const [showAll, setShowAll] = useState<boolean>(isToggleAll ?? false);
  const [availableFiltersNames, setAvailableFiltersNames] = useState<Map<string, FilterType>>(
    new Map(filters.map((filter) => [filter.value, filter]))
  );

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

  const onFilterDisplayStateChanged = (filter: FilterType) => {
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
                showCompareButton={showCompareButton}
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
