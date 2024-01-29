import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ConditionTextField from '../../../../components/dagshub/data-engine/queryBuilder/ConditionTextField';

const meta: Meta<typeof ConditionTextField> = {
  title: 'DagsHub/Data-Engine/QueryBuilder/Condition/Condition-Text-Field',
  component: ConditionTextField,
};

export default meta;

const Template: StoryFn<typeof ConditionTextField> = (args) => <ConditionTextField {...args} />;

export const conditionTextFieldStoriesReadOnly: StoryFn<typeof ConditionTextField> = Template.bind(
  {}
);
conditionTextFieldStoriesReadOnly.args = {
  disabled: true,
  value: 'bla',
};
export const conditionTextFieldStories: StoryFn<typeof ConditionTextField> = Template.bind({});
conditionTextFieldStories.args = {
  disabled: false,
  placeholder: 'Enter value',
};
