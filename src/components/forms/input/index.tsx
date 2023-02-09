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
  width?: number;
  inputMaxWidth?: string;
  onChange?: (arg0?: any) => void;
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
  width,
  inputMaxWidth = 'initial',
  onChange = () => {},
  ...props
}: InputProps) => {
  const classes = classNames([`dagshub-input`, className], { errored, disabled });

  return (
    <div className={classes} style={{ maxWidth: width, width: '100%' }}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        aria-label={label}
        className={classes}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        style={{ maxWidth: width, width: '100%' }}
        {...props}
      />
      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  );
};
