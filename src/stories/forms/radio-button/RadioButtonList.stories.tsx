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
    {
      id: 'member-access',
      width: 600,
      label: 'Member access to organization',
      description:
          'Members have no special access by default. Grant them repository access once they are added.',
      icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
    },
    {
      id: 'admin-access',
      width: 600,
      label: 'Admin access to organization',
      description:
          'Admins have full access to all repositories and have admin rights to the organization',
      icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
    }
  ]
};
