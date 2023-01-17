import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import PeopleTable, {
  MembershipVisibility,
  PeopleTableProps,
  UserPermissionForTeam
} from '../../../components/dagshub/organization/people-table';

const meta: Meta<typeof PeopleTable> = {
  title: 'DagsHub/Org/PeopleTable',
  component: PeopleTable
};

export default meta;

const Template: StoryFn<PeopleTableProps> = args => <PeopleTable {...args} />;
const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"
export const Primary = Template.bind({});
Primary.args = {
  users:[
    {
      userImage: imageLink,
      fullName: "Itay Malka",
      username: "ItayMalka",
      userTeams: [
        {
          teamName: "Devops Team",
          userPermissionForTeam: UserPermissionForTeam.AdminAccess
        }
      ],
      membershipVisibility: MembershipVisibility.Private
    },
    {
      userImage: imageLink,
      fullName: "Tal Malka",
      username: "TalMalka",
      userTeams: [
        {
          teamName: "Devops Team",
          userPermissionForTeam: UserPermissionForTeam.WriteAccess
        },
        {
          teamName: "R&D Team",
          userPermissionForTeam: UserPermissionForTeam.ReadAccess
        }
      ],
      membershipVisibility: MembershipVisibility.Public
    },
    {
      userImage: imageLink,
      fullName: "Shahar Malka",
      username: "ShaharMalka",
      userTeams: [
        {
          teamName: "Devops Team",
          userPermissionForTeam: UserPermissionForTeam.AdminAccess
        },
        {
          teamName: "R&D Team",
          userPermissionForTeam: UserPermissionForTeam.WriteAccess
        },
        {
          teamName: "Product Team",
          userPermissionForTeam: UserPermissionForTeam.ReadAccess
        }
      ],
      membershipVisibility: MembershipVisibility.Private
    }
  ]
};
