import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { RadioButtonItemProps } from '../../../../components';
import { ConditionDropdown } from '../../../../components/dagshub/data-engine/queryBuilder/ConditionDropdown';
import { Comparator } from '../../../../components/dagshub/data-engine/queryBuilder/QueryBuilderContext';

const meta: Meta<typeof ConditionDropdown> = {
  title: 'DagsHub/Data-Engine/QueryBuilder/Condition/ConditionDropdown',
  component: ConditionDropdown
};

export default meta;

const Operators: { label: string; id: Comparator; value?: string }[] = [
  { label: '==', id: 'EQUAL' },
  { label: '>', id: 'GREATER_THAN' },
  { label: '>=', id: 'GREATER_EQUAL_THAN' },
  { label: '<', id: 'LESS_THAN' },
  { label: '<=', id: 'LESS_EQUAL_THAN' },
  { label: 'contains', id: 'CONTAINS' },
  { label: 'is null', id: 'IS_NULL' }
];

const Template: StoryFn<typeof ConditionDropdown> = (args) => {
  const [selectedOption, setSelectedOption] = React.useState<RadioButtonItemProps | undefined>(
    Operators[0]
  );
  return (
    <ConditionDropdown
      {...args}
      options={Operators}
      initialChecked={selectedOption}
      onChange={(event, value) => {
        setSelectedOption(value ?? undefined);
      }}
    />
  );
};

export const conditionDropdown: StoryFn<typeof ConditionDropdown> = Template.bind({});
conditionDropdown.args = {};
