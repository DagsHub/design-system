import './user-info.scss';
import '../../../../styles/root.scss';
import React from 'react';

export interface UserInfoProps{
    imageSource: string,
    fullName?:string,
    userName: string
}

export function UserInfo(props:UserInfoProps) {
    return (
        <div className="user-info">
            <div className="user-info__user-image">
                <img src={props.imageSource}></img>
            </div>
            <div className="user-info__name-info">
                {props.fullName?<span >{props.fullName}</span>:null}
                <span>{"@"+props.userName}</span>
            </div>
        </div>
    )
}
