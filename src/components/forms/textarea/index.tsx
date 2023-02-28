import React from 'react';
import classNames from 'classnames';

import './textarea.scss';

export interface TextAreaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  helperText?: string;
  errored?: boolean;
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  maxWidth?: string | number;
  textareaMaxWidth?: string | number;
  onChange?: () => void;
}

export const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>(
  (
    {
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
    },
    ref
  ) => {
    const classes = classNames([`dagshub-textarea`, className], { errored, disabled });

    return (
      <div ref={ref} className={classes} style={{ maxWidth }}>
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
  }
);
