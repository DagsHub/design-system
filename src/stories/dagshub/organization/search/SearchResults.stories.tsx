import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  SearchResultList,
  SearchResultListProps,
} from '../../../../components/dagshub/organization/search/search-results';

const meta: Meta<SearchResultListProps> = {
  title: 'DagsHub/Org/Search/SearchResultList',
  component: SearchResultList,
};

export default meta;

const Template: StoryFn<SearchResultListProps> = (args) => <SearchResultList {...args} />;
const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';

export const Primary = Template.bind({});
Primary.args = {
  users: [
    {
      imageSource: imageLink,
      userName: 'ItayMalka',
    },
    {
      imageSource: imageLink,
      userName: 'TalMalka',
    },
    {
      imageSource: imageLink,
      userName: 'ShaharMalka',
    },
    {
      imageSource: imageLink,
      userName: 'ItayMalka',
    },
    {
      imageSource: imageLink,
      userName: 'TalMalka',
    },
    {
      imageSource: imageLink,
      userName: 'ShaharMalka',
    },
  ],
};
