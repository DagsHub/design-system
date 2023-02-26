import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  ProfileImageList,
  ProfileImageListProps
} from '../../../../components/dagshub/organization/profiles/profile-image-list';

const meta: Meta<ProfileImageListProps> = {
  title: 'DagsHub/Org/Profiles/ProfileImageList',
  component: ProfileImageList
};

export default meta;

const Template: StoryFn<ProfileImageListProps> = (args) => <ProfileImageList {...args} />;

const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';

export const Primary = Template.bind({});
Primary.args = {
  userList: [
    { id: 1, userName: 'tal1', homeLink: '', relAvatarLink: imageLink },
    { id: 2, userName: 'tal2', homeLink: '', relAvatarLink: imageLink },
    { id: 3, userName: 'tal3', homeLink: '', relAvatarLink: imageLink },
    { id: 4, userName: 'tal4', homeLink: '', relAvatarLink: imageLink },
    { id: 5, userName: 'tal5', homeLink: '', relAvatarLink: imageLink },
    { id: 6, userName: 'tal6', homeLink: '', relAvatarLink: imageLink },
    { id: 7, userName: 'tal7', homeLink: '', relAvatarLink: imageLink },
    { id: 8, userName: 'tal8', homeLink: '', relAvatarLink: imageLink },
    { id: 9, userName: 'tal9', homeLink: '', relAvatarLink: imageLink }
  ],
  maxImages: 6
};

export const Secondary = Template.bind({});
Secondary.args = {
  userList: [
    { id: 1, userName: 'tal1', homeLink: '', relAvatarLink: imageLink },
    { id: 2, userName: 'tal2', homeLink: '', relAvatarLink: imageLink }
  ],
  maxImages: 2
};
