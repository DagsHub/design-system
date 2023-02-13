import React from 'react';
import lowerCase from 'lodash/lowerCase';
import { Icon } from '../../../../icons';
import { UserInfo } from '../../profiles/user-info';
import { GenericTable, Row } from '../generic-table';
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
  userTeams: UserTeam[];
  membershipVisibility: MembershipVisibility;
  removeMember?: (args?: any) => void;
  changeMembershipVisibility?: (args?: any) => void;
}

export enum MembershipVisibility {
  Public = 'public',
  Private = 'private'
}

export interface UserTeam {
  teamName: string;
  userPermissionForTeam: UserPermissionForTeam; //make enum, admin access, write access, read access
  teamLink: string;
}

export enum UserPermissionForTeam {
  AdminAccess = 'Admin access',
  WriteAccess = 'Write access',
  ReadAccess = 'Read access'
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
  { id: 'public', label: 'Public' },
  { id: 'private', label: 'Private' }
];

export function PeopleTable({ users }: PeopleTableProps) {
  const rows: Row[] = users.map((user) => ({
    columns: [
      <UserInfo imageSource={user.userImage} userName={user.username} />,
      <span className="teams-list">
        {(user?.userTeams ?? []).length === 0 && <span>Member doesn’t belong to any team</span>}
        {(user?.userTeams ?? []).slice(0, 2).map((team, index) => (
          <span key={team.teamName + index}>
            {!!index && ', '}
            <a href={team.teamLink} className="teams-list__team-name">
              {team.teamName}
            </a>
            <span className="teams-list__team-permission">({team.userPermissionForTeam})</span>
          </span>
        ))}
        {user.userTeams.length > 2 && (
          <span className="teams-list__hidden-teams">+{user.userTeams.length - 2}</span>
        )}
      </span>,
      <div className="people-table__membership-column">
        <Dropdown
          width={145}
          label={user.membershipVisibility}
          onItemChecked={user.changeMembershipVisibility}
          options={membershipVisibilityOptions}
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
