import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {RepoCard, RepoCardProps} from '../../../../components/dagshub/organization/cards/repo-card';

const meta: Meta<RepoCardProps> = {
  title: 'DagsHub/Org/Cards/RepoCard',
  component: RepoCard
};

export default meta;

const Template: StoryFn<RepoCardProps> = args => <RepoCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isMini:false,
  isMirror: false,
  IsGithubIntegrated: false,
  numStars: 5,
  githubStarCount: 0,
  isFork: false,
  updatedAt: "8",
  isStaring: true,
  name: 'Regular Repository',
  isPrivate: true,
  description:
    'RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…',
  numForks: 0,
  numOpenPulls: 2,
  numOpenIssues: 3,
  topics: [
    { id: 1, name: 'general', categoryColorClass: 'general', categoryShowExplore: false, categoryHref:""},
    { id: 2, name: 'type', categoryColorClass: 'type', categoryShowExplore: true, categoryHref:""},
    { id: 3, name: 'task', categoryColorClass: 'task', categoryShowExplore: true, categoryHref:""},
    { id: 4, name: 'data domain', categoryColorClass: 'data_domain', categoryShowExplore: true, categoryHref:""},
    { id: 5, name: 'integration', categoryColorClass: 'integration', categoryShowExplore: true, categoryHref:""},
    { id: 6, name: 'framework', categoryColorClass: 'framework', categoryShowExplore: true, categoryHref:""},
    { id: 7, name: 'type', categoryColorClass: 'type', categoryShowExplore: true, categoryHref:""},
    { id: 8, name: 'task', categoryColorClass: 'task', categoryShowExplore: true, categoryHref:""},
    { id: 9, name: 'data domain',categoryColorClass: 'data_domain', categoryShowExplore: true, categoryHref:""},
    { id: 10, name: 'integration', categoryColorClass: 'integration', categoryShowExplore: true, categoryHref:""},
    { id: 11, name: 'framework', categoryColorClass: 'framework', categoryShowExplore: true, categoryHref:""}
  ],
  teams: [
    { id: 1, name: 'team1' },
    { id: 2, name: 'team2' },
    { id: 3, name: 'team3' },
    { id: 4, name: 'team4' },
    { id: 5, name: 'team5' },
    { id: 6, name: 'team6' },
    { id: 7, name: 'team7' },
    { id: 8, name: 'team8' },
    { id: 9, name: 'team9' },
    { id: 10, name: 'team10' }
  ]
};

export const Secondary = Template.bind({});
Secondary.args = {
  isMini:false,
  isMirror: true,
  IsGithubIntegrated: true,
  numStars: 5,
  githubStarCount: 3,
  isFork: false,
  updatedAt: "6",
  isStaring: false,
  name: 'Mirrored Repository',
  isPrivate: false,
  description:
    'RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…',
  numForks: 0,
  numOpenPulls: 2,
  numOpenIssues: 3,
  topics: [
    { id: 1, name: 'general', categoryColorClass: 'general', categoryShowExplore: false, categoryHref:""},
    { id: 2, name: 'type', categoryColorClass: 'type', categoryShowExplore: true, categoryHref:""},
    { id: 3, name: 'task', categoryColorClass: 'task', categoryShowExplore: true, categoryHref:""},
    { id: 4, name: 'data domain', categoryColorClass: 'data_domain', categoryShowExplore: true, categoryHref:""},
    { id: 5, name: 'integration', categoryColorClass: 'integration', categoryShowExplore: true, categoryHref:""}
  ],
  teams: [
    { id: 1, name: 'team1' },
    { id: 2, name: 'team2' },
    { id: 3, name: 'team3' },
    { id: 4, name: 'team4' }
  ]
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  isMini:false,
  isMirror: false,
  IsGithubIntegrated: false,
  numStars: 0,
  githubStarCount: 0,
  isFork: true,
  updatedAt: "6",
  isStaring: false,
  name: 'Forked Repository',
  isPrivate: false,
  description:
    'RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…',
  numForks: 3,
  numOpenPulls: 2,
  numOpenIssues: 3,
  topics: [
    { id: 1, name: 'general', categoryColorClass: "general", categoryShowExplore: false, categoryHref:""},
    { id: 4, name: 'data domain', categoryColorClass: 'data_domain', categoryShowExplore: true, categoryHref:"" },
    { id: 5, name: 'integration', categoryColorClass: 'integration', categoryShowExplore: true, categoryHref:"" }
  ],
  teams: []
};
