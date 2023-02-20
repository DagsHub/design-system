import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { UserPermissionForTeam } from '../../../../types';
import {
  PeopleTable,
  MembershipVisibility,
  PeopleTableProps
} from '../../../../components/dagshub/organization/tables/people-table';

const meta: Meta<PeopleTableProps> = {
  title: 'DagsHub/Org/Tables/PeopleTable',
  component: PeopleTable
};

export default meta;

const Template: StoryFn<PeopleTableProps> = (args) => <PeopleTable {...args} />;
const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';
export const Primary = Template.bind({});
Primary.args = {
  users: [
    {
      userImage: imageLink,
      username: 'ItayMalka',
      userTeams: [
        {
          teamLink: '',
          teamName: 'Devops Team',
          userPermissionForTeam: UserPermissionForTeam.AdminAccess
        }
      ],
      membershipVisibility: MembershipVisibility.Private
    },
    {
      userImage: imageLink,
      username: 'TalMalka',
      userTeams: [
        {
          teamLink: '',
          teamName: 'Devops Team',
          userPermissionForTeam: UserPermissionForTeam.WriteAccess
        },
        {
          teamLink: '',
          teamName: 'R&D Team',
          userPermissionForTeam: UserPermissionForTeam.ReadAccess
        }
      ],
      membershipVisibility: MembershipVisibility.Public
    },
    {
      userImage: imageLink,
      username: 'ShaharMalka',
      userTeams: [
        {
          teamLink: '',
          teamName: 'Devops Team',
          userPermissionForTeam: UserPermissionForTeam.AdminAccess
        },
        {
          teamLink: '',
          teamName: 'R&D Team',
          userPermissionForTeam: UserPermissionForTeam.WriteAccess
        },
        {
          teamLink: '',
          teamName: 'Product Team',
          userPermissionForTeam: UserPermissionForTeam.ReadAccess
        }
      ],
      membershipVisibility: MembershipVisibility.Private
    }
  ]
};
