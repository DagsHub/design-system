import React from 'react';
import { ProfileImageList } from '../../profiles/profile-image-list';
import { Member } from '../../tables/shared-classes';
import { UserPermissionForTeam } from '../../../../../types';

import '../../../../styles/root.scss';
import './team-card.scss';

export interface TeamCardProps {
  teamName: string;
  teamDescription?: string;
  teamMembers: Member[];
  teamLink: string;
  userPermissionForTeam?: UserPermissionForTeam;
}

export function TeamCard({ teamName, teamDescription, teamMembers, teamLink }: TeamCardProps) {
  return (
    <a href={teamLink}>
      <div className="team-card">
        <div className={'team-card-header'}>
          <a href={teamLink} className="team-card-header__team-name">
            {teamName} Team
          </a>
          <div className={'team-card-header__right-side'}>
            <ProfileImageList userList={teamMembers} maxImages={6} />
            <a className={'view-all'} href={teamLink}>
              View all
            </a>
          </div>
        </div>
        <div className="team-card__team-description">{teamDescription ? teamDescription : ''}</div>
      </div>
    </a>
  );
}
