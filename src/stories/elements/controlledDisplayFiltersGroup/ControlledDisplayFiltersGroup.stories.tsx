import { Meta, StoryFn } from '@storybook/react';
import {
  ControlledDisplayFiltersGroup,
  ControlledDisplayFiltersGroupProps
} from '../../../components';
import { Box } from '@mui/system';
import React from 'react';

const meta: Meta<ControlledDisplayFiltersGroupProps> = {
  title: 'Elements/Display filter group',
  component: ControlledDisplayFiltersGroup
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

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomData = generateRandomData();
      const isEmpty = randomData.length === 0;

      if (isEmpty) {
        resolve([]);
      } else {
        resolve(randomData);
      }
    }, 1000); // Simulating an asynchronous operation
  });
}




const Template: StoryFn<typeof ControlledDisplayFiltersGroup> = (args) => (
  <Box width={'300px'}>
    <ControlledDisplayFiltersGroup {...args} />
  </Box>
);

const filters = [
  {
    label: 'metadata_key_1',
    onChange: (value: string) => console.log('changed', value),
    showCompare: true
  },
  {
    label: 'metadata_key_2',
    onChange: (value: string) => console.log('changed', value),
    showCompare: true
  },
  {
    label: 'metadata_key_3',
    onChange: (value: string) => console.log('changed', value),
    showCompare: true
  }
];

export const filterGroupNotControlled: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
filterGroupNotControlled.args = {
  filters: filters,
  activeFiltersChanged: (activeFilters) => {},
  onToggleShowAll: (value) => {},
  toggleAllLabel: 'Show all'
};

export const filterGroupControlledAndToggledAll: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
filterGroupControlledAndToggledAll.args = {
  filters: filters,
  activeFiltersChanged: (activeFilters) => {},
  onToggleShowAll: (value) => {},
  toggleAllLabel: 'Show all',
  isToggleAll: true //Make the component controlled from outside and toggle all filters
};

export const filterGroupControlledAndPartiallyToggled: StoryFn<
  typeof ControlledDisplayFiltersGroup
> = Template.bind({});
filterGroupControlledAndPartiallyToggled.args = {
  filters: filters,
  activeFiltersChanged: (activeFilters) => {},
  onToggleShowAll: (value) => {},
  toggleAllLabel: 'Show all',
  toggledFilters: new Set(['metadata_key_2']) //Make the component controlled from outside and toggle 1 filter out of three
};
