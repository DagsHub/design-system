import './user-info.css';
import '../../../styles/root.scss';
import React from 'react';

export interface UserInfoProps{
    imageSource: string,
    fullName:string,
    userName: string
}

export default function UserInfo(props:UserInfoProps) {
    return (
        <div className="user-info">
            <span className="user-image">
                <img src={props.imageSource}></img>
            </span>
            <span className="name-info">
                <span className="full-name">{props.fullName}</span>
                <span className="user-name">{"@"+props.userName}</span>
            </span>
        </div>
    )
}
