import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { FileTree, FileTreeInterface } from '../../../../components';

const meta: Meta<FileTreeInterface> = {
  title: 'Elements/FileTree',
  component: FileTree
};

export default meta;

const Template: StoryFn<FileTreeInterface> = (args) => <FileTree {...args} />;

const getFilesCb = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const res = [
        { id: '3', type: 'folder', label: 'test 3' },
        { id: '3', type: 'folder', label: 'test 4' },
        { id: '3', type: 'folder', label: 'test 5' },
        { id: '3', type: 'folder', label: 'test 6' }
      ];
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
