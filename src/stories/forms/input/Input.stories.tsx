import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Input, InputProps } from '../../../components/forms/input';

const meta: Meta<InputProps> = {
  title: 'Forms/Input',
  component: Input,
};

export default meta;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const WithLabel = Template.bind({});
WithLabel.args = {
  value: 'I am a text input',
  label: 'I am a label',
  rootMaxWidth: '260px',
};

export const WithHelperText = Template.bind({});
WithHelperText.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  rootMaxWidth: '260px',
};

export const WithError = Template.bind({});
WithError.args = {
  helperText: 'This is a handy helper text.',
  placeholder: 'I am a placholder',
  rootMaxWidth: '260px',
  errored: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  rootMaxWidth: '260px',
  disabled: true,
};

export const ControlledInput = () => {
  const [value, setValue] = React.useState<string>('change me');
  return (
    <Input
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
};
