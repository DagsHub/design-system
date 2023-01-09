import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import Modal, {ModalProps} from '../../../components/dagshub/organization/modal';

const meta: Meta<typeof Modal> = {
  title: 'DagsHub/Org/Modal',
  component: Modal
};

export default meta;

const Template: StoryFn<ModalProps> = args => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOrg: true,
  isAdmin: true,
  isTeam: false,
  name: 'ORG1'
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
