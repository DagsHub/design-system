import './vertical-menu-tab.scss';
import '../../../../styles/root.scss';
import React from 'react';
import classNames from 'classnames';
import { HorizontalMenuTabProps } from '../horizontal-menu-tab';

export interface VerticalMenuTabProps {
  text: string;
  href: string;
  checked: boolean;
  Wrapper?: (args: { children: React.ReactNode }) => JSX.Element;
}

export function VerticalMenuTab({
  text,
  href = '/',
  checked = false,
  Wrapper = ({ children }) => <>{children}</>
}: HorizontalMenuTabProps) {
  return React.createElement(
    Wrapper,
    null,
    <a href={href} className={classNames('vertical-menu-tab', { tab_checked_vertical: checked })}>
      {text}
    </a>
  );
}
