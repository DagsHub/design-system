import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

import './tooltip.scss';

export interface TooltipProps {
  content: React.ReactNode | string;
  children?: React.ReactElement<any>;
}

export const Tooltip = ({ content, children, ...props }: TooltipProps & TippyProps) => {
  return (
    <Tippy content={content} {...props}>
      {children}
    </Tippy>
  );
};
