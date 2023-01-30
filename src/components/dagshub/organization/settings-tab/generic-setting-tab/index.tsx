import React from 'react';
import '../../../../styles/root.scss';
import './generic-setting-tab.scss';

export interface SettingsTabProps{
    classnames?:string
    title: string;
    elements: JSX.Element[];
}


export function SettingsTab(props:SettingsTabProps) {
    return (
        <div className={props.classnames? props.classnames :"settings-table"}>
            {props.title?
                <div className="settings-table__header">
                    {props.title}
                </div>
                :<></>}
            <div className="settings-table__elements">
                {props.elements?.map((element) =>
                    element
                )}
            </div>
        </div>
    )
}




