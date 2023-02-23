import './profile-image.scss';
import '../../../../styles/root.scss';
import React from 'react';

export interface ProfileImageProps {
  imageSource: string;
  homeLink: string;
}

export function ProfileImage(props: ProfileImageProps) {
  return (
    <a className="user-profile" href={props.homeLink}>
      <img src={props.imageSource}></img>
    </a>
  );
}
