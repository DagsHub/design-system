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
  queryInput:{},
  forceCompoundMode:true
};

export const simpleQueryBuilder: StoryFn<typeof QueryBuilder> = Template.bind({});
simpleQueryBuilder.args = {
  queryInput:{},
};

export const queryBuilderWithQuery: StoryFn<typeof QueryBuilder> = Template.bind({});
queryBuilderWithQuery.args = {
  queryInput:{"query":{"filter":{"key":"size","value":"1450000","valueType":"INTEGER","comparator":"LESS_EQUAL_THAN"}}},
};
