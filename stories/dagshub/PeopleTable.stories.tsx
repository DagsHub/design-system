import type {Meta, StoryFn} from '@storybook/react';
import PeopleTable from '../../components/organization-components/PeopleTable';

const meta: Meta<typeof PeopleTable> = {
    title: 'DagsHub/Org/PeopleTable',
    component: PeopleTable,
    tags: ['docsPage'],
};

export default meta;
type Story = StoryFn<typeof PeopleTable>;

export const Primary: Story = () => <PeopleTable/>;
