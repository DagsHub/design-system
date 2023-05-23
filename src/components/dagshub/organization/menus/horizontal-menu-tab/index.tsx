import React from 'react';
import classNames from 'classnames';
import {Icon, IconProps} from '../../../../icons';

import './horizontal-menu-tab.scss';
import '../../../../styles/root.scss';

export interface HorizontalMenuTabProps {
  text: string;
  iconRight?: React.ReactElement<IconProps> | null;
  icon?: React.ReactElement<IconProps> | null;
  count?: number;
  href?: string;
  checked?: boolean;
  Wrapper?: (args: { children: React.ReactNode }) => JSX.Element;
  onClick?:()=>void;
}

export function HorizontalMenuTab({
  text,
  icon = null,
  iconRight=null,
  count,
  href = undefined,
  checked = false,
  Wrapper = ({ children }) => <>{children}</>,
    onClick,
}: HorizontalMenuTabProps) {
  return React.createElement(
    Wrapper,
    null,
    <a href={href} className={classNames('horizontal-menu-tab', { tab_checked: checked })} onClick={onClick}>
      {icon && <div>{icon}</div>}
      {text}
      {iconRight && <div>{iconRight}</div>}
      {!!count && count > 0 && <div className="horizontal-menu-tab__counter">{count}</div>}
    </a>
  );
}
