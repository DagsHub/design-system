import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';
import './radio-button-item.scss';

export interface RadioButtonItemProps {
  id: number | string | any;
  label?: string;
  className?: string;
  onChecked?: (arg: number | string) => void;
  description?: string;
  icon?: JSX.Element;
  checked?: boolean;
  width?: number;
  sortDirection?: 'desc' | 'asc' | 'none';
}

export const RadioButtonItem = ({
  id,
  label = '',
  className = '',
  onChecked = () => {},
  description = '',
  checked = false,
  icon,
  width,
  sortDirection = 'none',
}: RadioButtonItemProps) => {
  const classes = classNames([`radio-button-item`, className]);

  return (
    <div className={classes} style={{ width }}>
      <div>
        <label className="radio-button-item__container">
          {label}
          <input type="radio" name="radio" checked={checked} onClick={() => onChecked(id)} />
          <span className="radio-button-item__checkmark" />
          {icon}
        </label>
      </div>
      <div className="radio-button-item__description">{description}</div>
    </div>
  );
};
