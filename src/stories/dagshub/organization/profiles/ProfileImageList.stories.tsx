import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {ProfileImageList, ProfileImageListProps} from '../../../../components/dagshub/organization/profiles/profile-image-list';

const meta: Meta<ProfileImageListProps> = {
    title: 'DagsHub/Org/Profiles/ProfileImageList',
    component: ProfileImageList
};

export default meta;

const Template: StoryFn<ProfileImageListProps> = args => <ProfileImageList {...args} />;

const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"

export const Primary = Template.bind({});
Primary.args = {
    imgList:[imageLink,imageLink,imageLink,imageLink,imageLink,imageLink,imageLink,imageLink],
    maxImages:6
};

export const Secondary = Template.bind({});
Secondary.args = {
    imgList:[imageLink,imageLink],
    maxImages:2
};


