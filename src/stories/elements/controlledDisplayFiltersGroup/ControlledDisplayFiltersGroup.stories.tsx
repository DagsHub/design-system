import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import {
  ControlledDisplayFiltersGroup,
  ControlledDisplayFiltersGroupProps
} from '../../../components';

const meta: Meta<ControlledDisplayFiltersGroupProps> = {
  title: 'Elements/Display filter group',
  component: ControlledDisplayFiltersGroup
};

export default meta;

const Template: StoryFn<typeof ControlledDisplayFiltersGroup> = (args) => (
  <ControlledDisplayFiltersGroup {...args} />
);

export const ControlledDisplayFilterBasic: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
ControlledDisplayFilterBasic.args = {
  filters: [
    {
      label: 'test label1',
      onChange: (value) => console.log('changed', value)
    },
    {
      label: 'test label2',
      onChange: (value) => console.log('changed', value)
    },
    {
      label: 'test label3 ',
      onChange: (value) => console.log('changed', value)
    }
  ],
  onFilterChange: (value) => console.log('show all', value),
  toggleShowAll: (value) => console.log('toggle show all', value),
  label: 'Grouped display filters example'
};
