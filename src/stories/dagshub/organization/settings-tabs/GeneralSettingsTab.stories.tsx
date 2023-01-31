import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {GeneralSettingsTab, GeneralSettingsTabProps} from "../../../../components/dagshub/organization/settings-tabs/general-tab";

const meta: Meta<GeneralSettingsTabProps> = {
    title: 'DagsHub/Org/SettingsTabs/GeneralSettingsTab',
    component: GeneralSettingsTab
};

export default meta;

const Template: StoryFn<GeneralSettingsTabProps> = args => <GeneralSettingsTab {...args} />;

const imageLink="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH3HZUQ9Uz5qcOaIwRjQi0jdfJVVUIR-hO9Q&usqp=CAU"

export const Primary = Template.bind({});
Primary.args = {
    orgImageSrc:imageLink
};
