import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {DataPointsTable, DataPointsTableProps} from "../../../../components/dagshub/data-engine/datapoints-table";

const meta: Meta<DataPointsTableProps> = {
  title: 'DagsHub/Data-Engine/Tables/DataPoints-Table',
  component: DataPointsTable
};

export default meta;

const Template: StoryFn<DataPointsTableProps> = (args) => <DataPointsTable {...args} />;

export const Primary = Template.bind({});
Primary.args = {

};
