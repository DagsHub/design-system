import React from 'react';
import '../../../../styles/root.scss';
import { GenericModal } from '../generic-modal';
import { RepoCard, RepoCardProps } from '../../cards/repo-card';
import { Button, ButtonVariant } from '../../../../elements';
import {MiniRepoCard} from "../../cards/mini-repo-card";
import {TeamCard, TeamCardProps} from "../../cards/team-card";
import "./teams-modal.scss"

export interface TeamsModalProps {
  userName: string;
  teams: TeamCardProps[];
  display: boolean;
  onClick: () => void;
}

export function TeamsModal(props: TeamsModalProps) {
  let elements: JSX.Element[] = [];
  elements.push(
    <div className={'teams-modal__cards-block'}>
      {props.teams?.map((team) => (
          <TeamCard teamLink={team.teamLink} teamMembers={team.teamMembers.map((team:any)=>(  {userName: team.username,
            homeLink: team.homeLink,
            relAvatarLink: team.userImage}))} teamName={team.teamName} teamDescription={team.teamDescription}/>
      ))}
    </div>
  );
  elements.push(
    <div className={'teams-modal__close-button'}>
      <Button variant={ButtonVariant.Secondary} label={'Close'} width={63} onClick={props.onClick} />
    </div>
  );
  return (
    <GenericModal
      title={props.userName.charAt(0).toUpperCase() + props.userName.slice(1) + "'s teams"}
      elements={elements}
      display={props.display}
      onClick={props.onClick}
    />
  );
}
