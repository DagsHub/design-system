import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import CustomTextField from '../../../../components/dagshub/data-engine/metadataKeyValue/CustomTextField';

const meta: Meta<typeof CustomTextField> = {
  title: 'DagsHub/Data-Engine/CustomTextField/Custom text field',
  component: CustomTextField
};

export default meta;

const Template: StoryFn<typeof CustomTextField> = (args) => <CustomTextField {...args} />;

export const customTextFieldStoriesReadOnly: StoryFn<typeof CustomTextField> = Template.bind({});
customTextFieldStoriesReadOnly.args = {
  readOnly: true,
  value: 'bla'
};
export const customTextFieldStories: StoryFn<typeof CustomTextField> = Template.bind({});
customTextFieldStories.args = {
  readOnly: false,
  placeholder: 'Enter value...'
};
