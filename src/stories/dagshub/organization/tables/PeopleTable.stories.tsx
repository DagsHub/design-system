import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { UserPermissionForTeam } from '../../../../types';
import {
  PeopleTable,
  MembershipVisibility,
  PeopleTableProps,
} from '../../../../components/dagshub/organization/tables/people-table';
import { Member } from '../../../../components/dagshub/organization/tables/shared-classes';
import { TeamCardProps } from '../../../../components';

const meta: Meta<PeopleTableProps> = {
  title: 'DagsHub/Org/Tables/PeopleTable',
  component: PeopleTable,
};

export default meta;

const Template: StoryFn<PeopleTableProps> = (args) => <PeopleTable {...args} />;
const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';
export const Primary = Template.bind({});
Primary.args = {
  loggedUserId: 1,
  loggedUserIsOwner: true,
  orgName: 'Dagshub',
  users: [
    {
      id: 1,
      userImage: imageLink,
      toggleTeamsModal: () => {},
      displayTeamsModal: false,
      userIndex: 1,
      homeLink: '',
      username: 'ItayMalka',
      userTeams: [
        {
          teamName: 'Devops team',
          teamDescription: 'this is the devops team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.AdminAccess,
        },
        {
          teamName: 'R&D team',
          teamDescription: 'this is the R&D team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.WriteAccess,
        },
        {
          teamName: 'Product team',
          teamDescription: 'this is the product team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.ReadAccess,
        },
      ],
      membershipVisibility: MembershipVisibility.Private,
    },
    {
      id: 2,
      userImage: imageLink,
      toggleTeamsModal: () => {},
      displayTeamsModal: false,
      userIndex: 2,
      homeLink: '',
      username: 'TalMalka',
      userTeams: [
        {
          teamName: 'Devops team',
          teamDescription: 'this is the devops team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.AdminAccess,
        },
        {
          teamName: 'R&D team',
          teamDescription: 'this is the R&D team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.WriteAccess,
        },
        {
          teamName: 'Marketing team',
          teamDescription: 'this is the marketing team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.ReadAccess,
        },
      ],
      membershipVisibility: MembershipVisibility.Private,
    },
    {
      id: 3,
      userImage: imageLink,
      toggleTeamsModal: () => {},
      displayTeamsModal: false,
      userIndex: 3,
      homeLink: '',
      username: 'ShaharMalka',
      userTeams: [
        {
          teamName: 'IT team',
          teamDescription: 'this is the devops team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.AdminAccess,
        },
        {
          teamName: 'R&D team',
          teamDescription: 'this is the R&D team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.WriteAccess,
        },
        {
          teamName: 'Product team',
          teamDescription: 'this is the product team description',
          teamMembers: [],
          teamLink: '',
          userPermissionForTeam: UserPermissionForTeam.ReadAccess,
        },
      ],
      membershipVisibility: MembershipVisibility.Private,
    },
  ],
};
