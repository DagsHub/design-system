import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  MiniRepoCardsModal,
  MiniRepoCardsModalProps
} from '../../../../components/dagshub/organization/modals/mini-repo-cards-modal';

const meta: Meta<MiniRepoCardsModalProps> = {
  title: 'DagsHub/Org/Modals/MiniRepoCardsModal',
  component: MiniRepoCardsModal
};

export default meta;

const Template: StoryFn<MiniRepoCardsModalProps> = (args) => <MiniRepoCardsModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  teamName: 'DS team',
  repos: [
    {
      isMini: true,
      isMirror: false,
      IsGithubIntegrated: false,
      numStars: 5,
      githubStarCount: 0,
      isFork: false,
      updatedAt: "6",
      isStaring: true,
      name: 'Regular Repository',
      isPrivate: true,
      description:
        'RPPP – Reddit Post Popularity Predictor\n A project with two goals: 1. Given a Reddit post, predict how popular it’s going to be (what it’s score will be) 2. Showcasing a remote working file system with DV…',
      numForks: 0,
      numOpenPulls: 2,
      numOpenIssues: 3,
      topics: [
        { id: 1, name: 'general', categoryShowExplore: false ,categoryColorClass: 'general',  categoryHref:''},
        { id: 1, name: 'task', categoryShowExplore: false ,categoryColorClass: 'task',  categoryHref:''},
        { id: 1, name: 'type', categoryShowExplore: false ,categoryColorClass: 'type',  categoryHref:''},
        { id: 1, name: 'integration', categoryShowExplore: false ,categoryColorClass: 'integration',  categoryHref:''},
        { id: 1, name: 'data domain', categoryShowExplore: false ,categoryColorClass: 'data_domain',  categoryHref:''},
        { id: 1, name: 'general', categoryShowExplore: false ,categoryColorClass: 'general',  categoryHref:''},
        { id: 1, name: 'task', categoryShowExplore: false ,categoryColorClass: 'task',  categoryHref:''},
        { id: 1, name: 'type', categoryShowExplore: false ,categoryColorClass: 'type',  categoryHref:''},
        { id: 1, name: 'integration', categoryShowExplore: false ,categoryColorClass: 'integration',  categoryHref:''},
        { id: 1, name: 'data domain', categoryShowExplore: false ,categoryColorClass: 'data_domain',  categoryHref:''}
      ],
      teams: [
        { teamName: 'team1', teamLink: '' },
        { teamName: 'team2', teamLink: '' },
        { teamName: 'team3', teamLink: '' }
      ],
      repoNameHref:'',
      starActionLink:'',
      starNumberLink:'',
      isLogged:true,
      forksHref: '',
      issuesHref: '',
      pullsHref: '',
      onStarActionClick:()=>{}
    },
    {
      isMini: true,
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
        { id: 1, name: 'general', categoryShowExplore: false ,categoryColorClass: 'general',  categoryHref:''},
        { id: 1, name: 'task', categoryShowExplore: false ,categoryColorClass: 'task',  categoryHref:''},
        { id: 1, name: 'type', categoryShowExplore: false ,categoryColorClass: 'type',  categoryHref:''},
        { id: 1, name: 'integration', categoryShowExplore: false ,categoryColorClass: 'integration',  categoryHref:''},
        { id: 1, name: 'data domain', categoryShowExplore: false ,categoryColorClass: 'data_domain',  categoryHref:''}
      ],
      teams: [
        { teamName: 'team1', teamLink: '' },
        { teamName: 'team2', teamLink: '' },
        { teamName: 'team3', teamLink: '' }
      ],
      repoNameHref:'',
      starActionLink:'',
      starNumberLink:'',
      isLogged:true,
      forksHref: '',
      issuesHref: '',
      pullsHref: '',
      onStarActionClick:()=>{}
    },
    {
      isMini: true,
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
        { id: 1, name: 'general', categoryShowExplore: false ,categoryColorClass: 'general',  categoryHref:''},
        { id: 1, name: 'task', categoryShowExplore: false ,categoryColorClass: 'task',  categoryHref:''},
        { id: 1, name: 'type', categoryShowExplore: false ,categoryColorClass: 'type',  categoryHref:''},
        { id: 1, name: 'integration', categoryShowExplore: false ,categoryColorClass: 'integration',  categoryHref:''},
        { id: 1, name: 'data domain', categoryShowExplore: false ,categoryColorClass: 'data_domain',  categoryHref:''}
      ],
      teams: [],
      repoNameHref:'',
      starActionLink:'',
      starNumberLink:'',
      isLogged:true,
      forksHref: '',
      issuesHref: '',
      pullsHref: '',
      onStarActionClick:()=>{}
    },
    {
      isMini: true,
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
        { id: 1, name: 'general', categoryShowExplore: false ,categoryColorClass: 'general',  categoryHref:''},
        { id: 1, name: 'task', categoryShowExplore: false ,categoryColorClass: 'task',  categoryHref:''},
        { id: 1, name: 'type', categoryShowExplore: false ,categoryColorClass: 'type',  categoryHref:''},
        { id: 1, name: 'integration', categoryShowExplore: false ,categoryColorClass: 'integration',  categoryHref:''},
        { id: 1, name: 'data domain', categoryShowExplore: false ,categoryColorClass: 'data_domain',  categoryHref:''}
      ],
      teams: [
        { teamName: 'team1', teamLink: '' },
        { teamName: 'team2', teamLink: '' },
        { teamName: 'team3', teamLink: '' }
      ],
      repoNameHref:'',
      starActionLink:'',
      starNumberLink:'',
      isLogged:true,
      forksHref: '',
      issuesHref: '',
      pullsHref: '',
      onStarActionClick:()=>{}
    },
    {
      isMini: true,
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
        { id: 1, name: 'general', categoryShowExplore: false ,categoryColorClass: 'general',  categoryHref:''},
        { id: 1, name: 'task', categoryShowExplore: false ,categoryColorClass: 'task',  categoryHref:''},
        { id: 1, name: 'type', categoryShowExplore: false ,categoryColorClass: 'type',  categoryHref:''},
        { id: 1, name: 'integration', categoryShowExplore: false ,categoryColorClass: 'integration',  categoryHref:''},
        { id: 1, name: 'data domain', categoryShowExplore: false ,categoryColorClass: 'data_domain',  categoryHref:''}
      ],
      teams: [
        { teamName: 'team1', teamLink: '' },
        { teamName: 'team2', teamLink: '' },
        { teamName: 'team3', teamLink: '' }
      ],
      repoNameHref:'',
      starActionLink:'',
      starNumberLink:'',
      isLogged:true,
      forksHref: '',
      issuesHref: '',
      pullsHref: '',
      onStarActionClick:()=>{}
    },
    {
      isMini: true,
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
        { id: 1, name: 'general', categoryShowExplore: false ,categoryColorClass: 'general',  categoryHref:''},
        { id: 1, name: 'task', categoryShowExplore: false ,categoryColorClass: 'task',  categoryHref:''},
        { id: 1, name: 'type', categoryShowExplore: false ,categoryColorClass: 'type',  categoryHref:''},
        { id: 1, name: 'integration', categoryShowExplore: false ,categoryColorClass: 'integration',  categoryHref:''},
        { id: 1, name: 'data domain', categoryShowExplore: false ,categoryColorClass: 'data_domain',  categoryHref:''}
      ],
      teams: [
        { teamName: 'team1', teamLink: '' },
        { teamName: 'team2', teamLink: '' },
        { teamName: 'team3', teamLink: '' }
      ],
      repoNameHref:'',
      starActionLink:'',
      starNumberLink:'',
      isLogged:true,
      forksHref: '',
      issuesHref: '',
      pullsHref: '',
      onStarActionClick:()=>{}
    }
  ]
};
