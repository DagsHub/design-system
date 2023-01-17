import React from 'react';
import classNames from 'classnames';
import './button.css';
import './button.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
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
  onClick?: () => void;
  iconLeft?:JSX.Element;
  iconRight?:JSX.Element;
  width?:number;
}

export const Button = ({
  variant = ButtonVariant.Primary,
  stretch = ButtonStretch.Normal,
  fullWidth = false,
  label,
  disabled = false,
  className = '',
  iconLeft,
  iconRight,
  width,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = classNames([`dagshub-btn`, variant, stretch, className], { fullWidth });

  return (
    <button type="button" style={{minWidth:width}} aria-label={label} className={classes} disabled={disabled} {...props}>
      <div className="button__content">
        {iconLeft?iconLeft:<></>}
        {label}
        {iconRight?iconRight:<></>}
      </div>
    </button>
  );
};
