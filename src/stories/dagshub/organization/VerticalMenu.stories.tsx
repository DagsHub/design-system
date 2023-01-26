import React from 'react';
import type { Meta, ComponentStory } from '@storybook/react';
import VerticalMenu, {VerticalMenuProps} from '../../../components/dagshub/organization/vertical-menu';

const meta: Meta<typeof VerticalMenu> = {
    title: 'DagsHub/Org/VerticalMenu',
    component: VerticalMenu
};

export default meta;

const Template: ComponentStory<typeof VerticalMenu> = (args) => <VerticalMenu {...args} />;
export const Primary1 = Template.bind({});
Primary1.args = {
    title:"DagsHub settings",
    tabs:[{text:"General"},{text:"Plan"},{text:"Webhooks"},{text:"Delete organization"}]
};
export const Primary2 = Template.bind({});
Primary2.args = {
    tabs:[{text:"General"},{text:"Plan"},{text:"Webhooks"},{text:"Delete organization"}]
};

