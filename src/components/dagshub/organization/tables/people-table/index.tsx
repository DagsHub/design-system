import React from 'react';
import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import { UserInfo } from '../../profiles/user-info';
import { GenericTable, Row } from '../generic-table';
import { Icon } from '../../../../icons';
import { Dropdown } from '../../../../elements/dropdown';
import './people-table.scss';

export interface PeopleTableProps {
  users: User[];
}

interface User {
  userImage: string;
  username: string;
  userTeams: UserTeam[];
  membershipVisibility: MembershipVisibility;
}

export enum MembershipVisibility {
  Public = 'public',
  Private = 'private'
}

export interface UserTeam {
  teamName: string;
  userPermissionForTeam: UserPermissionForTeam; //make enum, admin access, write access, read access
  teamLink:string;
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

export function PeopleTable(props: PeopleTableProps) {
  let header: Row;
  header = {
    columns: [
      <div className="people-table__header people-table__header--left">Username</div>,
      <div className="people-table__header people-table__header--center">Teams they belong to</div>,
      <div className="people-table__header people-table__header--right">Membership visibility</div>
    ]
  };
  let rows: Row[] = [];
  for (let user of props.users) {
    let row: Row = {
      columns: [
        <UserInfo imageSource={user.userImage} userName={user.username} />,
        <span className="teams-list">
          {(user?.userTeams ?? []).slice(0, 2).map((team, index) => (
            <span>
              {index ? ', ' : ''}
              <a href={team.teamLink} className="teams-list__team-name">{team.teamName}</a>
              <span className="teams-list__team-permission">({team.userPermissionForTeam})</span>
            </span>
          ))}
          {user.userTeams.length > 2 && (
            <span className="teams-list__hidden-teams">+{user.userTeams.length - 2}</span>
          )}
        </span>,
        <div className="people-table__membership-column">
          <Dropdown width={146} label={user.membershipVisibility} />
          <Icon width={12} height={13.33} fill="#172D32" icon="outline-trash" />
        </div>
      ]
    };
    rows.push(row);
  }
  return <GenericTable header={header} rows={rows} />;
}
