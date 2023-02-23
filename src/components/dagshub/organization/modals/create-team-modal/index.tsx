import React, {useState} from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { Button, ButtonVariant } from '../../../../elements';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';
import {CombinedSearch} from "../../search/combined-search";
import {UserInfoProps} from "../../profiles/user-info";

export interface CreateTeamModalProps {
  onClose: () => void;
  memberInputText: string;
  onMemberInputChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  nameInputChange: string;
  onNameInputChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  resultUsers?: UserInfoProps[];
  createTeam: (args?: any) => void;
  orgName:string;
}

export function CreateNewTeamModal(props: CreateTeamModalProps) {
  const [addedMembers, setAddedMembers] = useState<string[]>([]);
  function onAddMember(username: string) {
    setAddedMembers([...addedMembers, username]);
  }
  function onRemoveMember(username: string) {
    setAddedMembers(addedMembers.filter((u) => u !== username));
  }
  const [access, setAccess] = useState<string>('member-access');

  let elements: JSX.Element[];
  elements = [
    <Input
      label="1. Name your team"
      rootMaxWidth={599}
      onChange={props.onNameInputChange}
      value={props.nameInputChange}
    />,
    <p className="create-new-team-modal__instructions">
      2. Add people by searching their username or enter email address to invite someone outside DagsHub
    </p>,
    <div className="input-block">
      <CombinedSearch
          onAdd={onAddMember}
          inputText={props.memberInputText}
          placeholder={"Enter username or email"}
          onRemove={onRemoveMember}
          onInputChange={props.onMemberInputChange}
          resultUsers={(props.resultUsers??[]).filter((u: UserInfoProps) => !addedMembers.includes(u.userName))}
      />
    </div>,
    <RadioButtonList
      initialChecked={access}
      onChecked={setAccess}
      title="Team permissions"
      items={[
        {
          id: 1,
          label: 'Read access',
          description: 'This team will be able to view and clone its repositories',
          icon: <Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />
        },
        {
          id: 2,
          label: 'Write access',
          description: 'This team will be able to read its repositories, as well as push to them.',
          icon: <Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />
        },
        {
          id: 3,
          label: 'Admin access',
          description:
            'This team will be able to push/pull to its repositories, as well as add other collaborators to them.',
          icon: <Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />
        }
      ]}
    />,
    <div className="team-settings-modal__buttons">
      <Button variant={ButtonVariant.Primary} label={'Create new team'} width={599} onClick={() =>
          props.createTeam()
      }/>
    </div>
  ];
  return (
    <GenericModal
      title={`Create new team in ${props.orgName}`}
      elements={elements}
      onClose={props.onClose}
    />
  );
}
