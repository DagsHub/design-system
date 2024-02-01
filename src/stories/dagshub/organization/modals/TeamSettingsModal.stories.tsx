import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  TeamSettingsModal,
  TeamSettingsModalProps,
} from '../../../../components/dagshub/organization/modals/team-settings-modal';

const meta: Meta<TeamSettingsModalProps> = {
  title: 'DagsHub/Org/Modals/TeamSettingsModal',
  component: TeamSettingsModal,
};

export default meta;

const Template: StoryFn<TeamSettingsModalProps> = (args) => <TeamSettingsModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onClose: () => {},
  teamName: 'Devops',
  teamDescription: 'this is description',
  onDeleteTeam: (args?: any) => {},
  onEditTeam: (args?: any) => {},
  existingTeamNames: ['team-a', 'team-b'],
};
