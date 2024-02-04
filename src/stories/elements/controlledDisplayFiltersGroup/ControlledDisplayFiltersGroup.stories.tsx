import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import {
  ControlledDisplayFiltersGroup,
  ControlledDisplayFiltersGroupProps,
  FilterType,
} from '../../../components';
import { Box } from '@mui/system';

const meta: Meta<ControlledDisplayFiltersGroupProps> = {
  title: 'Elements/Display filter group',
  component: ControlledDisplayFiltersGroup,
};

export default meta;
function getRandomBoolean() {
  return Math.random() < 0.5;
}

function generateRandomData() {
  const data = [];
  const names = ['John', 'Alice', 'Bob', 'Eve', 'Charlie'];

  if (getRandomBoolean()) {
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * names.length);
      const name = names[randomIndex];
      const value = Math.floor(Math.random() * 100);
      data.push({ name, value });
    }
  }

  return data;
}

let filters = [
  { alias: 'metadata_key_1', name: 'metadata_key_1' },
  { alias: 'metadata_key_2', name: 'metadata_key_2' },
  { alias: 'metadata_key_3', name: 'metadata_key_3' },
];

const defaultFiltersState = new Map();
defaultFiltersState.set('metadata_key_1', {
  alias: 'metadata_key_1',
  name: 'metadata_key_1',
  value: 1,
});

const Template: StoryFn<typeof ControlledDisplayFiltersGroup> = (args) => {
  const [availableFilters, setAvailableFilters] =
    useState<{ name: string; value?: number; alias: string }[]>(filters);
  const [showAll, setShowAll] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Map<string, FilterType>>(defaultFiltersState);

  function addNewFilter(newFilter: { value: number; alias: string; name: string }): void {
    setAvailableFilters([...availableFilters, newFilter]);
  }

  const onChange = (filter: FilterType) => {
    const newActiveFilters = new Map(activeFilters);
    if (newActiveFilters.has(filter.alias)) {
      newActiveFilters.delete(filter.alias);
    } else {
      newActiveFilters.set(filter.alias, filter);
    }
    setShowAll(newActiveFilters.size === availableFilters.length);
    setActiveFilters(newActiveFilters);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
    setActiveFilters(
      !showAll
        ? new Map(
            availableFilters.map((obj) => {
              return [obj.alias, obj];
            })
          )
        : new Map()
    );
  };

  return (
    <Box width={'228px'}>
      <ControlledDisplayFiltersGroup
        {...args}
        showAll={showAll}
        toggleShowAll={toggleShowAll}
        showCompareButton
        displayedFilters={activeFilters}
        onChange={onChange}
        filters={availableFilters}
        addNewFilter={addNewFilter}
      />
    </Box>
  );
};

export const filterGroupNotControlled: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
filterGroupNotControlled.args = {
  toggleAllLabel: 'Show all',
};

export const filterGroupControlledAndToggledAll: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
filterGroupControlledAndToggledAll.args = {
  toggleAllLabel: 'Show all',
  onChange: (activeFilters: FilterType) => console.log('changed', activeFilters),
  showAll: true, //Make the component controlled from outside and toggle all filters
};

export const filterGroupControlledAndPartiallyToggled: StoryFn<
  typeof ControlledDisplayFiltersGroup
> = Template.bind({});
filterGroupControlledAndPartiallyToggled.args = {
  onChange: (activeFilters: FilterType) => console.log('changed', activeFilters),
  toggleAllLabel: 'Show all',
};
