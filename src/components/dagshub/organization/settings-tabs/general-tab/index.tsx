import "./general-tab.scss"
import React from 'react';
import '../../../../styles/root.scss';
import {Button, ButtonVariant} from "../../../../elements";
import {Icon} from "../../../../icons";
import {Input} from "../../../../forms";
import {GenericSettingsTab} from "../generic-setting-tab";

export interface GeneralSettingsTabProps{
    orgImageSrc:string;
}


export function GeneralSettingsTab(props:GeneralSettingsTabProps) {
    let elements:JSX.Element[]=[];
    elements.push(
    <div className="general-setting-tab">
        <div className="org-image-upload">
            <div className={"org-image-upload__image"}>
                <img src={props.orgImageSrc}></img>
            </div>
            <div className={"org-image-upload__buttons"}>
                <Button variant={ButtonVariant.Secondary} label={"Upload image"} width={149}
                        iconLeft={<Icon icon={"outline-upload"} width={18} height={18} fill={"#111827"}/>}/>
                <Button variant={ButtonVariant.Error} label={"Remove"} width={131}/>
            </div>
        </div>
        <div className="general-setting-tab__form">
            <Input width={622} label={"Organization name"} helperText={"Required"} placeholder={"Input"}/>
            <Input width={622} label={"Organization full name"} placeholder={"Input"}/>
            <Input width={622} label={"Description"} placeholder={"Input"}/>
            <Input width={622} label={"Website"} placeholder={"Input"}/>
            <Input width={622} label={"Location"} placeholder={"Input"}/>
            <Button label={"Update settings"} width={166}/>
        </div>
    </div>)
    return <GenericSettingsTab title={"General"} elements={elements}/>
}




