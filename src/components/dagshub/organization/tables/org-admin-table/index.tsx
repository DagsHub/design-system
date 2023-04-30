import { useDebounce } from 'react-use';
import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';

import { Icon } from '../../../../icons';
import { Row, GenericTable } from '../generic-table';
import { UserPermissionForTeam } from '../../../../../types';
import { AddMemberModal } from '../../modals/add-member-modal';
import { UserInfo } from '../../../organization/profiles/user-info';
import { RemoveMemberModal } from '../../modals/remove-member-modal';
import { Button, ButtonStretch, ButtonVariant } from '../../../../elements';

import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import './org-admin-table.scss';
import { Tooltip } from '../../../../elements/tooltip';

export interface OrgAdminTableProps {
  admins: User[];
  loggedUserId: number;
  loggedUserIsOwner: boolean;
  orgName: string;
  addMembers: (args?: any) => void;
  copyInvitationAction: (args?: any) => void;
}

interface User {
  id: number;
  orgName: string;
  userImage: string;
  username: string;
  leaveLink?: string;
  removeLink?: string;
  removeMember: (args?: any) => void;
  homeLink?: string;
}

export function OrgAdminTable({
  orgName,
  admins,
  loggedUserId,
  loggedUserIsOwner,
  addMembers,
  copyInvitationAction
}: OrgAdminTableProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [debouncedInputText, setDebouncedInputText] = useState<string>('');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  useDebounce(
    () => {
      setDebouncedInputText(inputText);
    },
    650,
    [inputText]
  );

  const onSearchUsers: () => any = useCallback(async () => {
    const rsp = await fetch(`/api/v1/users/search?q=${inputText}`)
      .then((r) => r.json())
      .catch(console.error);

    setUsers(
      rsp.data.map((user: any) => ({
        userName: user.username,
        imageSource: user.avatar_url
      }))
    );
  }, [debouncedInputText]);

  useEffect(() => {
    onSearchUsers();
  }, [debouncedInputText]);

  let header: Row;
  header = {
    columns: [
      <div className="org-admin-table__header">Organization admins</div>,
      <Button
        className={'ghost-button'}
        label="Add another org admin"
        variant={ButtonVariant.Ghost}
        stretch={ButtonStretch.Slim}
        iconLeft={<Icon width={11} height={11} fill="#172D32" icon="solid-plus" />}
        onClick={() => setDisplayModal(true)}
      />,
      <>
        {displayModal && (
          <AddMemberModal
            isOrg
            isAdmin
            isTeam={false}
            resultUsers={users}
            inputText={inputText}
            name={orgName}
            onInputChange={onInputChange}
            placeholder="Enter username or email"
            onClose={() => {
              setDisplayModal(false);
              setInputText('');
            }}
            addMembers={async ({ access, team, members, invitees }) => {
              await addMembers({ members, invitees });
              setDisplayModal(false);
              setInputText('');
            }}
            copyInvitationAction={copyInvitationAction}
          />
        )}
      </>
    ]
  };

  const createInitialMapState = (arr: any[], initialValue: boolean | string) =>
    arr.reduce((acc: any, user: any) => ({ ...acc, [user.id]: initialValue }), {});
  const [displayRemoveMemberFromTeamModal, setDisplayRemoveMemberFromTeamModal] = useState<
    Record<number | string, boolean>
  >(createInitialMapState(admins, false));
  const handleClick = (userId: number | string) => {
    setDisplayRemoveMemberFromTeamModal({
      ...displayRemoveMemberFromTeamModal,
      [userId]: !displayRemoveMemberFromTeamModal[userId]
    });
  };

  let rows: Row[] = [];

  for (let user of admins) {
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
            <Tooltip content="Admins have full access to all repositories and have admin rights to the organization">
              <span>
                <Icon width={13} height={13} fill="#172D32" icon="outline-information-circle" />
              </span>
            </Tooltip>
          </span>
          {(loggedUserId === user.id || loggedUserIsOwner) && (
            <>
              <Tooltip
                content="Remove from organization's admins and turn into regular member"
                placement={'right-end'}
              >
                <span>
                  <Icon
                    width={12}
                    height={13}
                    fill="#172D32"
                    icon="outline-trash"
                    onClick={() => {
                      handleClick(user.id);
                    }}
                  />
                </span>
              </Tooltip>
              {displayRemoveMemberFromTeamModal[user.id] && (
                <RemoveMemberModal
                  removeYourself={!!user.leaveLink}
                  username={user.username}
                  orgOrTeamName={orgName}
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
