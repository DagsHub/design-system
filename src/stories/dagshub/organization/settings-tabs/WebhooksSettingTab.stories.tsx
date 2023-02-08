import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {
  WebhooksSettingsTab,
  WebhooksSettingsTabProps
} from '../../../../components/dagshub/organization/settings-tabs/webhooks-tab';

const meta: Meta<WebhooksSettingsTabProps> = {
  title: 'DagsHub/Org/SettingsTabs/WebhooksSettingsTab',
  component: WebhooksSettingsTab
};

export default meta;

const Template: StoryFn<WebhooksSettingsTabProps> = (args) => <WebhooksSettingsTab {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
