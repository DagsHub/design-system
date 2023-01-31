import './horizontal-menu-tab.scss';
import '../../../../styles/root.scss';
import React from 'react';
import {IconProps} from "../../../../icons";

export interface HorizontalMenuTabProps{
    text: string;
    icon?: React.ReactElement<IconProps>;
    count?: number;
    href?:string;
}

export function HorizontalMenuTab(props:HorizontalMenuTabProps) {
    return (
        <a href={props.href?props.href:""} type="button" className="horizontal-menu-tab">
            {props.icon && <div>{props.icon}</div>}
            {props.text}
            {props.count && <div className={"horizontal-menu-tab__counter"}>{props.count}</div>}
        </a>
    )
}
