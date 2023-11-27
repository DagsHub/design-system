import { useEffect, useState } from 'react';
import { Box, Divider } from '@mui/material';
import { DisplayFilter } from '../displayFilter';
import React from 'react';
import { LabeledSwitch } from '../../forms';
import _ from 'lodash';

export interface DisplayFilterPartialProps {
  label: string;
  onChange?: (name: string) => void;
}

export interface ControlledDisplayFiltersGroupProps {
  filters: DisplayFilterPartialProps[];
  toggleAllLabel?: string;
  onToggleShowAll: (show: boolean) => void;
  isToggleAll?: boolean;
  toggledFilters?: Set<string>;
}

export function ControlledDisplayFiltersGroup({
  filters,
  onToggleShowAll,
  toggleAllLabel,
  isToggleAll,
  toggledFilters
}: ControlledDisplayFiltersGroupProps) {
  const [showAll, setShowAll] = useState<boolean>(isToggleAll ?? false);
  const availableFiltersNames = new Set(filters.map((filter) => filter.label));

  function getInitialState() {
    if (isToggleAll) {
      return availableFiltersNames;
    } else if (toggledFilters) {
      return toggledFilters;
    }
    return new Set<string>();
  }

  const [displayedFilters, setDisplayedFilters] = useState<Set<string>>(getInitialState());

  useEffect(()=>{
    setShowAll(isToggleAll ?? false)
  },[isToggleAll])

    useEffect(()=>{
        setDisplayedFilters(getInitialState())
    },[toggledFilters, availableFiltersNames])

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

  return (
    <Box sx={{ backgroundColor: 'rgba(248, 250, 252, 1)' }}>
      <Box>
        <LabeledSwitch label={toggleAllLabel} onChange={toggleAll} checked={showAll} />
      </Box>
      {filters.map((item) => {
        return (
          <>
            <DisplayFilter
              value={showAll || displayedFilters.has(item.label)}
              label={item.label}
              onChange={() => {
                const updatedFilters = new Set(displayedFilters);
                if (updatedFilters.has(item.label)) {
                  updatedFilters.delete(item.label);
                } else {
                  updatedFilters.add(item.label);
                }
                setDisplayedFilters(updatedFilters);
                if (item.onChange) item.onChange(item.label);
              }}
            />
            <Divider sx={{ backgroundColor: '#F8FAFC' }} />
          </>
        );
      })}
    </Box>
  );
}
