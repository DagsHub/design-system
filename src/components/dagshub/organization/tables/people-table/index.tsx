import React from 'react';
import { Icon } from '../../../../icons';
import { UserInfo } from '../../profiles/user-info';
import { GenericTable, Row } from '../generic-table';
import { TeamsModal } from '../../modals/teams-modal';
import { TeamCardProps } from '../../cards/team-card';
import { Dropdown } from '../../../../elements/dropdown';
import { RadioButtonItemProps } from '../../../../forms';

import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import './people-table.scss';

export interface PeopleTableProps {
  users: User[];
}

interface User {
  userImage: string;
  username: string;
  userTeams: TeamCardProps[];
  membershipVisibility: MembershipVisibility;
  removeMember?: (args?: any) => void;
  changeMembershipVisibility?: (args?: any) => void;
  toggleTeamsModal: (args?: any) => void;
  displayTeamsModal: boolean;
  userIndex: number;
}

export enum MembershipVisibility {
  Public = 'public',
  Private = 'private'
}

//add functionality, tooltip
//add links?
//change its css to BEM
//add te hover design for the private-public
//add (you) annotation to relevant user

const header: Row = {
  columns: [
    <div className="people-table__header people-table__header--left">Username</div>,
    <div className="people-table__header people-table__header--center">Teams they belong to</div>,
    <div className="people-table__header people-table__header--right">Membership visibility</div>
  ]
};

const membershipVisibilityOptions: RadioButtonItemProps[] = [
  { id: 'public', label: 'Public', description:'User\'s membership is visible to everyone and is displayed on their public profile' },
  { id: 'private', label: 'Private', description:'User\'s membership is only visible to other members of this organization' }
];

export function PeopleTable({ users }: PeopleTableProps) {
  const rows: Row[] = (users || [])?.map((user) => ({
    columns: [
      <UserInfo imageSource={user.userImage} userName={user.username} />,
      <span className="teams-list">
        {(user?.userTeams ?? []).length === 0 && <span>Member doesn’t belong to any team</span>}
        {(user?.userTeams ?? []).slice(0, 2)?.map((team, index) => (
          <span key={team.teamName + index}>
            {!!index && ', '}
            <a href={team.teamLink} className="teams-list__team-name">
              {team.teamName}
            </a>
            <span className="teams-list__team-permission">({team.userPermissionForTeam})</span>
          </span>
        ))}
        {user.userTeams.length > 2 && (
          <>
            <span
              className="teams-list__hidden-teams"
              onClick={() => user.toggleTeamsModal(user.userIndex)}
            >
              +{user.userTeams.length - 2}
            </span>
            <TeamsModal
              display={user.displayTeamsModal}
              onClick={() => user.toggleTeamsModal(user.userIndex)}
              teams={user.userTeams}
              userName={user.username}
            />
          </>
        )}
      </span>,
      <div className="people-table__membership-column">
        <Dropdown
          width={145}
          kind={'radio'}
          optionWidth={281}
          title={"Membership visibility"}
          label={user.membershipVisibility}
          options={membershipVisibilityOptions}
          onItemChecked={user.changeMembershipVisibility}
          alignOptionsToTheRight={true}
          initialChecked={
            membershipVisibilityOptions.find((mv) => mv.label === user.membershipVisibility)?.id ??
            ''
          }
        />
        <Icon
          width={12}
          height={13.33}
          fill="#172D32"
          icon="outline-trash"
          onClick={user.removeMember}
        />
      </div>
    ]
  }));

  return <GenericTable header={header} rows={rows} />;
}
