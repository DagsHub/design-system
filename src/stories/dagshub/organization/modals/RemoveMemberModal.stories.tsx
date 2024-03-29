import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  RemoveMemberModal,
  RemoveMemberModalProps,
} from '../../../../components/dagshub/organization/modals/remove-member-modal';

const meta: Meta<RemoveMemberModalProps> = {
  title: 'DagsHub/Org/Modals/RemoveMemberModal',
  component: RemoveMemberModal,
};

export default meta;

const Template: StoryFn<RemoveMemberModalProps> = (args) => <RemoveMemberModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  username: 'dean',
  orgOrTeamName: 'orgname',
  onClose: () => {},
  onRemove: () => {},
  removeYourself: true,
};

export const Secondary = Template.bind({});
Secondary.args = {
  username: 'guy',
  orgOrTeamName: 'orgname',
  onClose: () => {},
  onRemove: () => {},
  removeYourself: false,
};
