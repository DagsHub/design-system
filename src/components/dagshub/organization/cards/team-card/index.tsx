import React from 'react';
import '../../../../styles/root.scss';
import "./team-card.scss"
import {ProfileImageList} from "../../profiles/profile-image-list";

export interface TeamCardProps {
    teamName:string;
    teamDescription?:string;
    teamMembers:Member[];
    teamLink:string;
}

export interface Member{
    name:string;
    homeLink:string;
    relAvatarLink:string;
}

export function TeamCard({
       teamName,
       teamDescription,
       teamMembers,
       teamLink
   }: TeamCardProps){
    const images:string[]=teamMembers.map(member=>member.relAvatarLink)
    return (
        <div className="team-card">
            <div className={"team-card-header"}>
                <div className="team-card-header__team-name">{teamName} Team</div>
                <div className={"team-card-header__right-side"}>
                    <ProfileImageList imgList={images} maxImages={6}/>
                    <a className={"view-all"} href={teamLink}>View all</a>
                </div>
            </div>
            <div className="team-card__team-description">{teamDescription?teamDescription:""}</div>

        </div>
    );
}
