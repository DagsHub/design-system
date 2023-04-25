import _ from 'lodash';
import isEmail from 'validator/lib/isEmail';
import React, {ChangeEvent, useEffect, useState} from 'react';

import { Icon } from '../../../../icons';
import { Input, RadioButtonList } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { UserInfoProps } from '../../profiles/user-info';
import { Button, ButtonVariant } from '../../../../elements';
import { UserPermissionForTeam } from '../../../../../types';
import { CombinedSearch } from '../../search/combined-search';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';

const teamPermissionsItems = [
  {
    id: UserPermissionForTeam.ReadAccess,
    label: UserPermissionForTeam.ReadAccess,
    description: 'This team will be able to view and clone its repositories',
    icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
  },
  {
    id: UserPermissionForTeam.WriteAccess,
    label: UserPermissionForTeam.WriteAccess,
    description: 'This team will be able to read its repositories, as well as push to them.',
    icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
  },
  {
    id: UserPermissionForTeam.AdminAccess,
    label: UserPermissionForTeam.AdminAccess,
    description:
      'This team will be able to push/pull to its repositories, as well as add other collaborators to them.',
    icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
  }
];

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
  existingTeamNames:string[];
}

export function CreateNewTeamModal({
  onClose,
  orgName,
  memberInputText,
  onMemberInputChange,
  resultUsers,
  createTeam,
 existingTeamNames
                                   }: CreateTeamModalProps) {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [addedMembers, setAddedMembers] = useState<UserInfoProps[]>([]);
  const [permission, setPermission] = useState<string>(UserPermissionForTeam.ReadAccess);

  const [errTeamNameLength, setErrTeamNameLength] = useState<boolean>(false);
  const [errTeamNameChars, setErrTeamNameChars] = useState<boolean>(false);
  const [errTeamDescription, setErrTeamDescription] = useState<boolean>(false);
  const [errTeamNameExist, setErrTeamNameExist] = useState<boolean>(false);
  const [errTeamNameRequired, setErrTeamNameRequired] = useState<boolean>(false);


  const teamNameWithIllegalCharactersErrText="Team name must be valid alpha or numeric or dash(-_) or dot characters."
  const teamNameLengthErrText="Team name must contain at most 30 characters."
  const teamNameExistErrText="Team name has already been taken."
  const teamNameRequiredErrText="Team name cannot be empty."
  const teamDescriptionTooLongErrText="Team description must contain at most 255 characters."

  useEffect(
      function checkTeamNameInput() {
        const regexChars = /^$|^[a-zA-Z0-9-_.]+$/;
        const regexLength = /^.{0,30}$/;
        setErrTeamNameChars(name.search(regexChars) == -1)
        setErrTeamNameLength(name.search(regexLength) == -1)
        setErrTeamNameExist(existingTeamNames.includes(name.toLowerCase()))
      },
      [name]
  );

  useEffect(
      function checkTeamDescriptionInput() {
        const regexp = /^.{0,255}$/;
        setErrTeamDescription(description.search(regexp) == -1)
      },
      [description]
  );

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
    <>{errTeamNameChars&&<div style={{color:"red", fontSize:"12px"}}>{teamNameWithIllegalCharactersErrText}</div>}
    </>,
    <>{errTeamNameLength&&<div style={{color:"red", fontSize:"12px"}}>{teamNameLengthErrText}</div>}
    </>,
    <>{errTeamNameExist&&<div style={{color:"red", fontSize:"12px"}}>{teamNameExistErrText}</div>}
    </>,
      <>{errTeamNameRequired&&<div style={{color:"red", fontSize:"12px"}}>{teamNameRequiredErrText}</div>}
      </>,
    <Input
      rootMaxWidth={600}
      label="2. Add description"
      value={description}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
      }}
    />,
    <>{errTeamDescription&&<div style={{color:"red", fontSize:"12px"}}>{teamDescriptionTooLongErrText}</div>}
    </>,
    // <p className="create-new-team-modal__instructions">
    //   3. Add people by searching their username or enter email address to invite someone outside
    //   DagsHub
    // </p>,
    // <div className="input-block">
    //   <CombinedSearch
    //     onAdd={onAddMember}
    //     onRemove={onRemoveMember}
    //     itemsList={addedMembers}
    //     inputText={memberInputText}
    //     onInputChange={onMemberInputChange}
    //     placeholder="Enter username or email"
    //     resultUsers={(resultUsers ?? []).filter(
    //       (u: UserInfoProps) => !addedMembers.find((m) => m.userName === u.userName)
    //     )}
    //   />
    // </div>,
    <RadioButtonList
      title="Team permissions"
      initialChecked={permission}
      onChecked={setPermission}
      items={teamPermissionsItems}
    />,
    <div className="team-settings-modal__buttons">
      <Button
          disabled={errTeamDescription||errTeamNameLength||errTeamNameChars||errTeamNameExist}
          variant={ButtonVariant.Primary}
        label="Create new team"
        width={600}
        onClick={async () => {
            const regexp = /^(?!\s* $).+/;
            if(name.search(regexp) == -1) {
                setErrTeamNameRequired(true)
            }else{
                setErrTeamNameRequired(false)
                await createTeam({
                    name,
                    description,
                    // members: addedMembers,
                    // invitees: getEmailMembers(memberInputText),
                    permission:
                        permission === UserPermissionForTeam.ReadAccess
                            ? 'read'
                            : permission === UserPermissionForTeam.WriteAccess
                                ? 'write'
                                : 'admin'
                });
                onClose();
            }
        }}
      />
    </div>
  ];

  return (
    <GenericModal title={`Create new team in ${orgName}`} elements={elements} onClose={onClose} />
  );
}
