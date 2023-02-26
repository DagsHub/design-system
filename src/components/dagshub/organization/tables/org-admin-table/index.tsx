import React, { useEffect, useState } from 'react';
import { Icon } from '../../../../icons';
import { Row, GenericTable } from '../generic-table';
import { UserPermissionForTeam } from '../../../../../types';
import { UserInfo } from '../../../organization/profiles/user-info';
import { Button, ButtonStretch, ButtonVariant } from '../../../../elements';

import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import './org-admin-table.scss';
import { RemoveMemberModal } from '../../modals/remove-member-modal';
import { AddMemberModal } from '../../modals/add-member-modal';

export interface OrgAdminTableProps {
  admins: User[];
  loggedUserId: number;
  loggedUserIsOwner: boolean;
  orgName: string;
  copyInvitationAction:(args?:any)=>void;
}

interface User {
  id: number;
  userImage: string;
  username: string;
  leaveLink?: string;
  removeLink?: string;
  removeMember: (args?: any) => void;
  homeLink?: string;
}

//add functionality, tooltip
//add links?
//change its css to BEM
//add te hover design for the private-public
//add (you) annotation to relevant user

export function OrgAdminTable(props: OrgAdminTableProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const onInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    const onInputTextChange = async () => {
      const rsp = await fetch(`/api/v1/users/search?q=${inputText}`)
        .then((r) => r.json())
        .catch(console.error);

      setUsers(
        rsp.data.map((user: any) => ({
          userName: user.username,
          imageSource: user.avatar_url
        }))
      );
    };

    onInputTextChange();
  }, [inputText]);
  let header: Row;
  header = {
    columns: [
      <div className={'org-admin-table__header'}>Organization admins</div>,
      <Button
        variant={ButtonVariant.Ghost}
        stretch={ButtonStretch.Slim}
        iconLeft={<Icon width={10.67} height={10.67} fill="#172D32" icon="solid-plus" />}
        label={'Add another org admin'}
        onClick={() => setDisplayModal(true)}
      />,
      <>
        {displayModal && (
          <AddMemberModal
            isOrg={true}
            isAdmin={true}
            isTeam={false}
            resultUsers={users}
            inputText={inputText}
            name={props.orgName}
            onInputChange={onInputChange}
            placeholder="Enter username or email"
            onClose={() => setDisplayModal(false)}
            addMember={({ access, team, users }) => {
              setDisplayModal(false);
            }}
            copyInvitationAction={props.copyInvitationAction}
          />
        )}
      </>
    ]
  };

  const createInitialMapState = (arr: any[], initialValue: boolean | string) =>
    arr.reduce((acc: any, user: any) => ({ ...acc, [user.id]: initialValue }), {});
  const [displayRemoveMemberFromTeamModal, setDisplayRemoveMemberFromTeamModal] = useState<
    Record<number | string, boolean>
  >(createInitialMapState(props.admins, false));
  const handleClick = (userId: number | string) => {
    setDisplayRemoveMemberFromTeamModal({
      ...displayRemoveMemberFromTeamModal,
      [userId]: !displayRemoveMemberFromTeamModal[userId]
    });
  };

  let rows: Row[] = [];
  for (let user of props.admins) {
    let row: Row = {
      columns: [
        <UserInfo
          imageSource={user.userImage}
          userName={user.username}
          homeLink={user.homeLink}
          isLoggedUser={!!user.leaveLink}
        />,
        <div className="admin-access-column">
          <span className={'admin-access-column__access-type'}>
            {UserPermissionForTeam.AdminAccess}
            <Icon width={13.33} height={13.33} fill="#172D32" icon="outline-information-circle" />
          </span>
          {(props.loggedUserId === user.id || props.loggedUserIsOwner) && (
            <>
              <Icon
                width={12}
                height={13.33}
                fill="#172D32"
                icon="outline-trash"
                onClick={() => {
                  handleClick(user.id);
                }}
              />
              {displayRemoveMemberFromTeamModal[user.id] && (
                <RemoveMemberModal
                  removeYourself={!!user.leaveLink}
                  username={user.username}
                  orgOrTeamName={props.orgName}
                  onClose={() => handleClick(user.id)}
                  onRemove={() => {
                    user.removeMember();
                    handleClick(user.id);
                  }}
                />
              )}
            </>
          )}
        </div>
      ]
    };
    rows.push(row);
  }
  return <GenericTable header={header} rows={rows} />;
}
