import type { Meta, StoryFn } from '@storybook/react';
import Navbar from '../../../components/navigation/navbar';
import TeamTable from "../../../components/dagshub/organization/teams-table";
import React from "react";

const meta: Meta<typeof Navbar> = {
<<<<<<< HEAD
  title: 'DagsHub/Navbar',
  component: Navbar
=======
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['docsPage']
>>>>>>> 4c6ab72e4da462af2feb394503129db572a3c322
};

export default meta;

type Story = StoryFn<typeof TeamTable>;

export const Primary: Story = () => <Navbar/>;
