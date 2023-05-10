import { useDebounce } from 'react-use';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Icon } from '../../../../icons';
import { Member } from '../shared-classes';
import { UserInfo } from '../../profiles/user-info';
import { GenericTable, Row } from '../generic-table';
import { RepoCardProps } from '../../cards/repo-card';
import { RadioButtonItemProps } from '../../../../forms';
import { UserPermissionForTeam } from '../../../../../types';
import { AddMemberModal } from '../../modals/add-member-modal';
import { TeamSettingsModal } from '../../modals/team-settings-modal';
import { RemoveMemberModal } from '../../modals/remove-member-modal';
import { MiniRepoCardsModal } from '../../modals/mini-repo-cards-modal';
import { Button, ButtonStretch, ButtonVariant, Dropdown } from '../../../../elements';

import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import './teams-table.scss';

const createInitialMapState = (arr: any[], initialValue: boolean | string) =>
  arr.reduce((acc: any, user: any) => ({ ...acc, [user.id]: initialValue }), {});

const teamPermissionsOptions: RadioButtonItemProps[] = [
  {
    id: UserPermissionForTeam.AdminAccess,
    label: UserPermissionForTeam.AdminAccess,
    description:
      'members can:\n' +
      '• read from\n' +
      '• push to\n' +
      "• add collaborators to the team's repositories"
  },
  {
    id: UserPermissionForTeam.WriteAccess,
    label: UserPermissionForTeam.WriteAccess,
    description: 'members can:\n' + '• read from\n' + "• push to the team's repositories"
  },
  {
    id: UserPermissionForTeam.ReadAccess,
    label: UserPermissionForTeam.ReadAccess,
    description: 'members can:\n' + '• view\n' + "• clone the team's repositories"
  }
];

export interface TeamTableProps {
  teamId: number | string;
  teamName: string;
  teamDescription?: string;
  teamPermission: UserPermissionForTeam;
  members: Member[];
  numMembers:number;
  teamRepos: RepoCardProps[];
  handleCollapse: (teamId: number | string, shouldFetch:boolean) => Promise<void>;
  style: string;
  isActive: Boolean;
  removeFromTeam: (teamName: string, id: number, name:string) => void;
  addNewTeamMembers: (args?: any) => void;
  onEditTeam: (args: OnEditTeamInput) => void;
  onChangingTeamPermission: (args: OnChangingTeamPermissionInput) => void;
  onDeleteTeam: (args?: any) => void;
  loggedUserId: number;
  loggedUserIsOwner: boolean;
  isLogged: boolean;
  onStarActionClick: (args?: any) => () => Promise<void>;
  copyInvitationAction: (args?: any) => void;
  existingTeamNames:string[];
  addTeamReposLink:string;
}

export interface OnEditTeamInput {
  originalName: string;
  newName: string;
  description: string;
  permission: string;
}

export interface OnChangingTeamPermissionInput {
  originalName: string;
  originalDescription: string;
  permission: string;
}

const MAX_ROWS: number = 7;

