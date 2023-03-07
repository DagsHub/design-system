import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '../../icons';

import './checkbox.scss';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: () => void;
  style?: React.CSSProperties;
}

export const Checkbox = ({
  label = '',
  checked = false,
  disabled = false,
  className = '',
  onChange = () => {},
  style,
  ...props
}: CheckboxProps) => {
  const classes = classNames([`dagshub-checkbox`, className], { checked, disabled });
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  return (
    <div className={classes} style={style}>
      <label>
        <Icon icon="checkmark" fill={checked ? 'white' : 'transparent'} />
        <input
          type="checkbox"
          aria-label={label}
          className={classes}
          checked={isChecked}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
      </label>
      {label && <span onClick={onChange}>{label}</span>}
    </div>
  );
};
