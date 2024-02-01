import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { OrgAdminTable, OrgAdminTableProps } from '../../../../components';

const meta: Meta<OrgAdminTableProps> = {
  title: 'DagsHub/Org/Tables/OrgAdminTable',
  component: OrgAdminTable,
};

export default meta;

const Template: StoryFn<OrgAdminTableProps> = (args) => <OrgAdminTable {...args} />;
const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';
export const Primary = Template.bind({});
Primary.args = {
  loggedUserId: 1,
  loggedUserIsOwner: true,
  orgName: 'Dagshub',
  admins: [
    {
      id: 1,
      userImage: imageLink,
      username: 'tal',
    },
    {
      id: 2,
      userImage: imageLink,
      username: 'shahar',
    },
    {
      id: 3,
      userImage: imageLink,
      username: 'itay',
    },
  ],
};
