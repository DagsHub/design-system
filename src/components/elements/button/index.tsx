import React from 'react';
import classNames from 'classnames';

import './button.scss';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Error = 'error',
  Ghost = 'ghost'
}

export enum ButtonStrech {
  Normal = 'normal',
  Slim = 'slim'
}

export interface ButtonProps {
  variant?: ButtonVariant;
  strech?: ButtonStrech;
  fullWidth?: boolean;
  label: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  variant = ButtonVariant.Primary,
  strech = ButtonStrech.Normal,
  fullWidth = false,
  label,
  disabled = false,
  className = '',
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const classes = classNames([`dagshub-btn`, variant, strech, className], { fullWidth });

  return (
    <button type="button" aria-label={label} className={classes} disabled={disabled} {...props}>
      {label}
    </button>
  );
};
