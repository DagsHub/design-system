import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import SearchResultList, {SearchResultListProps} from '../../../components/dagshub/organization/search-results';
import UserInfo from '../../../components/dagshub/organization/user-info';

const meta: Meta<typeof SearchResultList> = {
  title: 'DagsHub/Org/SearchResultList',
  component: SearchResultList
};

export default meta;

const Template: StoryFn<SearchResultListProps> = args => <SearchResultList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  rows:[
    { rowElements: [UserInfo, UserInfo],
      elementsData: [{
        imageSource:"../../assets/nir.png",
        fullName:"Kirill Bolashev",
        userName:"@KBolashev"}, {
        imageSource:"../../assets/nir.png",
        fullName:"Nir Barazida",
        userName:"@KBolashev"}]
    },
    { rowElements: [UserInfo],
      elementsData: [{
        imageSource:"../../assets/nir.png",
        fullName:"Tal Malka",
        userName:"@Tal Malka"}]
    },
  ]
};
