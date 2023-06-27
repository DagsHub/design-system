import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';

import './tooltip.scss';

export type TooltipProps = {
  content: React.ReactNode | string;
  interactive?: boolean;
  children?: React.ReactElement<any>;
} & TippyProps;

export const Tooltip = ({ content, interactive, children, ...props }: TooltipProps) => {
  return (
    <Tippy content={content} interactive={interactive} {...props}>
      {children}
    </Tippy>
  );
};
