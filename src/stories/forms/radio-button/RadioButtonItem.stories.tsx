import React from 'react';
import {Meta, StoryFn } from '@storybook/react';
import {RadioButtonItem, RadioButtonItemProps} from '../../../components/forms/radio-button/radio-button-item';
import {Icon} from "../../../components";

const meta: Meta<RadioButtonItemProps> = {
  title: 'Forms/RadioButtonItem',
  component:RadioButtonItem
};

export default meta;

const Template: StoryFn<RadioButtonItemProps> = (args) => <RadioButtonItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label:"Admin access to organization",
    description:"Admins have full access to all repositories and have admin rights to the organization",
    icon: <Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>
};
