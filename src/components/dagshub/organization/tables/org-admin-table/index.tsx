import React from 'react';
import { Icon } from '../../../../icons';
import { Row, GenericTable } from '../generic-table';
import { UserPermissionForTeam } from '../shared-classes';
import { UserInfo } from '../../../organization/profiles/user-info';
import { Button, ButtonStretch, ButtonVariant } from '../../../../elements';

import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import './org-admin-table.scss';

export interface OrgAdminTableProps {
  admins: User[];
}

interface User {
  userImage: string;
  username: string;
}

//add functionality, tooltip
//add links?
//change its css to BEM
//add te hover design for the private-public
//add (you) annotation to relevant user

export function OrgAdminTable(props: OrgAdminTableProps) {
  let header: Row;
  header = {
    columns: [
      <div className={'org-admin-table__header'}>Organization admins</div>,
      <Button
        variant={ButtonVariant.Ghost}
        stretch={ButtonStretch.Slim}
        iconLeft={<Icon width={10.67} height={10.67} fill="#172D32" icon="solid-plus" />}
        label={'Add another org admin'}
      />
    ]
  };
  let rows: Row[] = [];
  for (let user of props.admins) {
    let row: Row = {
      columns: [
        <UserInfo imageSource={user.userImage} userName={user.username} />,
        <div className="admin-access-column">
          <span className={'admin-access-column__access-type'}>
            {UserPermissionForTeam.AdminAccess}
            <Icon width={13.33} height={13.33} fill="#172D32" icon="outline-information-circle" />
          </span>
          <Icon width={12} height={13.33} fill="#172D32" icon="outline-trash" />
        </div>
      ]
    };
    rows.push(row);
  }
  return <GenericTable header={header} rows={rows} />;
}
