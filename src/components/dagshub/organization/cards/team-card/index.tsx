import React from 'react';
import '../../../../styles/root.scss';
import "./team-card.scss"
import {ProfileImageList} from "../../profiles/profile-image-list";

export interface TeamCardProps {
    teamName:string;
    teamDescription?:string;
    teamMembersImages:string[];
    teamLink:string;
}

export function TeamCard({
       teamName,
       teamDescription,
       teamMembersImages,
       teamLink
   }: TeamCardProps){
    return (
        <div className="team-card">
            <div className={"team-card-header"}>
                <div className="team-card-header__team-name">{teamName} Team</div>
                <div className={"team-card-header__right-side"}>
                    <ProfileImageList imgList={teamMembersImages} maxImages={6}/>
                    <a className={"view-all"} href={teamLink}>View all</a>
                </div>
            </div>
            {teamDescription&&<div className="team-card__team-description">{teamDescription}</div>}

        </div>
    );
}
