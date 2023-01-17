import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import { RadioButtonItem } from '../../../components/forms/radio-button-item';
import RadioButtonList from "../../../components/dagshub/organization/radio-button-list";
import {Icon} from "../../../components";

export default {
  title: 'DagsHub/Org/RadioButtonList',
  component:RadioButtonList
} as ComponentMeta<typeof RadioButtonList>;

const Template: ComponentStory<typeof RadioButtonList> = (args) => <RadioButtonList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    title:"Team permissions",
    items:[
        <RadioButtonItem label="Read access"
            description="This team will be able to view and clone its repositories"
            icon= {<Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>}/>,
        <RadioButtonItem label="Write access"
                         description="This team will be able to read its repositories, as well as push to them."
                         icon= {<Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>}/>,
        <RadioButtonItem label="Admin access"
                         description="This team will be able to push/pull to its repositories, as well as add other collaborators to them."
                         icon= {<Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>}/>,
    ]
};
