import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  OrgAdminTable,
  OrgAdminTableProps
} from '../../../../components/dagshub/organization/tables/org-admin-table';

const meta: Meta<OrgAdminTableProps> = {
  title: 'DagsHub/Org/Tables/OrgAdminTable',
  component: OrgAdminTable
};

export default meta;

const Template: StoryFn<OrgAdminTableProps> = (args) => <OrgAdminTable {...args} />;
const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';
export const Primary = Template.bind({});
Primary.args = {
  admins: [
    {
      userImage: imageLink,
      fullName: 'Itay Malka',
      username: 'ItayMalka'
    },
    {
      userImage: imageLink,
      fullName: 'Tal Malka',
      username: 'TalMalka'
    },
    {
      userImage: imageLink,
      fullName: 'Shahar Malka',
      username: 'ShaharMalka'
    }
  ]
};
