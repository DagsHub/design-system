import React from 'react';
import type {Meta, StoryFn } from '@storybook/react';
import TeamTable, {TeamTableProps} from '../../../components/dagshub/organization/teams-table';
import {UserPermissionForTeam} from "../../../components/dagshub/organization/people-table";

const meta: Meta<typeof TeamTable> = {
  title: 'DagsHub/Org/TeamsTable',
  component: TeamTable
};

export default meta;

const Template: StoryFn<TeamTableProps> = args => <TeamTable {...args} />;
const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"

export const Primary = Template.bind({});
Primary.args = {
  users:[
    {
      userImage: imageLink,
      fullName: "Itay Malka",
      username: "ItayMalka"
    },
    {
      userImage: imageLink,
      fullName: "Tal Malka",
      username: "TalMalka"
    },
    {
      userImage: imageLink,
      fullName: "Shahar Malka",
      username: "ShaharMalka"
    },
    {
      userImage: imageLink,
      fullName: "Itay Malka",
      username: "ItayMalka"
    },
    {
      userImage: imageLink,
      fullName: "Tal Malka",
      username: "TalMalka"
    },
    {
      userImage: imageLink,
      fullName: "Shahar Malka",
      username: "ShaharMalka"
    },
    {
      userImage: imageLink,
      fullName: "Itay Malka",
      username: "ItayMalka"
    },
    {
      userImage: imageLink,
      fullName: "Tal Malka",
      username: "TalMalka"
    },
    {
      userImage: imageLink,
      fullName: "Shahar Malka",
      username: "ShaharMalka"
    }
  ],
  team:{
    name:"Data science team",
    description:"Deploying models to production",
    teamPermission:UserPermissionForTeam.WriteAccess,
    teamRepos:[{name:"repo-name-01"},{name:"repo-name-02"},{name:"repo-name-03"}]
  }
};
