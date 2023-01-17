import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import AddMemberModal, {AddMemberModalProps} from '../../../components/dagshub/organization/add-member-modal';

const meta: Meta<typeof AddMemberModal> = {
  title: 'DagsHub/Org/AddMemberModal',
  component: AddMemberModal
};

export default meta;

const Template: StoryFn<AddMemberModalProps> = args => <AddMemberModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOrg: true,
  isAdmin: true,
  isTeam: false,
  name: 'ORG1',
  teams:["team1", "team2"]
};

export const Secondary = Template.bind({});
Secondary.args = {
  isOrg: true,
  isAdmin: false,
  isTeam: false,
  name: 'ORG2'
};
export const Tertiary = Template.bind({});
Tertiary.args = {
  isOrg: false,
  isAdmin: false,
  isTeam: true,
  name: 'TEAM1'
};
