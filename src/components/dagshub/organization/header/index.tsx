import './header.scss';
import '../../../styles/root.scss';
import React from 'react';
import {Icon} from "../../../icons";

export interface HeaderProps{
    orgImageSource: string;
    orgName:string;
    orgSite?:string;
    orgPlan:string;
}

export function Header(props:HeaderProps) {
    console.log("orgSite",props.orgSite)
    return (
        <div className="organization-header">
            <div className="organization-header__org-image">
                <img src={props.orgImageSource}></img>
            </div>
            <div className="org-info">
                <div className={"org-upper-info"}>
                    <span className={"org-upper-info__name"}>{props.orgName}</span>
                    <span className={"org-upper-info__plan"}>{props.orgPlan}</span>
                </div>
                {props.orgSite&&<div className={"org-info__org-site"}>
                    <Icon icon={"outline-link"} width={18} height={18} fill={"#64748B"}/>
                    <a href={props.orgSite}>{props.orgSite}</a>
                </div>}
            </div>
        </div>
    )
}
