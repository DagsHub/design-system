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

const getFilesCb = (value: string) => {
  const rndInt = randomIntFromInterval(0, 2);

  // mock api call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = generateRandOption(rndInt);
      resolve(res);
    }, 1000);
  });
};

const onSelect = (id: string | null) => {
  console.log('selected id ', id);
};

export const FileTreeWithFiles = Template.bind({});
FileTreeWithFiles.args = {
  list: [
    {
      label: 'test 1',
      type: 'folder',
      id: '1',
      href: '/'
    },
    {
      label: 'test 2',
      type: 'folder',
      id: '2',
      href: '/'
    }
  ],
  emptyMessage: 'no files here',
  onSelect,
  getFilesCb,
  loading: false
};
