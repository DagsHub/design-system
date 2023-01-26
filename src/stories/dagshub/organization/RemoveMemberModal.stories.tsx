import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import RemoveMemberModal, {RemoveMemberModalProps} from '../../../components/dagshub/organization/remove-member-modal';

const meta: Meta<typeof RemoveMemberModal> = {
    title: 'DagsHub/Org/RemoveMemberModal',
    component: RemoveMemberModal
};

export default meta;

const Template: StoryFn<RemoveMemberModalProps> = args => <RemoveMemberModal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    username:"dean",
    org:"Dagshub"
};

