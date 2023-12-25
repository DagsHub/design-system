import React from 'react';
import classNames from 'classnames';

import './button.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  SecondaryDisabled = 'secondary disabled',
  OutlineSecondary = 'outline-secondary',
  Error = 'error',
  Ghost = 'ghost'
}

export enum ButtonStretch {
  Normal = 'normal',
  Slim = 'slim'
}

export interface ButtonProps {
  variant?: ButtonVariant;
  stretch?: ButtonStretch;
  fullWidth?: boolean;
  label: string;
  disabled?: boolean;
  className?: string;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  width?: number | string;
  counter?: number;
  counterLink?: string;
}

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(
  (
    {
      variant = ButtonVariant.Primary,
      stretch = ButtonStretch.Normal,
      fullWidth = false,
      label,
      disabled = false,
      className = '',
      iconLeft,
      iconRight,
      width,
      counter,
      counterLink,
      ...props
    },
    ref
  ) => {
    const classes = classNames([`dagshub-btn`, variant, stretch, className], {
      fullWidth,
      disabled
    });

    return (
      <button
        ref={ref}
        aria-label={label}
        className={classes}
        disabled={disabled}
        style={{ width: fullWidth ? '100%' : width || 'auto' }}
        {...props}
      >
        <div className="button__content">
          {iconLeft}
          {label}
          {iconRight}
          {!!counter && counter > 0 && counterLink ? (
            <a href={counterLink} className="counter">
              {counter}
            </a>
          ) : (
            !!counter && counter > 0 && <div className="counter">{counter}</div>
          )}
        </div>
      </button>
    );
  }
);
