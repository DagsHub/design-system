import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

import './tooltip.scss';

export type TooltipProps = {
  content: React.ReactNode | string;
  children?: React.ReactElement<any>;
} & TippyProps;

export const Tooltip = ({ content, children, ...props }: TooltipProps) => {
  return (
    <Tippy content={content} {...props}>
      {children}
    </Tippy>
  );
};
