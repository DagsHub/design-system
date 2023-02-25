import React, { useState } from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { UserInfoProps } from '../../profiles/user-info';
import { CombinedSearch } from '../../search/combined-search';
import { Button, ButtonVariant } from '../../../../elements';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';

const teamPermissionsItems = [
  {
    id: 1,
    label: 'Read access',
    description: 'This team will be able to view and clone its repositories',
    icon: <Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13} />
  },
  {
    id: 2,
    label: 'Write access',
    description: 'This team will be able to read its repositories, as well as push to them.',
    icon: <Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13} />
  },
  {
    id: 3,
    label: 'Admin access',
    description:
      'This team will be able to push/pull to its repositories, as well as add other collaborators to them.',
    icon: <Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13} />
  }
];

export interface CreateTeamModalProps {
  onClose: () => void;
  memberInputText: string;
  onMemberInputChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  nameInputChange: string;
  onNameInputChange: (e: { target: { value: React.SetStateAction<string> } }) => void;
  resultUsers?: UserInfoProps[];
  createTeam: (args?: any) => void;
  orgName: string;
}

export function CreateNewTeamModal({
  orgName,
  memberInputText,
  onMemberInputChange,
  nameInputChange,
  onNameInputChange,
  resultUsers,
  createTeam,
  onClose
}: CreateTeamModalProps) {
  const [access, setAccess] = useState<string>('member-access');
  const [addedMembers, setAddedMembers] = useState<string[]>([]);

  function onAddMember(username: string) {
    setAddedMembers([...addedMembers, username]);
  }

  function onRemoveMember(username: string) {
    setAddedMembers(addedMembers.filter((u) => u !== username));
  }

  let elements: JSX.Element[];
  elements = [
    <Input
      rootMaxWidth={600}
      label="1. Name your team"
      onChange={onNameInputChange}
      value={nameInputChange}
    />,
    <p className="create-new-team-modal__instructions">
      2. Add people by searching their username or enter email address to invite someone outside
      DagsHub
    </p>,
    <div className="input-block">
      <CombinedSearch
        onAdd={onAddMember}
        onRemove={onRemoveMember}
        inputText={memberInputText}
        onInputChange={onMemberInputChange}
        placeholder="Enter username or email"
        resultUsers={(resultUsers ?? []).filter(
          (u: UserInfoProps) => !addedMembers.includes(u.userName)
        )}
      />
    </div>,
    <RadioButtonList
      initialChecked={access}
      onChecked={setAccess}
      title="Team permissions"
      items={teamPermissionsItems}
    />,
    <div className="team-settings-modal__buttons">
      <Button
        variant={ButtonVariant.Primary}
        label="Create new team"
        width={600}
        onClick={() =>
          createTeam({
            name: nameInputChange,
            members: addedMembers,
            access
          })
        }
      />
    </div>
  ];

  return (
    <GenericModal title={`Create new team in ${orgName}`} elements={elements} onClose={onClose} />
  );
}
