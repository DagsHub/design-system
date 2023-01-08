import React from 'react';
import classNames from 'classnames';

import './textarea.css';

export interface TextAreaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  helperText?: string;
  errored?: boolean;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  maxWidth?: string;
  textareaMaxWidth?: string;
  onChange?: () => void;
}

export const TextArea = ({
  label = '',
  value = '',
  placeholder = '',
  helperText = '',
  errored = false,
  disabled = false,
  className = '',
  readOnly = false,
  maxWidth = 'initial',
  textareaMaxWidth = 'initial',
  onChange = () => {},
  ...props
}: TextAreaProps) => {
  const classes = classNames([`dagshub-textarea`, className], { errored, disabled });

  return (
    <div className={classes} style={{ maxWidth }}>
      {label && <label>{label}</label>}
      <textarea
        value={value}
        aria-label={label}
        className={classes}
        disabled={disabled}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        style={{ maxWidth: textareaMaxWidth }}
        {...props}
      />
      {helperText && <p className="helper-text">{helperText}</p>}
    </div>
  );
};
