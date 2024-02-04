import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { DateManager, DateManagerProps } from '../../../components';
import dayjs from 'dayjs';
import { Box } from '@mui/system';

const meta: Meta<DateManagerProps> = {
  title: 'Elements/Date Manager',
  component: DateManager,
};

export default meta;

const Template: StoryFn<DateManagerProps> = (args) => (
  <Box sx={{ backgroundColor: 'white', width: 'fit-content' }}>
    <DateManager {...args} />
  </Box>
);

export const DateManagerExample = Template.bind({});
DateManagerExample.args = {
  presets: [
    {
      name: '1 day ago',
      value: dayjs().subtract(1, 'day'),
    },
    {
      name: '1 week ago',
      value: dayjs().subtract(7, 'day'),
    },
    {
      name: '1 month ago',
      value: dayjs().subtract(30, 'day'),
    },
  ],
};
