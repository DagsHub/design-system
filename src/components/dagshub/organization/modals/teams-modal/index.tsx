import React from 'react';
import { GenericModal } from '../generic-modal';
import { Button, ButtonVariant } from '../../../../elements';
import { TeamCard, TeamCardProps } from '../../cards/team-card';

import '../../../../styles/root.scss';
import './teams-modal.scss';

export interface TeamsModalProps {
  userName: string;
  teams: TeamCardProps[];
  display: boolean;
  onClick: () => void;
}

export function TeamsModal({ userName, teams, display, onClick }: TeamsModalProps) {
  let elements: JSX.Element[] = [];
  elements.push(
    <div className="teams-modal__cards-block">
      {teams?.map((team) => (
        <TeamCard
          teamName={team.teamName}
          teamLink={team.teamLink}
          teamDescription={team.teamDescription}
          teamMembers={team.teamMembers.map((team: any) => ({
            userName: team.username,
            homeLink: team.homeLink,
            relAvatarLink: team.userImage
          }))}
        />
      ))}
    </div>
  );
  elements.push(
    <div className={'teams-modal__close-button'}>
      <Button variant={ButtonVariant.Secondary} label={'Close'} width={63} onClick={onClick} />
    </div>
  );
  return (
    <GenericModal
      title={userName.charAt(0).toUpperCase() + userName.slice(1) + "'s teams"}
      elements={elements}
      isVisible={display}
      onClose={onClick}
    />
  );
}
