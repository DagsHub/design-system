import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { TeamTable, TeamTableProps } from '../../../../components';
import { UserPermissionForTeam } from '../../../../components/dagshub/organization/tables/shared-classes';

const meta: Meta<TeamTableProps> = {
  title: 'DagsHub/Org/Tables/TeamsTable',
  component: TeamTable
};

export default meta;

const Template: StoryFn<TeamTableProps> = (args) => <TeamTable {...args} />;
const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';

export const Primary = Template.bind({});
Primary.args = {
  users: [
    {
      userImage: imageLink,
      username: 'ItayMalka'
    },
    {
      userImage: imageLink,
      username: 'TalMalka'
    },
    {
      userImage: imageLink,
      username: 'ShaharMalka'
    },
    {
      userImage: imageLink,
      username: 'ItayMalka'
    },
    {
      userImage: imageLink,
      username: 'TalMalka'
    },
    {
      userImage: imageLink,
      username: 'ShaharMalka'
    },
    {
      userImage: imageLink,
      username: 'ItayMalka'
    },
    {
      userImage: imageLink,
      username: 'TalMalka'
    },
    {
      userImage: imageLink,
      username: 'ShaharMalka'
    }
  ],
  team: {
    name: 'Data science team',
    description: 'Deploying models to production',
    teamPermission: UserPermissionForTeam.WriteAccess,
    teamRepos: [{ name: 'repo-name-01' }, { name: 'repo-name-02' }, { name: 'repo-name-03' }]
  }
};
