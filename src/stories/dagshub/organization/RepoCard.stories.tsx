import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import RepoCard from '../../../components/dagshub/organization/repo-card';

const meta: Meta<typeof RepoCard> = {
  title: 'DagsHub/Org/RepoCard',
  component: RepoCard
};

export default meta;

const Template: StoryFn<typeof RepoCard> = (args) => <RepoCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isMirror: false,
  IsGithubIntegrated: false,
  numStars: 5,
  githubStarCount: 0,
  isFork: false,
  updatedDaysAgo: 8,
  isStaring: true,
  repoName: 'Regular Repository',
  isPrivate: true,
  hasDescription: true,
  repoDescription:
    'RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…',
  numForks: 0,
  numOpenPulls: 2,
  numOpenIssues: 3,
  topics: [
    { id: 1, name: 'general', categoryId: { colorClassName: 'general', showExplore: false } },
    { id: 2, name: 'type', categoryId: { colorClassName: 'type', showExplore: true } },
    { id: 3, name: 'task', categoryId: { colorClassName: 'task', showExplore: true } },
    {
      id: 4,
      name: 'data domain',
      categoryId: { colorClassName: 'data_domain', showExplore: true }
    },
    {
      id: 5,
      name: 'integration',
      categoryId: { colorClassName: 'integration', showExplore: true }
    },
    { id: 6, name: 'framework', categoryId: { colorClassName: 'framework', showExplore: true } },
    { id: 7, name: 'type', categoryId: { colorClassName: 'type', showExplore: true } },
    { id: 8, name: 'task', categoryId: { colorClassName: 'task', showExplore: true } },
    {
      id: 9,
      name: 'data domain',
      categoryId: { colorClassName: 'data_domain', showExplore: true }
    },
    {
      id: 10,
      name: 'integration',
      categoryId: { colorClassName: 'integration', showExplore: true }
    },
    { id: 11, name: 'framework', categoryId: { colorClassName: 'framework', showExplore: true } }
  ],
  repoTeams: [
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
  isMirror: true,
  IsGithubIntegrated: true,
  numStars: 5,
  githubStarCount: 3,
  isFork: false,
  updatedDaysAgo: 6,
  isStaring: false,
  repoName: 'Mirrored Repository',
  isPrivate: false,
  hasDescription: true,
  repoDescription:
    'RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…',
  numForks: 0,
  numOpenPulls: 2,
  numOpenIssues: 3,
  topics: [
    { id: 1, name: 'general', categoryId: { colorClassName: 'general', showExplore: false } },
    { id: 2, name: 'type', categoryId: { colorClassName: 'type', showExplore: true } },
    { id: 3, name: 'task', categoryId: { colorClassName: 'task', showExplore: true } },
    {
      id: 4,
      name: 'data domain',
      categoryId: { colorClassName: 'data_domain', showExplore: true }
    },
    { id: 5, name: 'integration', categoryId: { colorClassName: 'integration', showExplore: true } }
  ],
  repoTeams: [
    { id: 1, name: 'team1' },
    { id: 2, name: 'team2' },
    { id: 3, name: 'team3' },
    { id: 4, name: 'team4' }
  ]
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  isMirror: false,
  IsGithubIntegrated: false,
  numStars: 0,
  githubStarCount: 0,
  isFork: true,
  updatedDaysAgo: 6,
  isStaring: false,
  repoName: 'Forked Repository',
  isPrivate: false,
  hasDescription: false,
  repoDescription:
    'RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…',
  numForks: 3,
  numOpenPulls: 2,
  numOpenIssues: 3,
  topics: [
    { id: 1, name: 'general', categoryId: { colorClassName: 'general', showExplore: false } },
    {
      id: 4,
      name: 'data domain',
      categoryId: { colorClassName: 'data_domain', showExplore: true }
    },
    { id: 5, name: 'integration', categoryId: { colorClassName: 'integration', showExplore: true } }
  ],
  repoTeams: []
};
