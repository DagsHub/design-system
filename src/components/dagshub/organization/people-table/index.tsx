import React from 'react';
import '../../../styles/root.scss';
import '../shared-styles/table.scss';
import UserInfo from "../user-info";
import GenericTable, {Row} from "../generic-table";
import {Icon} from "../../../icons";
import {Dropdown} from "../../../elements/dropdown";

export interface PeopleTableProps{
  users:User[];
}

interface User{
  userImage: string,
  fullName: string,
  username: string,
  userTeams: UserTeam[],
  membershipVisibility: MembershipVisibility;
}

export enum MembershipVisibility {
  Public = 'public',
  Private = 'private'
}

export interface UserTeam{
  teamName: string,
  userPermissionForTeam: UserPermissionForTeam; //make enum, admin access, write access, read access
}

enum UserPermissionForTeam {
  AdminAccess = 'Admin access',
  WriteAccess = 'Write access',
  ReadAccess =  'Read access'
}

//add functionality, tooltip
//add links?
//change its css to BEM
//add te hover design for the private-public
//add (you) annotation to relevant user

export default function PeopleTable(props:PeopleTableProps){
  let header:Row;
  header={
    columns: [
      <div className={"header-style left"}>Username</div>,
      <div className={"header-style center"}>Teams they belong to</div>,
      <div className={"header-style right"}>Membership visibility</div>
    ]
  }
  let rows: Row[]=[];
  for (let user of props.users) {
    let row :Row={
      columns: [
        <UserInfo imageSource={user.userImage} fullName={user.fullName} userName={user.username}/>,
        <span className="teams-list">
          {user.userTeams?.map((team, index)=>
              index<=1?
              <span>
                {index?", ":""}
                <span className="team-name">{team.teamName}</span>
                <span className="team-permission">{" ("+team.userPermissionForTeam+") "}</span>
              </span>:<></>
          )}
          {user.userTeams.length>2? <span className="hidden-teams">+{user.userTeams.length-2}</span>:<></>}
        </span>,
        <div className="membership-column">
          <Dropdown width={146} label={user.membershipVisibility}/>
          <Icon width={12} height={13.33} fill="#172D32" icon="outline-trash"/>
        </div>
      ]
    }
    rows.push(row);
  }
  return <GenericTable header={header} rows={rows}/>
}


