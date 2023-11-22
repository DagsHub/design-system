import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import {QueryBuilder} from "../../../../components/dagshub/data-engine/queryBuilder/QueryBuilder";

const meta: Meta<typeof QueryBuilder> = {
  title: 'DagsHub/Data-Engine/QueryBuilder/Condition',
  component: QueryBuilder
};

export default meta;

const Template: StoryFn<typeof QueryBuilder> = (args) => <QueryBuilder {...args} />;

export const compoundQueryBuilder: StoryFn<typeof QueryBuilder> = Template.bind({});
compoundQueryBuilder.args = {
};

export const simpleQueryBuilder: StoryFn<typeof QueryBuilder> = Template.bind({});
simpleQueryBuilder.args = {
  isSimpleMode: true
};
