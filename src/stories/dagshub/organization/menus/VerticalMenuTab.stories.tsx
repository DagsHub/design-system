import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {VerticalMenuTab, VerticalMenuTabProps} from '../../../../components/dagshub/organization/menus/vertical-menu-tab';

const meta: Meta<VerticalMenuTabProps> = {
    title: 'DagsHub/Org/Menus/VerticalMenuTab',
    component: VerticalMenuTab
};

export default meta;

const Template: StoryFn<VerticalMenuTabProps> = args => <VerticalMenuTab {...args} />;
export const Primary1 = Template.bind({});
Primary1.args = {
    text:"General"
};

export const Primary2 = Template.bind({});
Primary2.args = {
    text:"Plan"
};

export const Primary3 = Template.bind({});
Primary3.args = {
    text:"Webhooks"
};

export const Primary4 = Template.bind({});
Primary4.args = {
    text:"Delete organization"
};
