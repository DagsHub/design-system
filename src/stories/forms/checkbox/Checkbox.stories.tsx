import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Checkbox, CheckboxProps } from '../../../components/forms/checkbox';

const meta: Meta<CheckboxProps> = {
  title: 'Forms/Checkbox',
  component: Checkbox
};

export default meta;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Presentation = () => {
  return (
    <div>
        <Checkbox checked label="Checked!" /> <br />
        <Checkbox indeterminate label="Indeterminate!" /> <br />
        <Checkbox label="Unchecked!" /> <br />
        <Checkbox disabled label="Disabled!" /> <br />
    </div>
  );
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: 'Checked!'
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
  label: 'Unchecked!'
};
