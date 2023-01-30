import * as React from 'react';
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
