import "./webhook-tab.scss"
import React from 'react';
import '../../../../styles/root.scss';
import {Button} from "../../../../elements";
import {GenericSettingsTab} from "../generic-setting-tab";

export interface WebhooksSettingsTabProps{

}


export function WebhooksSettingsTab(props:WebhooksSettingsTabProps) {
    let elements:JSX.Element[]=[];
    elements.push(
        <div className="webhook-setting-tab">
            <p className="webhook-setting-tab__text">Add webhooks that will be triggered for all repositories under this organization.</p>
            <Button label={"Add webhook"} width={118}/>
        </div>)
    return <GenericSettingsTab title={"Webhooks"} elements={elements}/>
}




