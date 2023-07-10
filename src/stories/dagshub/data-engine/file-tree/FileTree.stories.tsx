import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { FileTree, FileTreeInterface } from '../../../../components';

const meta: Meta<FileTreeInterface> = {
  title: 'Elements/FileTree',
  component: FileTree
};

const options = ['folder', 'bucket'];

export default meta;

const Template: StoryFn<FileTreeInterface> = (args) => <FileTree {...args} />;

function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let counter = 2;

const generateRandOption = (l: number) => {
  return Array.from({ length: l }, (_, i) => {
    counter = counter + 1;
    const type = randomIntFromInterval(1, 2);
    return { id: counter, type: options[type - 1], label: `item ${counter}` };
  });
};

// const cache: { [index: number]: any } = {};

const getFilesCb = (value: string) => {
  const rndInt = randomIntFromInterval(0, 6);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = generateRandOption(rndInt);
      resolve(res);
    }, 1000);
  });
};

export const FileTreeWithFiles = Template.bind({});
FileTreeWithFiles.args = {
  list: [
    {
      label: 'test 1',
      type: 'folder',
      id: '1'
    },
    {
      label: 'test 2',
      type: 'folder',
      id: '2'
    }
  ],
  getFilesCb,
  loading: false,
  error: false
};