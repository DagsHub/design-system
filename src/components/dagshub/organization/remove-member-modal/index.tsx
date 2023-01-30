import React from 'react';
import '../../../styles/root.scss';
import { GenericModal } from "../generic-modal";
import {Button, ButtonVariant} from "../../../elements";

export interface RemoveMemberModalProps{
    username: string;
    org:string;
}

export function RemoveMemberModal(props:RemoveMemberModalProps){
    let elements:JSX.Element[];
    elements=[
        <div className="remove-text">
            Are you sure you want to remove <span className="username">@{props.username}</span> from {props.org}?
        </div>,
        <div className="remove-member-modal__buttons">
            <Button variant={ButtonVariant.Error} label={"Remove member"} width={143}/>
            <Button variant={ButtonVariant.Primary} label={"Cancel"} width={95}/>
        </div>
    ]
    return <GenericModal title={"Remove member"} elements={elements}/>
}

