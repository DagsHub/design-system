import React from 'react';
import { Icon } from '../../../../icons';
import { UserInfo } from '../../profiles/user-info';
import { Row, GenericTable } from '../generic-table';
import { UserPermissionForTeam, Member } from '../shared-classes';
import { Button, ButtonStretch, ButtonVariant } from '../../../../elements';

import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import './teams-table.scss';
import { MiniRepoCardsModal } from '../../modals/mini-repo-cards-modal';
import { RepoCardProps } from '../../cards/repo-card';

export interface TeamTableProps {
  members?: Member[];
  teamName: string;
  teamDescription?: string;
  teamPermission: UserPermissionForTeam;
  teamRepos: RepoCardProps[];
  handleClickOnCollapse: (index: number) => void;
  index: number;
  style: string;
  isActive: Boolean;
  removeFromTeam: (args?: any) => void;
  addNewTeamMember: (args?: any) => void;
  toggleMiniRepoCardsModal: (args?: any) => void;
  displayMiniRepoCardModal: boolean;
}

//add functionality, tooltip
//change its css to BEM
//add (you) annotation to relevant user

const MAX_ROWS = 7;

export function TeamTable({
  teamName,
  teamDescription,
  members,
  style,
  isActive,
  handleClickOnCollapse,
  index,
  teamRepos,
  teamPermission,
  removeFromTeam,
  addNewTeamMember,
  toggleMiniRepoCardsModal,
  displayMiniRepoCardModal
}: TeamTableProps) {
  let header: Row;
  header = {
    columns: [
      <span className="teams-table-left-side-header">
        <span className="teams-table-left-side-header__team-name">{teamName} TEAM</span>
        <span className="teams-table-left-side-header__team-description">{teamDescription}</span>
      </span>,
      <span className="teams-table-right-side-header">
        <Button
          width={210}
          onClick={addNewTeamMember}
          label="Add new team member"
          stretch={ButtonStretch.Slim}
          variant={ButtonVariant.Ghost}
          iconLeft={<Icon width={10.67} height={10.67} fill="#172D32" icon="solid-plus" />}
        />
        <span className="teams-table-right-side-header__dots-vertical-icon">
          <Icon width={3} height={13.5} fill="#64748B" icon="outline-dots-vertical" />
        </span>
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
        <UserInfo imageSource={member.relAvatarLink} userName={member.userName} />,
        <Button
          width={177}
          label="Remove from team"
          onClick={removeFromTeam}
          variant={ButtonVariant.Secondary}
          iconRight={<Icon width={12} height={13.33} fill="#111827" icon="outline-trash" />}
        />
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
          height={4.8}
          fill="#172D32"
          icon={isActive ? 'solid-cheveron-up' : 'solid-cheveron-down'}
        />
      ],
      rowClasses: 'table__collapse',
      onClick: () => handleClickOnCollapse(index)
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
            <span className="teams-table-footer-left-section__permission-label">
              {teamPermission}
              <Icon width={10} height={6} fill="#172D32" icon="solid-cheveron-down" />
            </span>
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
          onClick={() => toggleMiniRepoCardsModal(index)}
        >
          See all teams projects
          <Icon width={9.33} height={8} fill="#5467DE" icon="outline-arrow-sm-right" />
        </span>,

        <MiniRepoCardsModal
          teamName={teamName}
          repos={teamRepos}
          display={displayMiniRepoCardModal}
          onClick={() => toggleMiniRepoCardsModal(index)}
        />
      ]
    };
  } else {
    footer = {
      columns: [<span>This team doesn't have repositories yet</span>]
    };
  }
  return <GenericTable header={header} rows={rows} footer={footer} />;
}
