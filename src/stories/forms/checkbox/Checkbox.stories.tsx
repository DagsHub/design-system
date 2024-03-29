import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Checkbox, CheckboxProps } from '../../../components/forms/checkbox';

const meta: Meta<CheckboxProps> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
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

export const CheckboxStates = () => {
  const checked = [true, false];
  const disabled = [true, false];
  const indeterminate = [true, false];
  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      {checked.map((checked) => (
        <div
          key={`checked-${checked}`}
          style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}
        >
          {disabled.map((disabled) => {
            if (!checked) {
              return (
                <div
                  key={`disabled-${disabled}`}
                  style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}
                >
                  {indeterminate.map((indeterminate) => (
                    <Checkbox
                      key={`indeterminate-${indeterminate}`}
                      checked={checked}
                      disabled={disabled}
                      indeterminate={indeterminate}
                      label={`${disabled ? 'disabled' : 'enabled'} | ${
                        indeterminate ? 'indeterminate' : 'unchecked'
                      }`}
                      style={{ margin: '8px' }}
                    />
                  ))}
                </div>
              );
            } else {
              return (
                <Checkbox
                  key={`disabled-${disabled}`}
                  checked={checked}
                  disabled={disabled}
                  label={`${disabled ? 'disabled' : 'enabled'} | ${
                    checked ? 'checked' : 'unchecked'
                  }`}
                  style={{ margin: '8px' }}
                />
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export const InteractiveCheckbox = () => {
  const [checked, setChecked] = React.useState(false);
  return (
    <div>
      <Checkbox checked={checked} onChange={() => setChecked(!checked)} label="Click me!" />
    </div>
  );
};

export const InteractiveDemoWithIndeterminate = () => {
  // The checkbox will be indeterminate when one of the children is checked
  const [selectedItems, setSelectedItems] = React.useState(new Set<number>());
  const NUM_OF_ITEMS = 3;
  const onChange = (id: number) => {
    if (selectedItems.has(id)) {
      setSelectedItems(new Set([...selectedItems].filter((item) => item !== id)));
    } else {
      setSelectedItems(new Set([...selectedItems, id]));
    }
  };

  const selectAll = () => {
    if (selectedItems.size === NUM_OF_ITEMS) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(Array.from({ length: NUM_OF_ITEMS }, (_, i) => i + 1)));
    }
  };
  return (
    <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
      <Checkbox
        indeterminate={selectedItems.size > 0 && selectedItems.size < NUM_OF_ITEMS}
        checked={selectedItems.size == NUM_OF_ITEMS}
        onChange={selectAll}
        label="Sellect all"
      />

      <div style={{ marginLeft: '20px', display: 'flex', gap: '8px', flexDirection: 'column' }}>
        {Array.from({ length: NUM_OF_ITEMS }, (_, i) => i + 1).map((id) => (
          <Checkbox
            key={id}
            checked={selectedItems.has(id)}
            onChange={() => onChange(id)}
            label={`Item ${id}`}
          />
        ))}
      </div>
    </div>
  );
};
