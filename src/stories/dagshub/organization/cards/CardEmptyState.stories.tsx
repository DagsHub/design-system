import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import {CardEmptyState,CardEmptyStateProps} from "../../../../components/dagshub/organization/cards/card-empty-state";
import {Button, ButtonStretch, ButtonVariant, Icon} from "../../../../components";

const meta: Meta<CardEmptyStateProps> = {
    title: 'DagsHub/Org/Cards/CardEmptyState',
    component: CardEmptyState
};

export default meta;

const Template: StoryFn<CardEmptyStateProps> = args => <CardEmptyState {...args} />;
export const Repo_card_overview = Template.bind({});
Repo_card_overview.args = {
    width: 596,
    text: "Create a new repo and provide one source of truth for your team with the code, data, models and experiments " +
        "managed in one place",
    button: <Button variant={ButtonVariant.Primary} stretch={ButtonStretch.Slim}
       iconLeft={<Icon width={10.67} height={10.67} fill="#FFFFFF" icon="solid-plus"/>}
       label={"Create new repository"}
    />
};
export const Repo_card_full = Template.bind({});
Repo_card_full.args = {
    width: 1216,
    text: "You haven’t created any repositories for Dagshub yet. \nCreate a new repo and provide one source of truth for " +
        "your team with the code, data, models and experiments managed in one place",
    button: <Button variant={ButtonVariant.Primary} stretch={ButtonStretch.Slim}
                    iconLeft={<Icon width={10.67} height={10.67} fill="#FFFFFF" icon="solid-plus"/>}
                    label={"Create new repository"}
    />
};

export const Team_card_overview = Template.bind({});
Team_card_overview.args = {
    width: 596,
    text: "Create new team so that you can manage permissions and roles for different projects within your organization",
    button: <Button variant={ButtonVariant.Primary} stretch={ButtonStretch.Slim}
                    iconLeft={<Icon width={10.67} height={10.67} fill="#FFFFFF" icon="solid-plus"/>}
                    label={"Create new team"}
    />
};
export const Team_card_full = Template.bind({});
Team_card_full.args = {
    width: 1216,
    text: "Create new team so that you can manage permissions and roles for different projects within your organization",
    button: <Button variant={ButtonVariant.Primary} stretch={ButtonStretch.Slim}
                    iconLeft={<Icon width={10.67} height={10.67} fill="#FFFFFF" icon="solid-plus"/>}
                    label={"Create new team in Dagshub"}
    />
};
//the last card should get the org name as prop
export const Empty_card = Template.bind({});
Empty_card.args = {
    width: 596,
    height: 120
};
