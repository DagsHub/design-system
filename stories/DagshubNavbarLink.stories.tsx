import type {Meta, StoryFn} from '@storybook/react';
import NavbarLink from '../components/NavbarLink';

const meta: Meta<typeof NavbarLink> = {
    title: 'DagsHub/NavbarLink',
    component: NavbarLink,
    args: {
        href: 'https://m.xkcd.com',
        children: 'xkcd'
    }
};

export default meta;
type Story = StoryFn<typeof NavbarLink>;

export const Primary: Story = (args) => <NavbarLink {...args}/>;
