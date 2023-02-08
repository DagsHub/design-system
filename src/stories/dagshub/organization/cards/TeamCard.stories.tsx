import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { TeamCard, TeamCardProps } from '../../../../components';

const meta: Meta<TeamCardProps> = {
  title: 'DagsHub/Org/Cards/TeamCard',
  component: TeamCard
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
    { name: 'user1', homeLink: imageLink, relAvatarLink: imageLink },
    { name: 'user2', homeLink: imageLink, relAvatarLink: imageLink },
    { name: 'user3', homeLink: imageLink, relAvatarLink: imageLink },
    { name: 'user4', homeLink: imageLink, relAvatarLink: imageLink },
    { name: 'user5', homeLink: imageLink, relAvatarLink: imageLink },
    { name: 'user6', homeLink: imageLink, relAvatarLink: imageLink },
    { name: 'user7', homeLink: imageLink, relAvatarLink: imageLink }
  ],
  teamLink: imageLink
};
