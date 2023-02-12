import React from 'react';
import { RadioButtonItem } from '../../../components/forms/radio-button/radio-button-item';
import { RadioButtonList } from '../../../components/forms/radio-button/radio-button-list';
import { Icon } from '../../../components';
import { Meta, StoryFn } from '@storybook/react';
import { RadioButtonListProps } from '../../../components/forms/radio-button/radio-button-list';

const meta: Meta<RadioButtonListProps> = {
  title: 'Forms/RadioButtonList',
  component: RadioButtonList
};

export default meta;

const Template: StoryFn<RadioButtonListProps> = (args) => <RadioButtonList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Team permissions',
  items: [
    <RadioButtonItem
      id={1}
      label="Read access"
      description="This team will be able to view and clone its repositories"
      icon={<Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />}
    />,
    <RadioButtonItem
      id={2}
      label="Write access"
      description="This team will be able to read its repositories, as well as push to them."
      icon={<Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />}
    />,
    <RadioButtonItem
      id={2}
      label="Admin access"
      description="This team will be able to push/pull to its repositories, as well as add other collaborators to them."
      icon={<Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />}
    />
  ]
};
