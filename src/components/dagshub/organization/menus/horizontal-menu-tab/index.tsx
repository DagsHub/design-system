
import React from 'react';
import classNames from "classnames";
import {IconProps} from "../../../../icons";

import './horizontal-menu-tab.scss';
import '../../../../styles/root.scss';

export interface HorizontalMenuTabProps{
    text: string;
    icon?: React.ReactElement<IconProps> | null;
    count?: number;
    href?: string;
    checked?: boolean;
    Wrapper?: (args: { children: React.ReactNode }) => JSX.Element;
}

export function HorizontalMenuTab({
    text,
    icon = null, 
    count,
    href = '/',
    checked = false,
    Wrapper = ({ children }) => <>{children}</>,
}: HorizontalMenuTabProps) {
    return React.createElement(Wrapper, null, (
        <a href={href} className={classNames("horizontal-menu-tab", { tab_checked: checked })}>
            {icon && <div>{icon}</div>}
            {text}
            {count && <div className="horizontal-menu-tab__counter">{count}</div>}
        </a>
    ));
}
