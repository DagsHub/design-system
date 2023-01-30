import React from 'react';
import '../../../../styles/root.scss';
import "./card-empty-state.scss"
import {Button, ButtonStretch, ButtonVariant} from "../../../../elements";
import {Icon} from "../../../../icons";

export interface CardEmptyStateProps{
    text?:string;
    width:number;
    height?:number;
    buttonText?:string;
}

export function CardEmptyState(props:CardEmptyStateProps){
    return (
        <div className="card-empty-state" style={{width:props.width, whiteSpace: "pre-line", height:props.height}}>
            {props.text?<div className="text">
                {props.text}
            </div>:<></>}
            {props.buttonText? <Button variant={ButtonVariant.Primary} stretch={ButtonStretch.Slim}
                                   iconLeft={<Icon width={10.67} height={10.67} fill="#FFFFFF" icon="solid-plus"/>}
                                   label={props.buttonText}
                            />:null}
        </div>
    );
}
