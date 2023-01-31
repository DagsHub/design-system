import React from 'react';
import { IconProps } from "../../../../icons";

import './horizontal-menu-tab.scss';
import '../../../../styles/root.scss';
export interface HorizontalMenuTabProps{
    text: string;
    icon?: React.ReactElement<IconProps>;
    count?: number;
}

export function HorizontalMenuTab({ text, icon, count } :HorizontalMenuTabProps) {
    return (
        <button type="button" className="horizontal-menu-tab">
            {icon && <div>{icon}</div>}
            {text}
            {count && <div className={"horizontal-menu-tab__counter"}>{count}</div>}
        </button>
    )
}
