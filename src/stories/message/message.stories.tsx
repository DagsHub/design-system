import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Message } from '../../components/elements/message';

const meta: Meta<typeof Message> = {
  title: 'Elements/Message',
  component: Message,
};

export default meta;

const Template: StoryFn<typeof Message> = (args) => <Message {...args} />;

export const ErrorMessage: StoryFn<typeof Message> = Template.bind({});
ErrorMessage.args = {
  text: 'Error, please try again.',
  kind: 'error',
  support: true,
};

export const WarningMessage: StoryFn<typeof Message> = Template.bind({});
WarningMessage.args = {
  text: 'This is a warning message.',
  kind: 'warning',
  support: true,
};

export const InfoMessage: StoryFn<typeof Message> = Template.bind({});
InfoMessage.args = {
  text: 'This is some useful information about the page you are on.',
  kind: 'info',
  support: false,
};

export const SuccessMessage: StoryFn<typeof Message> = Template.bind({});
SuccessMessage.args = {
  text: 'Success! You did it!',
  kind: 'success',
  support: false,
};
