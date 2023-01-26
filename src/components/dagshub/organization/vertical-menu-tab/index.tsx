import './vertical-menu-tab.scss';
import '../../../styles/root.scss';
import React from 'react';

export interface VerticalMenuTabProps{
    text: string
}

export default function VerticalMenuTab(props:VerticalMenuTabProps) {
    return (
        <button type="button" className="vertical-menu-tab">
            {props.text}
        </button>
    )
}
