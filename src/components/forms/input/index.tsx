import React from 'react';
import classNames from 'classnames';

import { Icon } from '../../icons';

import './input.scss';

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

export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  (
    {
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
    },
    ref
  ) => {
    const classes = classNames([`dagshub-input`, className], { errored, disabled });

    return (
      <div ref={ref} className={classes} style={{ maxWidth: rootMaxWidth }}>
        {label && <label>{label}</label>}
        <div className={'search-icon'}>
          {searchIcon && (
            <Icon width={16.67} height={16.67} fill={'#172D32'} icon="outline-search" />
          )}
        </div>
        <input
          type={type}
          value={value}
          aria-label={label}
          disabled={disabled}
          onChange={onChange}
          onClick={onClick}
          placeholder={placeholder}
          style={{ maxWidth: inputMaxWidth, width: '100%' }}
          className={classNames(classes, { search: searchIcon })}
        />
        {helperText && <p className="helper-text">{helperText}</p>}
      </div>
    );
  }
);
