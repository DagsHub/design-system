import './profile-image.scss';
import '../../../styles/root.scss';
import React from 'react';

export interface ProfileImageProps{
    imageSource: string
}

export default function ProfileImage(props:ProfileImageProps) {
    return (
        <div className="user-profile">
            <img src={props.imageSource}></img>
        </div>
    )
}
