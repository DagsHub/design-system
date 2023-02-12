import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Dropdown, DropdownProps } from '../../../components/elements/dropdown';

const meta: Meta<DropdownProps> = {
  title: 'Elements/Dropdown',
  component: Dropdown,
};

export default meta;

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />;

export const Collapsed = Template.bind({});
Collapsed.args = {
  width: 350,
  label: 'Country',
  options: [
    { id: 1, label: 'Israel', description: 'State of Israel - Middle East - Asia', checked: true },
    { id: 2, label: 'Britain', description: 'Great British Empire - Europe' },
    { id: 3, label: 'Colombia', description: 'La Tierra de Oro - South America' },
  ],
};

export const Opened = Template.bind({});
Opened.args = {
  width: 350,
  label: 'Country',
  isCollapsed: false,
  options: [
    { id: 1, label: 'Israel', description: 'State of Israel - Middle East - Asia' },
    { id: 2, label: 'Britain', description: 'Great British Empire - Europe', checked: true },
    { id: 3, label: 'Colombia', description: 'La Tierra de Oro - South America' },
  ],
};

