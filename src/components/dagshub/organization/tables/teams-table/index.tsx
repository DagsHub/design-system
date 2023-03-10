import React, { SetStateAction, useEffect, useState } from 'react';
import { Icon } from '../../../../icons';
import { Member } from '../shared-classes';
import { UserInfo } from '../../profiles/user-info';
import { Row, GenericTable } from '../generic-table';
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
  teamRepos: RepoCardProps[];
  handleCollapse: (teamId: number | string) => void;
  style: string;
  isActive: Boolean;
  removeFromTeam: (removeLink?: string) => void;
  addNewTeamMember: (args?: any) => void;
  onEditTeam: (args: OnEditTeamInput) => void;
  onDeleteTeam: (args?: any) => void;
  loggedUserId: number;
  loggedUserIsOwner: boolean;
  isLogged: boolean;
  onStarActionClick: (args?: any) => () => Promise<void>;
  copyInvitationAction: (args?: any) => void;
}

//add functionality, tooltip
//change its css to BEM
//add (you) annotation to relevant user

export interface OnEditTeamInput {
  name: string;
  description: string;
  permission: UserPermissionForTeam;
}

const MAX_ROWS: number = 7;

export function TeamTable({
  teamId,
  teamName,
  teamDescription,
  members,
  style,
  isActive,
  handleCollapse,
  teamRepos,
  teamPermission,
  removeFromTeam,
  addNewTeamMember,
  onEditTeam,
  onDeleteTeam,
  loggedUserId,
  loggedUserIsOwner,
  isLogged,
  onStarActionClick,
  copyInvitationAction
}: TeamTableProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [displayTeamSettingsModal, setDisplayTeamSettingsModal] = useState<boolean>(false);
  const [displayAddNewTeamMemberModal, setDisplayAddNewTeamMemberModal] = useState<boolean>(false);

  const [displayRemoveMemberFromTeamModal, setDisplayRemoveMemberFromTeamModal] = useState<
    Record<number | string, boolean>
  >(createInitialMapState(members, false));

  const [teamPerm, setTeamPerm] = useState<UserPermissionForTeam>(teamPermission);
  const _options = teamPermissionsOptions.map((opt) => ({ ...opt, checked: opt.id === teamPerm }));

  const [displayMiniCardModal, setDisplayMiniCardModal] = useState<boolean>(false);

  const onInputChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputText(e.target.value);
  };

  const handleClick = (userId: number | string) => {
    setDisplayRemoveMemberFromTeamModal({
      ...displayRemoveMemberFromTeamModal,
      [userId]: !displayRemoveMemberFromTeamModal[userId]
    });
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

  const header: Row = {
    columns: [
      <span className="teams-table-left-side-header">
        <span className="teams-table-left-side-header__team-name">{teamName} TEAM</span>
        <span className="teams-table-left-side-header__team-description">{teamDescription}</span>
      </span>,
      <span className="teams-table-right-side-header">
        {loggedUserIsOwner && (
          <Button
            width={210}
            onClick={() => {
              setDisplayAddNewTeamMemberModal(!displayAddNewTeamMemberModal);
            }}
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
                isOrg={false}
                isAdmin={false}
                isTeam={true}
                resultUsers={users}
                inputText={inputText}
                name={teamName}
                onInputChange={onInputChange}
                placeholder="Enter username or email"
                onClose={() => setDisplayAddNewTeamMemberModal(!displayAddNewTeamMemberModal)}
                addMember={({ access, team, users }) => {
                  addNewTeamMember({ access, team, users });
                  setDisplayAddNewTeamMemberModal(!displayAddNewTeamMemberModal);
                }}
                copyInvitationAction={copyInvitationAction}
              />
            )}
          </>
        )}
        {loggedUserIsOwner && (
          <span
            className="teams-table-right-side-header__dots-vertical-icon"
            onClick={() => {
              setDisplayTeamSettingsModal(!displayTeamSettingsModal);
            }}
          >
            <Icon width={3} height={13} fill="#64748B" icon="outline-dots-vertical" />
          </span>
        )}
        {loggedUserIsOwner && (
          <>
            {displayTeamSettingsModal && (
              <TeamSettingsModal
                teamId={teamId}
                teamName={teamName}
                teamDescription={teamDescription}
                userPermissionForTeam={teamPerm}
                onClose={() => setDisplayTeamSettingsModal(false)}
                onEditTeam={({ name, description, permission }: OnEditTeamInput) => {
                  onEditTeam({ name, description, permission });
                  setDisplayTeamSettingsModal(false);
                }}
                onDeleteTeam={(id: number | string) => {
                  onDeleteTeam(id);
                  setDisplayTeamSettingsModal(false);
                }}
              />
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
                removeFromTeam(member?.leaveLink ?? member?.removeLink);
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

  if ((members ?? []).length > MAX_ROWS) {
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
      onClick: () => handleCollapse(teamId)
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
              onItemChecked={setTeamPerm}
              initialChecked={teamPermission}
              dropdownBoxColor={'transparent'}
              disabled={!loggedUserIsOwner}
            />
            to following repositories:
          </span>
          <span className="team-repos">
            {teamRepos?.map((repo) => (
              <a href={repo.repoNameHref} className="team-repos__repo">
                <Icon width={16} height={21} fill="#172D32" icon="outline-repository-github" />
                {repo.name}
              </a>
            ))}
          </span>
        </span>,

        <span
          className="teams-table-footer-right-section"
          onClick={() => setDisplayMiniCardModal(!displayMiniCardModal)}
        >
          See all teams projects
          <Icon width={9} height={8} fill="#5467DE" icon="outline-arrow-sm-right" />
        </span>,

        <>
          {displayMiniCardModal && (
            <MiniRepoCardsModal
              teamName={teamName}
              repos={teamRepos}
              isLogged={isLogged}
              onStarActionClick={onStarActionClick}
              onClick={() => setDisplayMiniCardModal(!displayMiniCardModal)}
            />
          )}
        </>
      ]
    };
  } else {
    footer = {
      columns: [<span>This team doesn't have repositories yet</span>]
    };
  }

  return <GenericTable header={header} rows={rows} footer={footer} />;
}
