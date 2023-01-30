import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {TeamSettingsModal, TeamSettingsModalProps} from '../../../components';

const meta: Meta<typeof TeamSettingsModal> = {
    title: 'DagsHub/Org/TeamSettingsModal',
    component: TeamSettingsModal
};

export default meta;

const Template: StoryFn<TeamSettingsModalProps> = args => <TeamSettingsModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

