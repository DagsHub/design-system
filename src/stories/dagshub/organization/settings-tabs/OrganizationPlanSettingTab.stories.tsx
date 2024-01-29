import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  OrganizationPlanSettingsTab,
  OrganizationPlanSettingsTabProps,
} from '../../../../components/dagshub/organization/settings-tabs/organization-plan-tab';

const meta: Meta<OrganizationPlanSettingsTabProps> = {
  title: 'DagsHub/Org/SettingsTabs/OrganizationPlanSettingsTab',
  component: OrganizationPlanSettingsTab,
};

export default meta;

const Template: StoryFn<OrganizationPlanSettingsTabProps> = (args) => (
  <OrganizationPlanSettingsTab {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  seatsInPlan: 3,
  organizationPlan: 'Team',
  seatsInUse: 2,
  renewDateString: 'Nov 20, 2023',
};
