import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { TextArea, TextAreaProps } from '../../../components/forms/textarea';

const meta: Meta<TextAreaProps> = {
  title: 'Forms/TextArea',
  component: TextArea,
};

export default meta;

const Template: StoryFn<TextAreaProps> = (args) => <TextArea {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  value: 'I am a text input',
  label: 'I am a label',
  maxWidth: '480px',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  maxWidth: '480px',
};

export const WithError = Template.bind({});
WithError.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  maxWidth: '480px',
  errored: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  maxWidth: '480px',
  label: 'A disabled textarea',
  helperText: 'You can really not do stuff here',
  disabled: true,
};
