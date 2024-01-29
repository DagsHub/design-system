import { Meta, StoryFn } from '@storybook/react';
import React, { useState } from 'react';
import {
  ControlledDisplayFiltersGroup,
  ControlledDisplayFiltersGroupProps
} from '../../../components';
import { Box } from '@mui/system';

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

let filters = [
  { alias: 'metadata_key_1', value: 'metadata_key_1' },
  { alias: 'metadata_key_2', value: 'metadata_key_2' },
  { alias: 'metadata_key_3', value: 'metadata_key_3' }
];

const Template: StoryFn<typeof ControlledDisplayFiltersGroup> = (args) => {
  const [availableFilters, setAvailableFilters] = useState(filters);
  const [activeFilters, setActiveFilters] = useState<{ value: string; alias: string }[]>();

  function fetchData({
    value,
    alias
  }: {
    value: string;
    alias: string;
  }): Promise<{ value: string; alias: string }[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const randomData = generateRandomData();
        const hasError = randomData.length === 0;

        if (hasError) {
          reject('some error');
        } else {
          setAvailableFilters([...availableFilters, { alias, value }]);
          resolve(availableFilters);
        }
      }, 1000); // Simulating an asynchronous operation
    });
  }

  const onChange = (activeFilters: { value: string; alias: string }[]) => {
    console.log('activeFilters', activeFilters);
    setActiveFilters(activeFilters);
  };

  return (
    <Box width={'228px'}>
      <ControlledDisplayFiltersGroup
        {...args}
        onChange={onChange}
        filters={availableFilters}
        search={fetchData}
      />

      <Box sx={{ color: 'red' }}>
        {activeFilters?.length &&
          activeFilters.map(
            (item: {
              alias:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
              value:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            }) => {
              return (
                <Box>
                  item {item.alias} - {item.value}
                </Box>
              );
            }
          )}
      </Box>
    </Box>
  );
};

export const filterGroupNotControlled: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
filterGroupNotControlled.args = {
  toggleAllLabel: 'Show all'
};

export const filterGroupControlledAndToggledAll: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
filterGroupControlledAndToggledAll.args = {
  toggleAllLabel: 'Show all',
  onChange: (activeFilters: { value: string; alias: string }[]) =>
    console.log('changed', activeFilters),
  isToggleAll: true //Make the component controlled from outside and toggle all filters
};

export const filterGroupControlledAndPartiallyToggled: StoryFn<
  typeof ControlledDisplayFiltersGroup
> = Template.bind({});
filterGroupControlledAndPartiallyToggled.args = {
  onChange: (activeFilters: { value: string; alias: string }[]) =>
    console.log('changed', activeFilters),
  toggleAllLabel: 'Show all',
  toggledFilters: new Set(['metadata_key_2']) //Make the component controlled from outside and toggle 1 filter out of three
};
