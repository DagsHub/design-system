import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Checkbox } from '../../../components/forms/checkbox';

export default {
  title: 'Forms/Checkbox',
  component: Checkbox
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Presentation = () => {
  return (
    <div>
      <Checkbox checked label="Checked!" /> <br />
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
