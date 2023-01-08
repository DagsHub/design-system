import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextArea } from '../../../components/forms/textarea';

export default {
  title: 'Forms/TextArea',
  component: TextArea
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => <TextArea {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  value: 'I am a text input',
  label: 'I am a label',
  maxWidth: '480px'
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  maxWidth: '480px'
};

export const WithError = Template.bind({});
WithError.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  maxWidth: '480px',
  errored: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  maxWidth: '480px',
  label: 'A disabled textarea',
  helperText: 'You can really not do stuff here',
  disabled: true
};