export function TeamTable({
  teamId,
  teamName,
  teamDescription,
  members,
  numMembers,
  style,
  isActive,
  handleCollapse,
  teamRepos,
  teamPermission,
  removeFromTeam,
  addNewTeamMembers,
  onChangingTeamPermission,
  onEditTeam,
  onDeleteTeam,
  loggedUserId,
  loggedUserIsOwner,
  isLogged,
  onStarActionClick,
  copyInvitationAction,
  existingTeamNames,
  addTeamReposLink
}: TeamTableProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [debouncedInputText, setDebouncedInputText] = useState<string>('');
  const [displayTeamSettingsModal, setDisplayTeamSettingsModal] = useState<boolean>(false);
  const [displayAddNewTeamMemberModal, setDisplayAddNewTeamMemberModal] = useState<boolean>(false);

  const [displayRemoveMemberFromTeamModal, setDisplayRemoveMemberFromTeamModal] = useState<
    Record<number | string, boolean>
  >(createInitialMapState(members, false));

  const [teamPerm, setTeamPerm] = useState<UserPermissionForTeam>(teamPermission);
  let options = teamPermissionsOptions.map((opt) => ({ ...opt, checked: opt.id === teamPerm }));
  const [_options, setOptions] = useState(options);

  useEffect(() => {
    setTeamPerm(teamPermission);
    setOptions(teamPermissionsOptions.map((opt) => ({ ...opt, checked: opt.id === teamPerm })));
  }, [teamPermission]);

  const [displayMiniCardModal, setDisplayMiniCardModal] = useState<boolean>(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = (userId: number | string) => {
    setDisplayRemoveMemberFromTeamModal({
      ...displayRemoveMemberFromTeamModal,
      [userId]: !displayRemoveMemberFromTeamModal[userId]
    });
  };

  const toggleAddMemberModal = () => setDisplayAddNewTeamMemberModal(!displayAddNewTeamMemberModal);
  const toggleSettingsModal = () => setDisplayTeamSettingsModal(!displayTeamSettingsModal);

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

  const header: Row = {
    columns: [
      <span className="teams-table-left-side-header">
        <span className="teams-table-left-side-header__team-name">{teamName}</span>
        <span className="teams-table-left-side-header__team-description">{teamDescription}</span>
      </span>,
      <span className="teams-table-right-side-header">
        {loggedUserIsOwner && (
          <Button
            className={'ghost-button'}
            width={210}
            onClick={toggleAddMemberModal}
            label="Add new team member"
            stretch={ButtonStretch.Slim}
            variant={ButtonVariant.Ghost}
            iconLeft={<Icon width={10} height={10} fill="#172D32" icon="solid-plus" />}
          />
        )}
        {loggedUserIsOwner && (
          <>
            {displayAddNewTeamMemberModal && (
              <AddMemberModal
                isTeam
                isOrg={false}
                isAdmin={false}
                resultUsers={users}
                inputText={inputText}
                name={teamName}
                onInputChange={onInputChange}
                placeholder="Enter username or email"
                onClose={() => {
                  toggleAddMemberModal();
                  setInputText('');
                }}
                addMembers={async ({ access, team, members, invitees }) => {
                  await addNewTeamMembers({ access, team, members, invitees });
                  toggleAddMemberModal();
                  setInputText('');
                }}
                copyInvitationAction={copyInvitationAction}
              />
            )}
          </>
        )}
        {loggedUserIsOwner && (
          <span
            className="teams-table-right-side-header__dots-vertical-icon"
            onClick={toggleSettingsModal}
          >
            <Icon width={3} height={13} fill="#64748B" icon="outline-dots-vertical" />
          </span>
        )}
        {loggedUserIsOwner && (
          <>
            {displayTeamSettingsModal && (
              <TeamSettingsModal
                teamName={teamName}
                teamDescription={teamDescription}
                userPermissionForTeam={teamPerm}
                onClose={toggleSettingsModal}
                onEditTeam={async ({
                  originalName,
                  newName,
                  description,
                  permission
                }: OnEditTeamInput) => {
                  await onEditTeam({ originalName, newName, description, permission });
                  setTeamPerm(
                    permission === 'admin'
                      ? UserPermissionForTeam.AdminAccess
                      : permission === 'write'
                      ? UserPermissionForTeam.WriteAccess
                      : UserPermissionForTeam.ReadAccess
                  );
                  toggleSettingsModal();
                }}
                onDeleteTeam={async (teamName) => {
                  await onDeleteTeam(teamName);
                  toggleSettingsModal();
                }}
               existingTeamNames={existingTeamNames}/>
            )}
          </>
        )}
      </span>
    ]
  };

  let rows: Row[] = [];
  if (!members?.length) {
    let row: Row = {
      columns: [<span>This team doesn't have any members yet</span>],
      style: { width: '100%' }
    };
    rows.push(row);
  }

  members?.forEach((member, userIndex) => {
    let row: Row = {
      columns: [
        <UserInfo
          imageSource={member.relAvatarLink}
          userName={member.userName}
          homeLink={member.homeLink}
          isLoggedUser={!!member.leaveLink}
        />,
        <>
          {(loggedUserId === member.id || loggedUserIsOwner) && (
            <Button
              width={180}
              variant={ButtonVariant.Secondary}
              label={`${member?.leaveLink ? 'Leave the' : 'Remove from'} team`}
              disabled={loggedUserId != member.id && !loggedUserIsOwner}
              iconRight={<Icon width={12} height={13} fill="#111827" icon="outline-trash" />}
              onClick={() => handleClick(member.id)}
            />
          )}
        </>,
        <>
          {displayRemoveMemberFromTeamModal[member.id] && (
            <RemoveMemberModal
              removeYourself={!!member?.leaveLink}
              username={member.userName}
              orgOrTeamName={teamName}
              onRemove={() => {
                removeFromTeam(teamName, member.id, member.userName);
                handleClick(member.id);
              }}
              onClose={() => handleClick(member.id)}
            />
          )}
        </>
      ],
      style: userIndex >= MAX_ROWS ? { display: style } : {}
    };
    rows.push(row);
  });

  if (numMembers > MAX_ROWS) {
    let row: Row = {
      columns: [
        <span>{isActive ? 'Collapse' : 'See all team members'}</span>,
        <Icon
          width={8}
          height={5}
          fill="#172D32"
          icon={`solid-cheveron-${isActive ? 'up' : 'down'}`}
        />
      ],
      rowClasses: 'table__collapse',
      onClick: () => handleCollapse(teamId, !isActive)
    };
    rows.push(row);
  }

  let footer: Row;
  if ((teamRepos ?? []).length != 0) {
    footer = {
      columns: [
        <span className="teams-table-footer-left-section">
          <span className="teams-table-footer-left-section__permission-text">
            Team has
            <Dropdown
              width={127}
              kind={'radio'}
              optionWidth={342}
              title={'Team’s Access permissions'}
              label={teamPerm}
              options={_options}
              onItemChecked={(permission) => {
                onChangingTeamPermission({
                  originalName: teamName,
                  originalDescription: teamDescription ?? '',
                  permission:
                    permission === 'Write access'
                      ? 'write'
                      : permission === 'Admin access'
                      ? 'admin'
                      : 'read'
                });
                setTeamPerm(permission);
              }}
              initialChecked={teamPerm}
              dropdownBoxColor={'transparent'}
              disabled={!loggedUserIsOwner}
            />
            to following repositories:
          </span>
          <span className="team-repos">
            {teamRepos?.map((repo) => (
              <a href={repo.link} className="team-repos__repo">
                <Icon width={16} height={21} fill="#172D32" icon="outline-repository-github" />
                {repo.name}
              </a>
            ))}
          </span>
           <a style={{textDecoration: "underline", color: "black", display: "flex",
             flexShrink: 0}} href={addTeamReposLink}>Add more repositories</a>
        </span>,
        <span
          className="teams-table-footer-right-section"
          onClick={() => setDisplayMiniCardModal(!displayMiniCardModal)}
        >
          See all teams projects
          <Icon width={9} height={8} fill="#5467DE" icon="outline-arrow-sm-right" />
        </span>,

        <div className={'test'} style={{ display: 'contents!important' }}>
          {displayMiniCardModal && (
            <MiniRepoCardsModal
              teamName={teamName}
              repos={teamRepos}
              isLogged={isLogged}
              onStarActionClick={onStarActionClick}
              onClick={() => setDisplayMiniCardModal(!displayMiniCardModal)}
            />
          )}
        </div>
      ]
    };
  } else {
    footer = {
      columns: [<span>This team doesn't have repositories yet{" "}<a style={{textDecoration: "underline", color: "black"}} href={addTeamReposLink}>Add team repositories</a></span>]
    };
  }

  return <GenericTable header={header} rows={rows} footer={footer} />;
}
