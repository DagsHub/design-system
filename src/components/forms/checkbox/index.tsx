import React, {useEffect} from 'react';
import classNames from 'classnames';
import { Icon } from '../../icons';
import RemoveIcon from '@mui/icons-material/Remove';

import './checkbox.scss';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (args?: any) => void;
  indeterminate?: boolean
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

  useEffect(() => {
    (ref.current as HTMLInputElement).indeterminate = indeterminate;
    (ref.current as HTMLInputElement).checked = !indeterminate && checked;
  }, [ref, indeterminate])
  return (
    <div className={classes} style={style}>
      <label>
        {
          checked ? <Icon icon="checkmark" fill={'white'} /> :
          indeterminate ? <RemoveIcon sx={{ color: 'white' }} fontSize="small"/> :
          <Icon icon="checkmark" fill={'transparent'} />
        }
        <input
          ref={ref}
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
