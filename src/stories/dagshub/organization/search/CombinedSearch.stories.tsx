import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {CombinedSearchProps, CombinedSearch} from "../../../../components/dagshub/organization/search/combined-search";

const meta: Meta<CombinedSearchProps> = {
    title: 'DagsHub/Org/Search/CombinedSearch',
    component: CombinedSearch
};

export default meta;

const Template: StoryFn<CombinedSearchProps> = (args) => <CombinedSearch {...args} />;

const imageLink =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';

export const Primary = Template.bind({});
Primary.args = {
    resultUsers: [
        {
            imageSource: imageLink,
            userName: 'ItayMalka'
        },
        {
            imageSource: imageLink,
            userName: 'TalMalka'
        },
        {
            imageSource: imageLink,
            userName: 'ShaharMalka'
        },
        {
            imageSource: imageLink,
            userName: 'ItayMalka'
        },
        {
            imageSource: imageLink,
            userName: 'TalMalka'
        },
        {
            imageSource: imageLink,
            userName: 'ShaharMalka'
        }
    ],
    inputText:"",
    onInputChange:()=>{}
};
