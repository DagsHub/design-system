import React from 'react';
import classNames from 'classnames';

import './input.scss';
import { Icon } from '../../icons';

export interface InputProps {
  type?: 'text' | 'password';
  label?: string;
  value?: string;
  placeholder?: string;
  helperText?: string;
  errored?: boolean;
  disabled?: boolean;
  className?: string;
  rootMaxWidth?: number | string;
  inputMaxWidth?: number | string;
  onChange?: (arg?: any) => void;
  onClick?: () => void;
  searchIcon?: boolean;
}

export const Input = ({
  type = 'text',
  label = '',
  value = '',
  placeholder = '',
  helperText = '',
  errored = false,
  disabled = false,
  className = '',
  rootMaxWidth = 'initial',
  inputMaxWidth = 'initial',
  onChange = () => {},
  onClick = () => {},
  searchIcon = false
}: InputProps) => {
  const classes = classNames([`dagshub-input`, className], { errored, disabled });

  return (
    <div className={classes} style={{ maxWidth: rootMaxWidth }}>
      {label && <label>{label}</label>}
      <div className={'search-icon'}>
        {searchIcon && <Icon width={16.67} height={16.67} fill={'#172D32'} icon="outline-search" />}
      </div>
      <input
        type={type}
        value={value}
        aria-label={label}
        className={classNames(classes, { search: searchIcon })}
        disabled={disabled}
        onChange={onChange}
        onClick={onClick}
        placeholder={placeholder}
        style={{ maxWidth: inputMaxWidth, width: '100%' }}
      />
      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  );
};
