import './vertical-menu.scss';
import '../../../styles/root.scss';
import React from 'react';
import VerticalMenuTab, {VerticalMenuTabProps} from "../vertical-menu-tab/index"

export interface VerticalMenuProps{
    title?: string;
    tabs: VerticalMenuTabProps[];
}

export default function VerticalMenu(props:VerticalMenuProps) {
    return (
        <div className="vertical-menu">
            {props.title?<p className={"menu-title"}>{props.title}</p>:null}
            <div className={"tabs"}>
                {props.tabs?.map((tab)=>
                    <VerticalMenuTab text={tab.text}/>
                )}
            </div>
        </div>
    )
}
