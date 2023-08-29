import { DisplayFilter, DisplayFilterProps } from '../../../components';
import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

const meta: Meta<DisplayFilterProps> = {
  title: 'Elements/Display filter',
  component: DisplayFilter
};

export default meta;

const Template: StoryFn<typeof DisplayFilter> = (args) => <DisplayFilter {...args} />;

export const DisplayFilterBasic: StoryFn<typeof DisplayFilter> = Template.bind({});
DisplayFilterBasic.args = {
  label: 'test label',
  onChange: () => console.log('changed')
};
