import * as React from 'react';
import {RadioButtonItem, RadioButtonItemProps} from "../../../forms/radio-button-item";

export interface RadioButtonListProps{
    title?:string
    items: JSX.Element[]
}

export default function RadioButtonList(props:RadioButtonListProps) {
    return (
        <div className="list">
            {props.title?<p className="title">{props.title}</p>:<></>}
            {props.items?.map((item, columnIndex) =>
                item
            )}
        </div>
    );

}
