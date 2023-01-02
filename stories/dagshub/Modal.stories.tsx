import type {Meta, StoryFn} from '@storybook/react';
import Modal from '../../components/organization-components/Modal';

const meta: Meta<typeof Modal> = {
    title: 'DagsHub/Org/Modal',
    component: Modal,
    tags: ['docsPage'],
};

export default meta;
type Story = StoryFn<typeof Modal>;

export const Primary: Story = () => <Modal/>;
