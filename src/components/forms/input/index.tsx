import React, { useEffect, useRef } from 'react';
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
  rootWidth?: number | string;
  rootMaxWidth?: number | string;
  inputMaxWidth?: number | string;
  onChange?: (arg?: any) => void;
  onClick?: () => void;
  focusInput?: boolean;
  searchIcon?: boolean;
  labelStyle?: React.CSSProperties | undefined;
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
      rootWidth = '100%',
      rootMaxWidth = 'initial',
      inputMaxWidth = 'initial',
      onChange = () => {},
      onClick = () => {},
      focusInput = false,
      searchIcon = false,
      labelStyle
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const classes = classNames([`dagshub-input`, className], { errored, disabled });

    useEffect(
      function onFocus() {
        if (focusInput) {
          inputRef?.current?.focus();
        }
      },
      [focusInput]
    );

    return (
      <div ref={ref} className={classes} style={{ maxWidth: rootMaxWidth, width: rootWidth }}>
        {label && <label style={{ ...labelStyle }}>{label}</label>}
        <div className={'search-icon'}>
          {searchIcon && <Icon width={17} height={17} fill="#172D32" icon="outline-search" />}
        </div>
        <input
          type={type}
          value={value}
          ref={inputRef}
          onClick={onClick}
          aria-label={label}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          style={{ maxWidth: inputMaxWidth, width: '100%' }}
          className={classNames(classes, { search: searchIcon })}
        />
        {helperText && <p className="helper-text">{helperText}</p>}
      </div>
    );
  }
);
