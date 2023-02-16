import React, { useState } from 'react';
import { Icon } from '../../../../icons';
import { GenericModal } from '../generic-modal';
import { UserInfoProps } from '../../profiles/user-info';
import { Dropdown } from '../../../../elements/dropdown';
import { CombinedSearch } from '../../search/combined-search';
import { Button, ButtonVariant } from '../../../../elements/button';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './add-member-modal.scss';

export interface AddMemberModalProps {
  isOrg: boolean;
  isAdmin: boolean;
  isTeam: boolean;
  name: string;
  teams?: { id: string; name: string }[];
  display: boolean;
  onClose: () => void;
  onInputChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  inputText: string;
  resultUsers: UserInfoProps[];
  placeholder: string;
  addMember: (args?: any) => void;
}

export function AddMemberModal(props: AddMemberModalProps) {
  const [team, setTeam] = useState<number | string>('');
  const [access, setAccess] = useState<string>('member-access');
  const [addedMembers, setAddedMembers] = useState<string[]>([]);

  function onAddMember(username: string) {
    setAddedMembers([...addedMembers, username]);
  }

  function onRemoveMember(username: string) {
    setAddedMembers(addedMembers.filter((u) => u !== username));
  }

  const generateModalTitle = () => {
    let title = '';
    title += 'Add new ';
    title += props.isOrg && props.isAdmin ? 'organization admin' : 'member';
    title += ' to ' + props.name + ' ';
    title += props.isTeam ? ' team' : '';
    return title;
  };

  const generateButtonText = () => {
    let text = '';
    text += 'Add new ';
    text += props.isTeam ? 'team ' : 'organization ';
    text += props.isOrg && props.isAdmin ? 'admin' : 'member';
    return text;
  };

  let title = generateModalTitle();

  const elements: JSX.Element[] = [
    <p className="add-member-modal__instructions">
      Search by username or name or enter email address to invite someone outside {props.name}
    </p>,
    <div className="input-block">
      <CombinedSearch
        onInputChange={props.onInputChange}
        inputText={props.inputText}
        placeholder={props.placeholder}
        onAdd={onAddMember}
        onRemove={onRemoveMember}
        resultUsers={props.resultUsers.filter(
          (u: UserInfoProps) => !addedMembers.includes(u.userName)
        )}
      />
    </div>,
    props.isOrg ? (
      <>
        <RadioButtonList
          initialChecked={access}
          onChecked={setAccess}
          items={[
            {
              id: 'member-access',
              width: 600,
              label: 'Member access to organization',
              description: 'Description text',
              icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
            },
            {
              id: 'admin-access',
              width: 600,
              label: 'Admin access to organization',
              description:
                'Admins have full access to all repositories and have admin rights to the organization',
              icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
            }
          ]}
        />
        {props.teams?.length ? (
          <div className="add-member-modal__dropdown">
            <Dropdown
              width={130}
              label="Choose team"
              onItemChecked={setTeam}
              options={props.teams.map((team) => ({ id: team.id, label: team.name }))}
            />
          </div>
        ) : (
          <div className="add-member-modal__no-teams-text">
            You haven’t created any teams yet. To leverage different permission levels for different
            projectsc
            <a className="add-member-modal__create-team-text">
              {' '}
              create your first team{' '}
              <Icon width={9.33} height={8} fill="#5467DE" icon="outline-arrow-sm-right" />
            </a>
          </div>
        )}
      </>
    ) : (
      <></>
    ),
    <div className="add-member-modal__buttons-section">
      <Button
        label={generateButtonText()}
        width={600}
        onClick={() =>
          props.addMember({
            team,
            access,
            users: addedMembers
          })
        }
      />
      <p className="add-member-modal__buttons-seperator">or</p>
      <Button
        width={600}
        label="Copy invitation link"
        variant={ButtonVariant.Secondary}
        iconRight={<Icon icon="outline-copy" width={15} height={15} fill="#000000" />}
      />
    </div>
  ];

  return (
    <GenericModal
      title={title}
      elements={elements}
      isVisible={props.display}
      onClose={props.onClose}
    />
  );
}

//if organization, add radio buttons
//if organization and first time- show message for team creation, if not first time, show teams dropdown
//what should be the description text
//create generic element for dropdown
//use generic input component in the modal
