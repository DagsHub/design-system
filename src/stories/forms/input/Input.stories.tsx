import React from 'react';
import { Meta, StoryFn  } from '@storybook/react';
import { Input, InputProps } from '../../../components/forms/input';

const meta: Meta<InputProps> = {
  title: 'Forms/Input',
  component: Input
};

export default meta;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  value: 'I am a text input',
  label: 'I am a label',
  maxWidth: '260px'
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  maxWidth: '260px'
};

export const WithError = Template.bind({});
WithError.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  maxWidth: '260px',
  errored: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  maxWidth: '260px',
  disabled: true
};
