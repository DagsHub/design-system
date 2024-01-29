import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  HorizontalMenuTab,
  HorizontalMenuTabProps,
} from '../../../../components/dagshub/organization/menus/horizontal-menu-tab';
import { Icon } from '../../../../components';

const meta: Meta<HorizontalMenuTabProps> = {
  title: 'DagsHub/Org/Menus/HorizontalMenuTab',
  component: HorizontalMenuTab,
};

export default meta;

const Template: StoryFn<HorizontalMenuTabProps> = (args) => <HorizontalMenuTab {...args} />;
export const Primary1 = Template.bind({});
Primary1.args = {
  text: 'Collaborations',
  icon: <Icon icon="outline-repository-github" width={16} height={20} />,
  checked: true,
  iconRight: <Icon icon={'solid-cheveron-up'} width={10} height={6} fill={'#5467DE'} />,
  onClick: () => {
    console.log('hi');
  },
};

export const Primary2 = Template.bind({});
Primary2.args = {
  text: 'Repositories',
  icon: <Icon icon={'outline-repository-github'} width={16} height={21} />,
  count: 2,
};

export const Primary3 = Template.bind({});
Primary3.args = {
  text: 'Teams',
  icon: <Icon icon={'outline-user-group'} width={24} height={24} />,
  count: 4,
};

export const Primary4 = Template.bind({});
Primary4.args = {
  text: 'People',
  icon: <Icon icon="outline-users" width={20} height={20} />,
  count: 10,
};

export const Primary5 = Template.bind({});
Primary5.args = {
  text: 'Settings',
  icon: <Icon icon="outline-cog" width={22} height={22} />,
};
export const Primary6 = Template.bind({});
Primary6.args = {
  text: 'With Wrapper',
  icon: <Icon icon={'outline-cog'} width={22} height={22} />,
  Wrapper: ({ children }) => <div style={{ background: 'red' }}>{children}</div>,
};
