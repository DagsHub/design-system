import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {SearchResultList, SearchResultListProps} from '../../../components';

const meta: Meta<typeof SearchResultList> = {
  title: 'DagsHub/Org/SearchResultList',
  component: SearchResultList
};

export default meta;

const Template: StoryFn<SearchResultListProps> = args => <SearchResultList {...args} />;
const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"

export const Primary = Template.bind({});
Primary.args = {
  users:[
    {
      userImage: imageLink,
      fullName: "Itay Malka",
      username: "ItayMalka"
    },
    {
      userImage: imageLink,
      fullName: "Tal Malka",
      username: "TalMalka"
    },
    {
      userImage: imageLink,
      fullName: "Shahar Malka",
      username: "ShaharMalka"
    }
  ]
};

