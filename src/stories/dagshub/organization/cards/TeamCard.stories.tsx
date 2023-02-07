import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {TeamCard, TeamCardProps} from "../../../../components";

const meta: Meta<TeamCardProps> = {
    title: 'DagsHub/Org/Cards/TeamCard',
    component: TeamCard
};

export default meta;

const Template: StoryFn<TeamCardProps> = args => <TeamCard {...args} />;

const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"

export const primary = Template.bind({});
primary.args = {
    teamName: "Devops",
    teamDescription: "This is a team description text This is a team description text This is a team description text This is a team description text",
    teamMembersImages: [imageLink,imageLink,imageLink,imageLink,imageLink,imageLink,imageLink,imageLink],
    teamLink:imageLink
};
