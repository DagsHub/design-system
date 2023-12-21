import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { Icon } from '../../icons';

import '../../styles/root.scss';
import './toast.scss';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  visible?: boolean;
  className?: string;
  children: React.ReactNode | null;
  autoCloseSeconds?: number | null;
  width?: number | string;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
  onClose?: () => void;
}

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      type = 'success',
      className = '',
      children = null,
      autoCloseSeconds = null,
      width = 'initial',
      top = 'initial',
      bottom = 25,
      left = 'initial',
      right = 25,
      onClose
    },
    ref
  ) => {
    const autoCloseTimeoutId = useRef<any>(null);
    const isSuccess = type === 'success';
    const isError = type === 'error';
    const classes = classNames([`dagshub-toast`, className]);

    useEffect(function onAutoClose() {
      if (autoCloseSeconds && onClose) {
        autoCloseTimeoutId.current = setTimeout(onClose, autoCloseSeconds * 1000);
      }
    }, []);

    return (
      <div ref={ref} className={classes} style={{ width, top, bottom, left, right }}>
        <Icon
          icon={isSuccess ? 'checkmark' : isError ? 'solid-exclamation-circle': ''}
          fill={isSuccess ? 'green' : isError ? 'red' : 'transparent'}
        />
        <div>{children}</div>
        <Icon icon="solid-x" onClick={onClose} fill="#ABADC6" />
      </div>
    );
  }
);
