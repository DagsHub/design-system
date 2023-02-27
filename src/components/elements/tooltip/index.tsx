import React from 'react';
import Tippy from '@tippyjs/react';

import './tooltip.scss';

export interface TooltipProps {
  content: React.ReactNode | string;
  children?: React.ReactElement<any>;
}

export const Tooltip = ({ content, children }: TooltipProps) => {
  return <Tippy content={content}>{children}</Tippy>;
};
