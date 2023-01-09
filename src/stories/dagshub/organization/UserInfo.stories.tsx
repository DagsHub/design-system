import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import UserInfo from '../../../components/dagshub/organization/user-info';

const meta: Meta<typeof UserInfo> = {
  title: 'DagsHub/Org/UserInfo',
  component: UserInfo
};

export default meta;

const Template: StoryFn<typeof UserInfo> = (args) => <UserInfo{...args} />;

export const Primary = Template.bind({});
Primary.args = {
  imageSource:"../../assets/nir.png",
  fullName:"Kirill Bolashev",
  userName:"@KBolashev"
};
