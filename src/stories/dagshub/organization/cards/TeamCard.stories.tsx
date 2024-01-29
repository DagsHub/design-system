import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { TeamCard, TeamCardProps } from '../../../../components';

const meta: Meta<TeamCardProps> = {
  title: 'DagsHub/Org/Cards/TeamCard',
  component: TeamCard,
};

export default meta;

const Template: StoryFn<TeamCardProps> = (args) => <TeamCard {...args} />;

const imageLink =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU';

export const primary = Template.bind({});
primary.args = {
  teamName: 'Devops',
  teamDescription:
    'This is a team description text This is a team description text This is a team description text This is a team description text',
  teamMembers: [
    { id: 1, userName: 'user1', homeLink: imageLink, relAvatarLink: imageLink },
    { id: 2, userName: 'user2', homeLink: imageLink, relAvatarLink: imageLink },
    { id: 3, userName: 'user3', homeLink: imageLink, relAvatarLink: imageLink },
    { id: 4, userName: 'user4', homeLink: imageLink, relAvatarLink: imageLink },
    { id: 5, userName: 'user5', homeLink: imageLink, relAvatarLink: imageLink },
    { id: 6, userName: 'user6', homeLink: imageLink, relAvatarLink: imageLink },
    { id: 7, userName: 'user7', homeLink: imageLink, relAvatarLink: imageLink },
  ],
  teamLink: imageLink,
};
