import {useEffect, useState} from 'react';
import { Box, Divider } from '@mui/material';
import { DisplayFilter } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';

export interface DisplayFilterPartialProps {
  label: string;
  onChange?: (show: boolean) => void;
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
  const [displayedFilters, setDisplayedFilters] = useState<Set<string>>(() => new Set<string>());

  const availableFiltersNames= new Set(filters.map((filter)=>filter.label));

  const toggleAll = () => {
    if(!showAll){
      setDisplayedFilters(availableFiltersNames);
    }
    else{
      setDisplayedFilters(new Set());
    }
    setShowAll(!showAll);
    toggleShowAll(!showAll);
  };

  function setsAreEqual(setA:Set<string>, setB:Set<string>) {
    if (setA.size !== setB.size) {
      return false;
    }
    for (const item of setA) {
      if (!setB.has(item)) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    // When metadataToDisplay changes, check if it's equal to availableFiltersNames
    if (setsAreEqual(displayedFilters, availableFiltersNames)) {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }, [displayedFilters, availableFiltersNames]);

  const updateFilter = (item: DisplayFilterPartialProps, show: boolean) => {
    if(item.onChange){
      item.onChange(show)
    }
    onFilterChange(item.label, show);
  };

  return (
    <Box sx={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}>
      <Box>
        <LabeledSwitch label={label} onChange={toggleAll} checked={showAll}/>
      </Box>
      {filters.map((item) => {
        return (
          <>
            <DisplayFilter
              value={displayedFilters.has(item.label)}
              label={item.label}
              onChange={(show) => {
                const updatedFilters = new Set(displayedFilters);
                if (updatedFilters.has(item.label)) {
                  updatedFilters.delete(item.label);
                } else {
                  updatedFilters.add(item.label);
                }
                setDisplayedFilters(updatedFilters);

                updateFilter(item, show)
              }}
            />
            <Divider sx={{ backgroundColor: '#F8FAFC' }} />
          </>
        );
      })}
    </Box>
  );
}
