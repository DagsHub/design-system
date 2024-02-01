import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  DeleteOrganizationSettingsTab,
  DeleteOrganizationSettingsTabProps,
} from '../../../../components/dagshub/organization/settings-tabs/delete-organization-tab';

const meta: Meta<DeleteOrganizationSettingsTabProps> = {
  title: 'DagsHub/Org/SettingsTabs/DeleteOrganizationSettingsTab',
  component: DeleteOrganizationSettingsTab,
};

export default meta;

const Template: StoryFn<DeleteOrganizationSettingsTabProps> = (args) => (
  <DeleteOrganizationSettingsTab {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
