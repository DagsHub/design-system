import React from 'react';
import classNames from 'classnames';
import { Icon } from '../../icons';

import './checkbox.css';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: () => void;
}

export const Checkbox = ({
  label = '',
  checked = false,
  disabled = false,
  className = '',
  onChange = () => {},
  ...props
}: CheckboxProps) => {
  const classes = classNames([`dagshub-checkbox`, className], { checked, disabled });

  return (
    <div className={classes}>
      <label>
        <Icon icon="checkmark" />
        <input
          type="checkbox"
          aria-label={label}
          className={classes}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
      </label>
      {label && <span onClick={onChange}>{label}</span>}
    </div>
  );
};
