import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Checkbox, CheckboxProps } from '../../../components/forms/checkbox';

const meta: Meta<CheckboxProps> = {
  title: 'Forms/Checkbox',
  component: Checkbox
};

export default meta;

const Template: StoryFn<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Presentation = () => {
  return (
    <div>
        <Checkbox checked label="Checked!" /> <br />
        <Checkbox indeterminate label="Indeterminate!" /> <br />
        <Checkbox label="Unchecked!" /> <br />
        <Checkbox disabled label="Disabled!" /> <br />
    </div>
  );
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  label: 'Checked!'
};

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
  label: 'Unchecked!'
};

export const InteractiveCheckbox = () => {
    const [checked, setChecked] = React.useState(false);
    return (
        <div>
        <Checkbox checked={checked} onChange={() => setChecked(!checked)} label="Click me!" />
        </div>
    );
}

export const InteractiveDemoWithIndeterminate = () => {
    // The checkbox will be indeterminate when one of the children is checked
    const [selectedItems, setSelectedItems] = React.useState(new Set<number>);
    const NUM_OF_ITEMS = 3;
    const onChange = (id: number) => {
        if (selectedItems.has(id)) {
            setSelectedItems(new Set([...selectedItems].filter((item) => item !== id)));
        } else {
            setSelectedItems(new Set([...selectedItems, id]));
        }
    }

    const selectAll = () => {
        if (selectedItems.size === NUM_OF_ITEMS) {
            setSelectedItems(new Set());
        } else {
            setSelectedItems(new Set(Array.from({ length: NUM_OF_ITEMS }, (_, i) => i + 1)));
        }
    }
    return (
        <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
        <Checkbox
            indeterminate={selectedItems.size > 0 && selectedItems.size < NUM_OF_ITEMS}
            checked={selectedItems.size == NUM_OF_ITEMS}
            onChange={selectAll}
            label="Sellect all" />

            <div style={{ marginLeft: '20px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
                {Array.from({ length: NUM_OF_ITEMS }, (_, i) => i + 1).map((id) => (
                    <Checkbox key={id} checked={selectedItems.has(id)} onChange={() => onChange(id)} label={`Item ${id}`} />
                ))}
            </div>
        </div>
    );
}