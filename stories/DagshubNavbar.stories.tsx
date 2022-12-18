import type {Meta, StoryFn} from '@storybook/react';
import Navbar from '../components/Navbar';

const meta: Meta<typeof Navbar> = {
    title: 'DagsHub/Navbar',
    component: Navbar,
    tags: ['docsPage'],
}

export default meta;
type Story = StoryFn<typeof Navbar>;

export const Primary: Story = (args) => <Navbar {...args}/>;
