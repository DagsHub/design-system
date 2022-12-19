import type {Meta, StoryFn} from '@storybook/react';
import NavbarLink from '../../components/NavbarLink';

const meta: Meta<typeof NavbarLink> = {
    title: 'DagsHub/Navbar/Link',
    component: NavbarLink,
    tags: ['docsPage'],
    args: {
        href: 'https://m.xkcd.com',
        children: 'xkcd'
    }
};

export default meta;
type Story = StoryFn<typeof NavbarLink>;

export const Primary: Story = (args) => <NavbarLink {...args}/>;
