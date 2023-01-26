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
            <div className="user-image">
                <img src={props.imageSource}></img>
            </div>
            <div className="name-info">
                <span className="full-name">{props.fullName}</span>
                <span className="user-name">{"@"+props.userName}</span>
            </div>
        </div>
    )
}
