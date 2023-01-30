import React from 'react';
import '../../../styles/root.scss';
import "./card-empty-state.css"

export interface CardEmptyStateProps{
    text?:string;
    button?: JSX.Element;
    width:number;
    height?:number
}

export function CardEmptyState(props:CardEmptyStateProps){
    return (
        <div className="card-empty-state" style={{width:props.width, whiteSpace: "pre-line", height:props.height}}>
            {props.text?<div className="text">
                {props.text}
            </div>:<></>}
            {props.button? <div className="button">
                {props.button}
            </div>:<></>}
        </div>
    );
}
