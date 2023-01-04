import type {Meta, StoryFn} from '@storybook/react';
import TeamsTable from '../../components/organization-components/TeamsTable';

const meta: Meta<typeof TeamsTable> = {
    title: 'DagsHub/Org/TeamsTable',
    component: TeamsTable,
    tags: ['docsPage'],
};

export default meta;
type Story = StoryFn<typeof TeamsTable>;

export const Primary: Story = () => <TeamsTable/>;
