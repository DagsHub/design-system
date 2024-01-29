import { DisplayFilter, DisplayFilterProps } from '../../../components';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Box } from '@mui/system';

const meta: Meta<DisplayFilterProps> = {
  title: 'Elements/Display filter',
  component: DisplayFilter,
};

export default meta;

const Template: StoryFn<typeof DisplayFilter> = (args) => (
  <Box maxWidth={'224px'}>
    <DisplayFilter {...args} />
  </Box>
);

export const DisplayFilterBasic: StoryFn<typeof DisplayFilter> = Template.bind({});
DisplayFilterBasic.args = {
  label: 'test label',
  onChange: () => console.log('changed'),
};
