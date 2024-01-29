import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DropdownV2 } from '../../../components';
import { RadioButtonItemProps } from '../../../components';

const meta: Meta<typeof DropdownV2> = {
  title: 'Elements/Dropdown',
  component: DropdownV2,
};

export default meta;

const Template: StoryFn<typeof DropdownV2> = (args) => <DropdownV2 {...args} />;

const awsRegions: RadioButtonItemProps[] = [
  {
    id: 'af-south-1',
    label: 'af-south-1 - Africa (Cape Town)',
  },
  {
    id: 'ap-northeast-1',
    label: 'ap-northeast-1 - Asia Pacific (Tokyo)',
  },
  {
    id: 'ap-northeast-2',
    label: 'ap-northeast-2 - Asia Pacific (Seoul)',
  },
  {
    id: 'ap-south-1',
    label: 'ap-south-1 - Asia Pacific (Mumbai)',
  },
  {
    id: 'ap-southeast-1',
    label: 'ap-southeast-1 - Asia Pacific (Singapore)',
  },
  {
    id: 'ap-southeast-2',
    label: 'ap-southeast-2 - Asia Pacific (Sydney)',
  },
  {
    id: 'ca-central-1',
    label: 'ca-central-1 - Canada (Central)',
  },
  {
    id: 'eu-central-1',
    label: 'eu-central-1 - EU (Frankfurt)',
  },
  {
    id: 'eu-north-1',
    label: 'eu-north-1 - EU (Stockholm)',
  },
  {
    id: 'eu-west-1',
    label: 'eu-west-1 - EU (Ireland)',
  },
  {
    id: 'eu-west-2',
    label: 'eu-west-2 - EU (London)',
  },
  {
    id: 'eu-west-3',
    label: 'eu-west-3 - EU (Paris)',
  },
  {
    id: 'sa-east-1',
    label: 'sa-east-1 - South America (São Paulo)',
  },
  {
    id: 'us-east-1',
    label: 'us-east-1 - US East (N. Virginia)',
  },
  {
    id: 'us-east-2',
    label: 'us-east-2 - US East (Ohio)',
  },
  {
    id: 'us-gov-east-1',
    label: 'us-gov-east-1 - US Gov East 1',
  },
  {
    id: 'us-gov-west-1',
    label: 'us-gov-west-1 - US Gov West 1',
  },
  {
    id: 'us-west-1',
    label: 'us-west-1 - US West (N. California)',
  },
  {
    id: 'us-west-2',
    label: 'us-west-2 - US West (Oregon)',
  },
];

export const DropdownV2WithTyping: StoryFn<typeof DropdownV2> = Template.bind({});
DropdownV2WithTyping.args = {
  options: awsRegions,
  initialChecked: undefined,
  errored: false,
  onChange: () => {},
  isReadOnly: false,
  helperText: undefined,
  label: 'Select Region',
};

export const DropdownV2WithTypingMaxSize: StoryFn<typeof DropdownV2> = Template.bind({});
DropdownV2WithTypingMaxSize.args = {
  options: awsRegions,
  initialChecked: undefined,
  errored: false,
  onChange: () => {},
  isReadOnly: false,
  helperText: undefined,
  label: 'Select Region',
  maxWidth: '200px',
};

export const DropdownV2ReadOnly: StoryFn<typeof DropdownV2> = Template.bind({});
DropdownV2ReadOnly.args = {
  options: awsRegions,
  initialChecked: undefined,
  errored: false,
  onChange: () => {},
  isReadOnly: true,
  helperText: undefined,
  label: 'Select Region',
};
