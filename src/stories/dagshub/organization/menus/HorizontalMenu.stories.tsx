import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  HorizontalMenu,
  HorizontalMenuProps
} from '../../../../components/dagshub/organization/menus/horizontal-menu';
import { Icon } from '../../../../components';

const meta: Meta<HorizontalMenuProps> = {
  title: 'DagsHub/Org/Menus/HorizontalMenu',
  component: HorizontalMenu
};

export default meta;

const Template: StoryFn<HorizontalMenuProps> = (args) => <HorizontalMenu {...args} />;
export const Primary1 = Template.bind({});
Primary1.args = {
  tabs: [
    {
      text: 'Overview',
      icon: <Icon icon="outline-notebook" width={20} height={18.25} />
    },
    {
      text: 'Repositories',
      icon: <Icon icon="outline-repository-github" width={16} height={20} />,
      count: 2
    },
    {
      text: 'Teams',
      icon: <Icon icon="outline-user-group" width={24} height={24} />,
      count: 4
    },
    {
      text: 'People',
      icon: <Icon icon="outline-users" width={18} height={18} />,
      count: 10
    },
    {
      text: 'Settings',
      icon: <Icon icon="outline-cog" width={24} height={24} />
    }
  ]
};
