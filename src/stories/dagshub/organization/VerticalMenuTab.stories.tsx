import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import VerticalMenuTab, {VerticalMenuTabProps} from '../../../components/dagshub/organization/vertical-menu-tab';

const meta: Meta<typeof VerticalMenuTab> = {
    title: 'DagsHub/Org/VerticalMenuTab',
    component: VerticalMenuTab
};

export default meta;

const Template: ComponentStory<typeof VerticalMenuTab> = (args) => <VerticalMenuTab {...args} />;
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
