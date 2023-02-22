import React, {SetStateAction, useEffect, useState} from 'react';
import { Icon } from '../../../../icons';
import { UserInfo } from '../../profiles/user-info';
import { Row, GenericTable } from '../generic-table';
import { RepoCardProps } from '../../cards/repo-card';
import { Member } from '../shared-classes';
import { UserPermissionForTeam } from '../../../../../types';
import { MiniRepoCardsModal } from '../../modals/mini-repo-cards-modal';
import {Button, ButtonStretch, ButtonVariant, Dropdown} from '../../../../elements';

import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import './teams-table.scss';
import {RadioButtonItemProps} from "../../../../forms";
import {AddMemberModal} from "../../modals/add-member-modal";
import {TeamSettingsModal} from "../../modals/team-settings-modal";
import {RemoveMemberModal} from "../../modals/remove-member-modal";

export interface TeamTableProps {
  teamId: number | string;
  teamName: string;
  teamDescription?: string;
  teamPermission: UserPermissionForTeam;
  members?: Member[];
  teamRepos: RepoCardProps[];
  handleCollapse: (teamId: number | string) => void;
  style: string;
  isActive: Boolean;
  removeFromTeam: (removeLink?: string) => void;
  addNewTeamMember: (args?: any) => void;
  loggedUserId:number;
  loggedUserIsOwner:number;
}

//add functionality, tooltip
//change its css to BEM
//add (you) annotation to relevant user

const MAX_ROWS = 7;
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
  loggedUserId,
  loggedUserIsOwner,
}: TeamTableProps) {
  let header: Row;
  const [displayAddNewTeamMemberModal, setDisplayAddNewTeamMemberModal]= useState<boolean>(false)
  const [users, setUsers] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>('');

  const onInputChange = (e: { target: { value: SetStateAction<string> } }) => {
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

  const [displayTeamSettingsModal, setDisplayTeamSettingsModal]= useState<boolean>(false)

  header = {
    columns: [
      <span className="teams-table-left-side-header">
        <span className="teams-table-left-side-header__team-name">{teamName} TEAM</span>
        <span className="teams-table-left-side-header__team-description">{teamDescription}</span>
      </span>,
      <span className="teams-table-right-side-header">
        <Button
          width={210}
          onClick={()=>{setDisplayAddNewTeamMemberModal(!displayAddNewTeamMemberModal)}}
          label="Add new team member"
          stretch={ButtonStretch.Slim}
          variant={ButtonVariant.Ghost}
          iconLeft={<Icon width={10} height={10} fill="#172D32" icon="solid-plus" />}
        />
        <>{displayAddNewTeamMemberModal&&<AddMemberModal
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
              addNewTeamMember();
              setDisplayAddNewTeamMemberModal(!displayAddNewTeamMemberModal);
            }}
        />}</>
        <span className="teams-table-right-side-header__dots-vertical-icon"
              onClick={()=>{setDisplayTeamSettingsModal(!displayTeamSettingsModal)}}
        >
          <Icon width={3} height={13} fill="#64748B" icon="outline-dots-vertical" />
        </span>
        <>{displayTeamSettingsModal&&<TeamSettingsModal
            teamName={teamName}
            teamDescription={teamDescription}
            onClick={() => setDisplayTeamSettingsModal(!displayTeamSettingsModal)}
        />}</>
      </span>
    ]
  };

  const [displayRemoveMemberFromTeamModal, setDisplayRemoveMemberFromTeamModal]= useState<boolean>(false)

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
        <UserInfo imageSource={member.relAvatarLink} userName={member.userName} />,
        <Button
          width={180}
          variant={ButtonVariant.Secondary}
          label={`${member?.leaveLink ? 'Leave the' : 'Remove from'} team`}
          disabled={loggedUserId!=member.id&&!loggedUserIsOwner}
          iconRight={<Icon width={12} height={13} fill="#111827" icon="outline-trash" />}
          onClick={()=>setDisplayRemoveMemberFromTeamModal(!displayRemoveMemberFromTeamModal)}
        />,
        <>{displayRemoveMemberFromTeamModal&&
            <RemoveMemberModal username={member.userName} orgOrTeamName={teamName}
             onRemove={teamPermission !== UserPermissionForTeam.AdminAccess? () => {
               setDisplayRemoveMemberFromTeamModal(!displayRemoveMemberFromTeamModal)
              }
              : () => {
               removeFromTeam(member?.leaveLink ?? member?.removeLink);
               setDisplayRemoveMemberFromTeamModal(!displayRemoveMemberFromTeamModal);
              }
            }
            onClose={()=>setDisplayRemoveMemberFromTeamModal(!displayRemoveMemberFromTeamModal)}
            /> }</>
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
          icon={isActive ? 'solid-cheveron-up' : 'solid-cheveron-down'}
        />
      ],
      rowClasses: 'table__collapse',
      onClick: () => handleCollapse(teamId)
    };
    rows.push(row);
  }

  const teamPermissionsOptions: RadioButtonItemProps[] = [
    { id: 'Admin access', label: 'Admin access', description:'members can:\n' +
          'read from\n' +
          'push to\n' +
          'add collaborators to the team\'s repositories' },
    { id: 'Write access', label: 'Write access', description:'members can:\n' +
          'read from\n' +
          'push to the team\'s repositories' },
    { id: 'Read access', label: 'Read access', description:'members can:\n' +
          'view\n' +
          'clone the team\'s repositories' }
  ];
  const [teamPerm, setTeamPerm] = useState<string>(teamPermission);
  const _options = teamPermissionsOptions.map((opt) => ({ ...opt, checked: opt.id === teamPerm }));

  const [displayMiniCardModal, setDisplayMiniCardModal]= useState<boolean>(false)


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
                title={"Team’s Access permissions"}
                label={teamPerm}
                options={_options}
                onItemChecked={setTeamPerm}
                initialChecked={teamPermission}
                dropdownBoxColor={"transparent"}
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
        </span>,

        <span
          className="teams-table-footer-right-section"
          onClick={() => setDisplayMiniCardModal(!displayMiniCardModal)}
        >
          See all teams projects
          <Icon width={9} height={8} fill="#5467DE" icon="outline-arrow-sm-right" />
        </span>,

        <>{displayMiniCardModal&&<MiniRepoCardsModal
          teamName={teamName}
          repos={teamRepos}
          onClick={() => setDisplayMiniCardModal(!displayMiniCardModal)}
        />}</>
      ]
    };
  } else {
    footer = {
      columns: [<span>This team doesn't have repositories yet</span>]
    };
  }
  return <GenericTable header={header} rows={rows} footer={footer} />;
}
