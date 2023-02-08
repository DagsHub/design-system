import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Header, HeaderProps } from '../../../../components/dagshub/organization/header';

const meta: Meta<HeaderProps> = {
  title: 'DagsHub/Org/Header/Header',
  component: Header
};

export default meta;

const Template: StoryFn<HeaderProps> = (args) => <Header {...args} />;

const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';

export const Primary = Template.bind({});
Primary.args = {
  orgImageSource: imageLink,
  orgName: 'Dagshub',
  orgSite: 'https://DagsHub.com',
  orgPlan: 'teams plan'
};
export const Primary2 = Template.bind({});
Primary2.args = {
  orgImageSource: imageLink,
  orgName: 'Dagshub',
  orgPlan: 'teams plan'
};
