import React from 'react';
import classNames from 'classnames';

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
  onClick = () => {}
}: InputProps) => {
  const classes = classNames([`dagshub-input`, className], { errored, disabled });

  return (
    <div className={classes} style={{ maxWidth: rootMaxWidth }}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        aria-label={label}
        className={classes}
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
