import '../../../styles/root.scss';
import React from 'react';
import ProfileImage from "../profile-image"
import "./profile-image-list.scss";

export interface ProfileImageListProps{
    imgList:string[]
    maxImages:number
}

export default function ProfileImageList(props:ProfileImageListProps) {
    return (
        <div className="user-image-list">
            {props.imgList?.map((img,index) =>
                index<props.maxImages ? <ProfileImage imageSource={img} /> : null
            )}
            {props.imgList.length>props.maxImages ? <div className="profile-img-left">
                <span>+{props.imgList.length-props.maxImages} </span>
            </div> :null}
        </div>
    )
}