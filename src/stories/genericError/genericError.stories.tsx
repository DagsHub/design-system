import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { GenericError } from '../../components/elements/genericError';

const meta: Meta<typeof GenericError> = {
  title: 'Elements/Error',
  component: GenericError,
};

export default meta;

const Template: StoryFn<typeof GenericError> = (args) => <GenericError {...args} />;

export const genericErrorWithNoSupport: StoryFn<typeof GenericError> = Template.bind({});
genericErrorWithNoSupport.args = {
  text: 'JSON is not valid',
  support: false,
};

export const genericErrorWithSupport: StoryFn<typeof GenericError> = Template.bind({});
genericErrorWithSupport.args = {
  text: 'JSON is not valid',
  support: true,
};
