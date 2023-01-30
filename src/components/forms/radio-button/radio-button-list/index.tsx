import * as React from 'react';
import {RadioButtonItem, RadioButtonItemProps} from "../../../forms/radio-button/radio-button-item";
import "./radio-button-list.scss"

export interface RadioButtonListProps{
    title?:string
    items: JSX.Element[]
}

export function RadioButtonList(props:RadioButtonListProps) {
    return (
        <div className="list">
            {props.title?<p className="title">{props.title}</p>:<></>}
            {props.items?.map((item, columnIndex) =>
                item
            )}
        </div>
    );

}
