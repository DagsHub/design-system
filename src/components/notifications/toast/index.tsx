import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';

import { Icon } from '../../icons';

import '../../styles/root.scss';
import './toast.scss';

export interface ToastProps {
  type?: 'success' | 'error';
  visible?: boolean;
  className?: string;
  children: React.ReactNode | null;
  autoCloseSeconds?: number | null;
  width?: number | string;
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      type = 'success',
      visible = false,
      className = '',
      children = null,
      autoCloseSeconds = null,
      width = 'initial',
      onClose
    },
    ref
  ) => {
    const autoCloseTimeoutId = useRef<any>(null);
    const isSuccess = type === 'success';
    const classes = classNames([`dagshub-toast`, className]);

    useEffect(
      function onAutoClose() {
        if (autoCloseSeconds && onClose) {
          autoCloseTimeoutId.current = setTimeout(onClose, autoCloseSeconds * 1000);
        }
      },
      [autoCloseSeconds]
    );

    useEffect(
      function onInvisble() {
        if (!visible) {
          clearTimeout(autoCloseTimeoutId.current);
        }
      },
      [visible]
    );

    if (!visible) {
      return null;
    }

    return (
      <div ref={ref} className={classes} style={{ width }}>
        <Icon
          icon={isSuccess ? 'checkmark' : 'solid-exclamation-circle'}
          fill={isSuccess ? 'green' : 'red'}
        />
        <div>{children}</div>
        {onClose && <Icon icon="solid-x" onClick={onClose} fill="#ABADC6" />}
      </div>
    );
  }
);
