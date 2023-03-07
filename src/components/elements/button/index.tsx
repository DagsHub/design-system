import React from 'react';
import classNames from 'classnames';

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
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  width?: number;
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
      ...props
    },
    ref
  ) => {
    const classes = classNames([`dagshub-btn`, variant, stretch, className], { fullWidth });

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
        </div>
      </button>
    );
  }
);

// export const Button = ({
//   variant = ButtonVariant.Primary,
//   stretch = ButtonStretch.Normal,
//   fullWidth = false,
//   label,
//   disabled = false,
//   className = '',
//   iconLeft,
//   iconRight,
//   width,
// }: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { ref: React.Ref<HTMLButtonElement> }) => {
//   const classes = classNames([`dagshub-btn`, variant, stretch, className], { fullWidth });

//   const Button = React.forwardRef<HTMLButtonElement, ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
//     <button ref={ref} {...props}>
//       <div className="button__content">
//         {props.iconLeft}
//         {props.label}
//         {props.iconRight}
//       </div>
//     </button>
//   ));

//   return (
//     <Button
//       label={label}
//       aria-label={label}
//       className={classes}
//       disabled={disabled}
//       iconLeft={iconLeft || <></>}
//       iconRight={iconRight || <></>}
//       style={{ width: width || 'auto' }}
//     />
//   );
// };
