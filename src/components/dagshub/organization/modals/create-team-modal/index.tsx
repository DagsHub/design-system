import _ from 'lodash';
import isEmail from 'validator/lib/isEmail';
import React, { ChangeEvent, useState } from 'react';

// import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { UserInfoProps } from '../../profiles/user-info';
import { Button, ButtonVariant } from '../../../../elements';
// import { UserPermissionForTeam } from '../../../../../types';
import { CombinedSearch } from '../../search/combined-search';
// import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';

// const teamPermissionsItems = [
//   {
//     id: UserPermissionForTeam.ReadAccess,
//     label: UserPermissionForTeam.ReadAccess,
//     description: 'This team will be able to view and clone its repositories',
//     icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
//   },
//   {
//     id: UserPermissionForTeam.WriteAccess,
//     label: UserPermissionForTeam.WriteAccess,
//     description: 'This team will be able to read its repositories, as well as push to them.',
//     icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
//   },
//   {
//     id: UserPermissionForTeam.AdminAccess,
//     label: UserPermissionForTeam.AdminAccess,
//     description:
//       'This team will be able to push/pull to its repositories, as well as add other collaborators to them.',
//     icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
//   }
// ];

function getEmailMembers(membersInput: string) {
  return _(membersInput.split(/,/))
    .map(_.trim)
    .filter((val: string) => isEmail(val))
    .value();
}

export interface CreateTeamModalProps {
  onClose: () => void;
  memberInputText: string;
  onMemberInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  resultUsers?: UserInfoProps[];
  createTeam: (args?: any) => void;
  orgName: string;
}

export function CreateNewTeamModal({
  orgName,
  memberInputText,
  onMemberInputChange,
  resultUsers,
  createTeam,
  onClose
}: CreateTeamModalProps) {
  const [name, setName] = useState<string>('');
  const [addedMembers, setAddedMembers] = useState<UserInfoProps[]>([]);
  // const [permission, setPermission] = useState<string>(UserPermissionForTeam.ReadAccess);

  function onAddMember(user: UserInfoProps) {
    setAddedMembers([...addedMembers, user]);
    onMemberInputChange({ target: { value: '' } } as any);
  }

  function onRemoveMember(username: string) {
    setAddedMembers(addedMembers.filter((u) => u.userName !== username));
  }

  let elements: JSX.Element[];
  elements = [
    <Input
      rootMaxWidth={600}
      label="1. Name your team"
      value={name}
      placeholder={'ML Team'}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      }}
    />,
    <p className="create-new-team-modal__instructions">
      2. Add people by searching their username or enter email address to invite someone outside
      DagsHub
    </p>,
    <div className="input-block">
      <CombinedSearch
        onAdd={onAddMember}
        onRemove={onRemoveMember}
        itemsList={addedMembers}
        inputText={memberInputText}
        onInputChange={onMemberInputChange}
        placeholder="Enter username or email"
        resultUsers={(resultUsers ?? []).filter(
          (u: UserInfoProps) => !addedMembers.find((m) => m.userName === u.userName)
        )}
      />
    </div>,
    // <RadioButtonList
    //   title="Team permissions"
    //   initialChecked={permission}
    //   onChecked={setPermission}
    //   items={teamPermissionsItems}
    // />,
    <div className="team-settings-modal__buttons">
      <Button
        variant={ButtonVariant.Primary}
        label="Create new team"
        width={600}
        onClick={async () => {
          await createTeam({
            name,
            members: addedMembers,
            invitees: getEmailMembers(memberInputText)
          });
          onClose();
        }}
      />
    </div>
  ];

  return (
    <GenericModal title={`Create new team in ${orgName}`} elements={elements} onClose={onClose} />
  );
}
