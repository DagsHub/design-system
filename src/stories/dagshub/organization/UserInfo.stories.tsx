import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { UserInfo, UserInfoProps } from '../../../components';

const meta: Meta<typeof UserInfo> = {
  title: 'DagsHub/Org/UserInfo',
  component: UserInfo
};

export default meta;

const Template: StoryFn<UserInfoProps> = args => <UserInfo {...args} />;

const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"

export const Primary = Template.bind({});
Primary.args = {
  imageSource:imageLink,
  fullName:"Nir Barazida",
  userName:"KBolashev"
};
