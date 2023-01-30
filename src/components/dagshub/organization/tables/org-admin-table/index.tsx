import React from 'react';
import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import {UserInfo} from "../../../organization/profiles/user-info";
import { Row, GenericTable } from "../generic-table";
import { Icon } from "../../../../icons";
import { Button, ButtonStretch, ButtonVariant } from "../../../../elements";

export interface OrgAdminTableProps{
  admins:User[];
}

interface User{
  userImage: string,
  fullName: string,
  username: string
}

export enum UserPermissionForTeam {
  AdminAccess = 'Admin access',
  WriteAccess = 'Write access',
  ReadAccess =  'Read access'
}

//add functionality, tooltip
//add links?
//change its css to BEM
//add te hover design for the private-public
//add (you) annotation to relevant user

export function OrgAdminTable(props:OrgAdminTableProps){
  let header:Row;
  header={
    columns: [
      <div className={"header-style left"}>Organization admins</div>,
      <Button variant={ButtonVariant.Ghost} stretch={ButtonStretch.Slim} iconLeft={<Icon width={10.67} height={10.67} fill="#172D32" icon="solid-plus"/>} label={"Add another org admin"}/>
    ]
  }
  let rows: Row[]=[];
  for (let user of props.admins) {
    let row :Row={
      columns: [
        <UserInfo imageSource={user.userImage} fullName={user.fullName} userName={user.username}/>,
        <div className="admin-access-column">
          <span className={"admin-access"}>
            {UserPermissionForTeam.AdminAccess}
            <Icon width={13.33} height={13.33} fill="#172D32" icon="outline-information-circle"/>
          </span>
          <Icon width={12} height={13.33} fill="#172D32" icon="outline-trash"/>
        </div>
      ]
    }
    rows.push(row);
  }
  return <GenericTable header={header} rows={rows}/>
}


