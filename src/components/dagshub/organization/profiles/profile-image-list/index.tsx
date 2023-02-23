import '../../../../styles/root.scss';
import React from 'react';
import { ProfileImage } from '../profile-image';
import './profile-image-list.scss';
import { Member } from '../../tables/shared-classes';

export interface ProfileImageListProps {
  userList: Member[];
  maxImages: number;
}

export function ProfileImageList(props: ProfileImageListProps) {
  return (
    <div className="user-image-list">
      {props.userList?.map((member, index) =>
        index < props.maxImages ? (
          <ProfileImage imageSource={member.relAvatarLink} homeLink={member.homeLink} />
        ) : null
      )}
      {props.userList.length > props.maxImages ? (
        <div className="user-image-list__img-left">
          <span className="user-image-list__leftover_num">
            +{props.userList.length - props.maxImages}{' '}
          </span>
        </div>
      ) : null}
    </div>
  );
}
