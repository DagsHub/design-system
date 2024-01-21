import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import QueryBuilder from '../../../../components/dagshub/data-engine/queryBuilder/QueryBuilder';
import { MetadataType } from '../../../../components';

const meta: Meta<typeof QueryBuilder> = {
  title: 'DagsHub/Data-Engine/QueryBuilder/Condition',
  component: QueryBuilder
};

export default meta;

const Template: StoryFn<typeof QueryBuilder> = (args) => <QueryBuilder {...args} />;

const validateValueByType = (valueType: MetadataType, value: string): boolean => {
  try {
    switch (valueType) {
      case 'BOOLEAN':
        return value === 'true' || value === 'false';
      case 'INTEGER':
        const integerRegex = /^([-+]?(0|[1-9][0-9]*))$/;
        return !isNaN(parseInt(value)) && integerRegex.test(value);
      case 'FLOAT':
        const floatRegex = /^([-+]?(0\.[0-9]+|0|[1-9][0-9]*(\.[0-9]+)?))$/;
        return !isNaN(parseFloat(value)) && floatRegex.test(value);
      case 'STRING':
        return true;
      case 'BLOB':
        return true;
      default:
        return false; //This mechanism is not perfect, cause for numbers with a lot of digits, there is rounding, and then it's not equal to the string
    }
  } catch (e) {
    return false;
  }
};

export const compoundQueryBuilderDatasource: StoryFn<typeof QueryBuilder> = Template.bind({});
compoundQueryBuilderDatasource.args = {
  queryInput: {},
  forceCompoundMode: true,
  metadataFields: [
    { name: 'size', valueType: 'INTEGER', tags: [], multiple: false },
    { name: 'author', valueType: 'STRING', tags: [], multiple: false },
    { name: 'isCat', valueType: 'BOOLEAN', tags: [], multiple: false },
    { name: 'weight', valueType: 'FLOAT', tags: [], multiple: false },
    { name: 'image', valueType: 'BLOB', tags: [], multiple: false }
  ],
  validateValueByType: validateValueByType,
  onChange: () => {},
  showConditionSummary: true
};

export const compoundQueryBuilderDataset: StoryFn<typeof QueryBuilder> = Template.bind({});
compoundQueryBuilderDataset.args = {
  queryInput: {},
  forceCompoundMode: true,
  metadataFields: [
    { name: 'size', valueType: 'INTEGER', tags: [], multiple: false },
    { name: 'author', valueType: 'STRING', tags: [], multiple: false },
    { name: 'isCat', valueType: 'BOOLEAN', tags: [], multiple: false },
    { name: 'weight', valueType: 'FLOAT', tags: [], multiple: false },
    { name: 'image', valueType: 'BLOB', tags: [], multiple: false }
  ],
  validateValueByType: validateValueByType,
  onChange: () => {},
  showConditionSummary: true
};

export const simpleQueryBuilder: StoryFn<typeof QueryBuilder> = Template.bind({});
simpleQueryBuilder.args = {
  queryInput: {
    query: {
      filter: {
        key: 'weight',
        comparator: 'EQUAL',
        valueType: 'FLOAT',
        value: 'inf'
      }
    }
  },
  metadataFields: [
    { name: 'size', valueType: 'INTEGER', tags: [], multiple: false },
    { name: 'author', valueType: 'STRING', tags: [], multiple: false },
    { name: 'isCat', valueType: 'BOOLEAN', tags: [], multiple: false },
    { name: 'weight', valueType: 'FLOAT', tags: [], multiple: false },
    { name: 'image', valueType: 'BLOB', tags: [], multiple: false }
  ],
  validateValueByType: validateValueByType,
  onChange: () => {},
  showConditionSummary: true
};

export const emptyQuery: StoryFn<typeof QueryBuilder> = Template.bind({});
emptyQuery.args = {
  queryInput: {},
  metadataFields: [
    { name: 'size', valueType: 'INTEGER', tags: [], multiple: false },
    { name: 'author', valueType: 'STRING', tags: [], multiple: false },
    { name: 'isCat', valueType: 'BOOLEAN', tags: [], multiple: false },
    { name: 'weight', valueType: 'FLOAT', tags: [], multiple: false },
    { name: 'image', valueType: 'BLOB', tags: [], multiple: false }
  ],
  validateValueByType: validateValueByType,
  onChange: () => {},
  showConditionSummary: true
};

export const emptyQueryWithinAndBlock: StoryFn<typeof QueryBuilder> = Template.bind({});
emptyQueryWithinAndBlock.args = {
  queryInput: { query: { and: [] } },
  metadataFields: [
    { name: 'size', valueType: 'INTEGER', tags: [], multiple: false },
    { name: 'author', valueType: 'STRING', tags: [], multiple: false },
    { name: 'isCat', valueType: 'BOOLEAN', tags: [], multiple: false },
    { name: 'weight', valueType: 'FLOAT', tags: [], multiple: false },
    { name: 'image', valueType: 'BLOB', tags: [], multiple: false }
  ],
  validateValueByType: validateValueByType,
  onChange: () => {},
  showConditionSummary: true
};

export const queryBuilderWithQuery: StoryFn<typeof QueryBuilder> = Template.bind({});
queryBuilderWithQuery.args = {
  queryInput: {
    query: {
      and: [
        {
          filter: {
            key: 'weight',
            comparator: 'EQUAL',
            valueType: 'FLOAT',
            value: 'inf'
          }
        },
        {
          filter: {
            key: 'weight',
            comparator: 'EQUAL',
            valueType: 'FLOAT',
            value: '-inf'
          }
        },
        {
          filter: {
            key: 'weight',
            comparator: 'EQUAL',
            valueType: 'FLOAT',
            value: 'nan'
          }
        },
        {
          filter: {
            key: 'image',
            comparator: 'IS_NULL',
            valueType: 'FLOAT',
            value: ''
          }
        },
        {
          filter: {
            key: 'size',
            value: '1450000',
            valueType: 'INTEGER',
            comparator: 'LESS_EQUAL_THAN'
          }
        },
        {
          and: [
            {
              filter: {
                key: 'isCat',
                comparator: 'EQUAL',
                valueType: 'BOOLEAN',
                value: 'true'
              }
            }
          ]
        }
      ]
    }
  },
  metadataFields: [
    { name: 'size', valueType: 'INTEGER', tags: [], multiple: false },
    { name: 'author', valueType: 'STRING', tags: [], multiple: false },
    { name: 'isCat', valueType: 'BOOLEAN', tags: [], multiple: false },
    { name: 'weight', valueType: 'FLOAT', tags: [], multiple: false },
    { name: 'image', valueType: 'BLOB', tags: [], multiple: false }
  ],
  validateValueByType: validateValueByType,
  onChange: () => {},
  showConditionSummary: true
};
