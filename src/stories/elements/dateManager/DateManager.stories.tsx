import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { DateManager, DateManagerProps } from '../../../components';

function deductDays(days: number) {
  const date = new Date();
  return date.setDate(date.getDay() - days);
}

const meta: Meta<DateManagerProps> = {
  title: 'Elements/Date Manager',
  component: DateManager
};

export default meta;

const Template: StoryFn<DateManagerProps> = (args) => <DateManager {...args} />;

export const DateManagerExample = Template.bind({});
DateManagerExample.args = {
  presets: [
    {
      name: '1 day ago',
      value: deductDays(1)
    },
    {
      name: '1 week ago',
      value: deductDays(7)
    },
    {
      name: '1 month ago',
      value: deductDays(30)
    }
  ]
};
