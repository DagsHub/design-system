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
      label: 'metadata_key_1',
      onChange: (value) => console.log('changed', value)
    },
    {
      label: 'metadata_key_2',
      onChange: (value) => console.log('changed', value)
    },
    {
      label: 'metadata_key_3',
      onChange: (value) => console.log('changed', value)
    }
  ],
  toggleShowAll: (value) => console.log('toggle show all', value),
  toggleAllLabel: 'Show all'
};
