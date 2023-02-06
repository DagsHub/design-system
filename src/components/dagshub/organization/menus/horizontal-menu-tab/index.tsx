import './horizontal-menu-tab.scss';
import '../../../../styles/root.scss';
import React from 'react';
import {IconProps} from "../../../../icons";
import classNames from "classnames";

export interface HorizontalMenuTabProps{
    text: string;
    icon?: React.ReactElement<IconProps>;
    count?: number;
    href?:string;
    checked?:boolean;
}

export function HorizontalMenuTab(props:HorizontalMenuTabProps) {
    return (
        <a href={props.href?props.href:undefined} type="button" className={classNames("horizontal-menu-tab ",props.checked?"checked":"")}>
            {props.icon && <div>{props.icon}</div>}
            {props.text}
            {props.count && <div className={"horizontal-menu-tab__counter"}>{props.count}</div>}
        </a>
    )
}
