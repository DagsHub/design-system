import './horizontal-menu.scss';
import '../../../../styles/root.scss';
import React from 'react';
import {HorizontalMenuTab, HorizontalMenuTabProps} from "../horizontal-menu-tab"

export interface HorizontalMenuProps{
    tabs: HorizontalMenuTabProps[];
}

export function HorizontalMenu(props:HorizontalMenuProps) {
    return (
        <div className={"horizontal-menu"}>
            {props.tabs?.map((tab)=>
                <HorizontalMenuTab text={tab.text} count={tab.count} icon={tab.icon}/>
            )}
        </div>
    )
}
