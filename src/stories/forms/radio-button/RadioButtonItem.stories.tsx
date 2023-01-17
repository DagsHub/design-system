import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import { RadioButtonItem } from '../../../components/forms/radio-button-item';
import {Icon} from "../../../components";

export default {
  title: 'Forms/RadioButtonItem',
  component:RadioButtonItem
} as ComponentMeta<typeof RadioButtonItem>;

const Template: ComponentStory<typeof RadioButtonItem> = (args) => <RadioButtonItem {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label:"Admin access to organization",
    description:"Admins have full access to all repositories and have admin rights to the organization",
    icon: <Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>
};
