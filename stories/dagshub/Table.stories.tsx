import type {Meta, StoryFn} from '@storybook/react';
import { userInfo } from 'os';
import React from 'react';
import UserInfo from '../../components/organization-components/UserInfo';
import Table from '../../components/organization-components/Table';

const meta: Meta<typeof Table> = {
    title: 'DagsHub/Org/Table',
    component: Table,
    tags: ['docsPage'],
};

export default meta;

const Template: StoryFn<typeof Table> = (args) => <Table {...args} />;


export const Primary = Template.bind({});
Primary.args = {
    items: [
    {
        id: 1,
        name: {},
        count: 3
    },
    {
        id: 2,
        name: "Paper",
        count: 4
    },
    {
        id: 3,
        name: "Scissors",
        count: 4
    }],
    headers: {
        id: "Id",
        name: "Name",
        count: "Count"
    }
}