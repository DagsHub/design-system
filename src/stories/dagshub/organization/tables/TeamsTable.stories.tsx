import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { RepoCardProps, TeamTable, TeamTableProps } from '../../../../components';
import { UserPermissionForTeam } from '../../../../types';
import { Member } from '../../../../components/dagshub/organization/tables/shared-classes';

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
  teamId: 5,
  teamName: 'Devops',
  teamDescription: 'this is the team description',
  teamPermission: UserPermissionForTeam.WriteAccess,
  members: [
    { id: 1, userName: 'user1', homeLink: '', relAvatarLink: imageLink },
    { id: 2, userName: 'user2', homeLink: '', relAvatarLink: imageLink },
    { id: 3, userName: 'user3', homeLink: '', relAvatarLink: imageLink },
    { id: 4, userName: 'user4', homeLink: '', relAvatarLink: imageLink },
    { id: 5, userName: 'user5', homeLink: '', relAvatarLink: imageLink },
    { id: 6, userName: 'user6', homeLink: '', relAvatarLink: imageLink },
    { id: 7, userName: 'user7', homeLink: '', relAvatarLink: imageLink },
    { id: 8, userName: 'user8', homeLink: '', relAvatarLink: imageLink },
    { id: 9, userName: 'user9', homeLink: '', relAvatarLink: imageLink }
  ],
  teamRepos: [],
  handleCollapse: () => {},
  style: 'none',
  isActive: false,
  removeFromTeam: () => {},
  addNewTeamMember: () => {},
  loggedUserId: 1,
  loggedUserIsOwner: true,
  isLogged: true,
  onStarActionClick: () => {}
};
