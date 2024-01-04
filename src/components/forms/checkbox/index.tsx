import React, { useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from '../../icons';
import RemoveIcon from '@mui/icons-material/Remove';

import './checkbox.scss';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (args?: any) => void;
  indeterminate?: boolean;
  style?: React.CSSProperties;
}

export const Checkbox = ({
  label = '',
  checked = false,
  disabled = false,
  className = '',
  onChange = () => {},
  indeterminate = false,
  style,
  ...props
}: CheckboxProps) => {
  const classes = classNames([`dagshub-checkbox`, className], { checked, disabled, indeterminate });
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <div className={classes} style={style}>
      <label>
        {
          // Checked icon
          checked ? (
            <Icon icon="checkmark" fill={'white'} />
          ) : // indeterminate icon
          indeterminate ? (
            <RemoveIcon sx={{ color: 'white' }} fontSize="small" />
          ) : (
            // Empty icon
            <Icon icon="checkmark" fill={'transparent'} />
          )
        }
        <input
          ref={ref}
          type="checkbox"
          aria-label={label}
          className={classes}
          checked={!indeterminate && checked}
          disabled={disabled}
          onChange={onChange}
          {...props}
        />
      </label>
      {label && <span onClick={onChange}>{label}</span>}
    </div>
  );
};
