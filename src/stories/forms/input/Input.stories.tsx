import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from '../../../components/forms/input';

export default {
  title: 'Forms/Input',
  component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

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
