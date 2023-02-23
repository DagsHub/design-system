import './user-info.scss';
import '../../../../styles/root.scss';
import React from 'react';

export interface UserInfoProps {
  imageSource: string;
  userName: string;
  fullname?: string;
  isLoggedUser?:boolean;
  homeLink?:string;
}

export function UserInfo(props: UserInfoProps) {
  return (
    <a href={props.homeLink??undefined}className="user-info">
        <div className="user-info__user-image">
            <img src={props.imageSource}></img>
        </div>
        <div className="user-info__name-info">
            <span>@{props.userName} {props.isLoggedUser&&'(you)'}</span>
        </div>
    </a>
  );
}
