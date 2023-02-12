import './user-info.scss';
import '../../../../styles/root.scss';
import React from 'react';

export interface UserInfoProps {
  imageSource: string;
  userName: string;
  fullname?: string;
}

export function UserInfo(props: UserInfoProps) {
  return (
    <div className="user-info">
      <div className="user-info__user-image">
        <img src={props.imageSource}></img>
      </div>
      <div className="user-info__name-info">
        <span>{'@' + props.userName}</span>
      </div>
    </div>
  );
}
