import React, {MouseEventHandler} from 'react';
import '../../../styles/root.scss';
import './settings-table.scss';

export interface SettingsProps{
    classnames?:string
    title: string;
    elements: JSX.Element[];
}


export default function SettingsTable(props:SettingsProps) {
    return (
        <div className={props.classnames? props.classnames :"settings-table"}>
            {props.title?
                <div className="settings-table__header">
                    {props.title}
                </div>
                :<></>}
            <div className="elements">
                {props.elements?.map((element) =>
                    element
                )}
            </div>
        </div>
    )
}




