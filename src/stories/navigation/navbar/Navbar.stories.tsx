import type { Meta, StoryFn } from '@storybook/react';
import Navbar from '../../../components/navigation/navbar';
import TeamTable from "../../../components/dagshub/organization/teams-table";
import React from "react";

const meta: Meta<typeof Navbar> = {
  title: 'DagsHub/Navbar',
  component: Navbar
};

export default meta;

type Story = StoryFn<typeof TeamTable>;

export const Primary: Story = () => <Navbar/>;
