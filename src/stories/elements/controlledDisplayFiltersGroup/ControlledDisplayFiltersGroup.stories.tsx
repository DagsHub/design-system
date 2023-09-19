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

const Template: StoryFn<typeof ControlledDisplayFiltersGroup> = (args: any) => (
  <ControlledDisplayFiltersGroup {...args} />
);

export const ControlledDisplayFilterBasic: StoryFn<typeof ControlledDisplayFiltersGroup> =
  Template.bind({});
ControlledDisplayFilterBasic.args = {
  filters: [
    {
      label: 'test label1',
      onChange: (value: string) => console.log('changed', value),
      value: false
    },
    {
      label: 'test label2',
      onChange: (value: string) => console.log('changed', value),
      value: false
    },
    {
      label: 'test label3 ',
      onChange: (value: string) => console.log('changed', value),
      value: false
    }
  ],
  onFilterChange: (value: string) => console.log('show all', value),
  toggleShowAll: (value: string) => console.log('toggle show all', value),
  label: 'Grouped display filters example',
};
