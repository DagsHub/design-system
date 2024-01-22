import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { DisplayFilter } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';
import _ from 'lodash';

type childFilter = {
  label: string;
  onChange: (value: string) => void;
};
export interface DisplayFilterPartialProps {
  label: string;
  onChange?: (name: string) => void;
  children?: childFilter[];
  showCompare?: boolean;
}

export interface ControlledDisplayFiltersGroupProps {
  filters: DisplayFilterPartialProps[];
  toggleAllLabel?: string;
  onToggleShowAll: (show: boolean) => void;
  isToggleAll?: boolean;
  toggledFilters?: Set<string>;
  activeFiltersChanged: (activeFilters: string[]) => void;
}

export function ControlledDisplayFiltersGroup({
  filters,
  onToggleShowAll,
  toggleAllLabel,
  isToggleAll,
  toggledFilters,
  activeFiltersChanged
}: ControlledDisplayFiltersGroupProps) {
  const [showAll, setShowAll] = useState<boolean>(isToggleAll ?? false);
  const [availableFiltersNames, setAvailableFiltersNames] = useState<Set<string>>(
    new Set(filters.map((filter) => filter.label))
  );
  const [displayedFilters, setDisplayedFilters] = useState<Set<string>>(getInitialState());

  useEffect(() => {
    setAvailableFiltersNames(new Set(filters.map((filter) => filter.label)));
  }, [filters]);

  function getInitialState() {
    if (isToggleAll) {
      return availableFiltersNames;
    } else if (toggledFilters) {
      return toggledFilters;
    }
    return new Set<string>();
  }

  useEffect(() => {
    setShowAll(isToggleAll ?? false);
  }, [isToggleAll]);

  useEffect(() => {
    setDisplayedFilters(getInitialState());
  }, [toggledFilters, availableFiltersNames]);

  const toggleAll = () => {
    if (!showAll) {
      setDisplayedFilters(availableFiltersNames);
    } else {
      setDisplayedFilters(new Set());
    }
    setShowAll(!showAll);
    onToggleShowAll(!showAll);
  };

  useEffect(() => {
    // When metadataToDisplay changes, check if it's equal to availableFiltersNames
    if (_.isEqual(displayedFilters, availableFiltersNames)) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [displayedFilters, availableFiltersNames]);

  const onFilterChange = (label: string) => {
    const updatedFilters = new Set(displayedFilters);
    if (updatedFilters.has(label)) {
      updatedFilters.delete(label);
    } else {
      updatedFilters.add(label);
    }
    setDisplayedFilters(updatedFilters);
    // if (item.onChange) item.onChange(item.label);
  };

  const addFilter = (value: string) => {
    setAvailableFiltersNames(new Set([...availableFiltersNames, value]));
  };

  const removeFilter = (value: string) => {
    const updatedFilterList = new Set(availableFiltersNames);
    updatedFilterList.delete(value);
    setAvailableFiltersNames(updatedFilterList);
  };

  useEffect(() => {
    activeFiltersChanged([...displayedFilters]);
  }, [displayedFilters]);

  return (
    <Box sx={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}>
      <Box>
        <LabeledSwitch label={toggleAllLabel} onChange={toggleAll} checked={showAll} />
      </Box>
      {filters.map((item) => {
        return (
          <>
            <DisplayFilter
              addFilter={addFilter}
              removeFilter={removeFilter}
              showCompare={item?.showCompare}
              value={showAll || displayedFilters.has(item.label)}
              label={item.label}
              onChange={onFilterChange}
            />
          </>
        );
      })}
    </Box>
  );
}
