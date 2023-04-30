import React, { useEffect, useState } from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { Button, ButtonVariant } from '../../../../elements';
import { UserPermissionForTeam } from '../../../../../types';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';
import { OnEditTeamInput } from '../../tables/teams-table';

const teamPermissionsOptions = [
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

export interface TeamSettingsModalProps {
  teamName: string;
  teamDescription?: string;
  userPermissionForTeam?: UserPermissionForTeam;
  onDeleteTeam: (args?: any) => void;
  onEditTeam: (args: OnEditTeamInput) => void;
  onClose: () => void;
  existingTeamNames:string[];
}

export function TeamSettingsModal({
  teamName,
  teamDescription,
  onDeleteTeam,
  onEditTeam,
  onClose,
  existingTeamNames,
  userPermissionForTeam = UserPermissionForTeam.ReadAccess
}: TeamSettingsModalProps) {
  const [displayDeleteBtns, setDisplayDeleteBtns] = useState<boolean>(false);

  const [errTeamNameLength, setErrTeamNameLength] = useState<boolean>(false);
  const [errTeamNameChars, setErrTeamNameChars] = useState<boolean>(false);
  const [errTeamDescription, setErrTeamDescription] = useState<boolean>(false);
  const [errTeamNameExist, setErrTeamNameExist] = useState<boolean>(false);
  const [errTeamNameRequired, setErrTeamNameRequired] = useState<boolean>(false);



  const teamNameWithIllegalCharactersErrText="Team name must be valid alpha or numeric or dash(-_) or dot characters."
  const teamNameLengthErrText="Team name cannot be empty and must contain at most 30 characters."
  const teamNameRequiredErrText="Team name cannot be empty."
  const teamNameExistErrText="Team name has already been taken."
  const teamDescriptionTooLongErrText="Team description must contain at most 255 characters."



  const [teamNameInputText, setTeamNameInputText] = useState<string>(teamName);
  const [permission, setPermission] = useState<UserPermissionForTeam>(userPermissionForTeam);
  const [teamDescriptionInputText, setTeamDescriptionInputText] = useState<string>(
    teamDescription || ''
  );

  const onTeamDescriptionInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTeamDescriptionInputText(e.target.value);
  };

  const onTeamNameInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTeamNameInputText(e.target.value);
  };

  useEffect(
    function checkTeamNameInput() {
      const regexChars = /^$|^[a-zA-Z0-9-_.]+$/;
      const regexLength = /^.{0,30}$/;
      setErrTeamNameChars(teamNameInputText.search(regexChars) == -1)
      setErrTeamNameLength(teamNameInputText.search(regexLength) == -1)
      setErrTeamNameExist(existingTeamNames.includes(teamNameInputText.toLowerCase()))
      const regexp = /^(?!\s* $).+/;
      if(teamNameInputText.search(regexp) != -1) {
        setErrTeamNameRequired(false)
      }
    },
    [teamNameInputText]
  );

  useEffect(
      function checkTeamDescriptionInput() {
        const regexp = /^.{0,255}$/;
        setErrTeamDescription(teamDescriptionInputText.search(regexp) == -1)
      },
      [teamDescriptionInputText]
  );

  let elements: JSX.Element[];
  elements = [
    <Input
      label="Team name"
      helperText="Changing the team name will break past @mentions."
      rootMaxWidth={600}
      value={teamNameInputText}
      onChange={onTeamNameInputChange}
    />,
      <>{errTeamNameChars&&<div style={{color:"red"}}>{teamNameWithIllegalCharactersErrText}</div>}
      </>,
    <>{errTeamNameLength&&<div style={{color:"red"}}>{teamNameLengthErrText}</div>}
    </>,
    <>{errTeamNameExist&&<div style={{color:"red"}}>{teamNameExistErrText}</div>}
    </>,
    <>{errTeamNameRequired&&<div style={{color:"red", fontSize:"12px"}}>{teamNameRequiredErrText}</div>}
    </>,
    <Input
      label="Description"
      helperText="What is this team all about?"
      rootMaxWidth={600}
      value={teamDescriptionInputText}
      onChange={onTeamDescriptionInputChange}
    />,
    <>{errTeamDescription&&<div style={{color:"red"}}>{teamDescriptionTooLongErrText}</div>}
    </>,
    <RadioButtonList
      initialChecked={permission}
      onChecked={setPermission}
      title="Team permissions"
      items={teamPermissionsOptions}
    />,
    <>
      {!displayDeleteBtns ? (
        <div className="team-settings-modal__buttons">
          <Button
            width={110}
            label="Delete team"
            variant={ButtonVariant.Error}
            onClick={() => setDisplayDeleteBtns(true)}
          />
          <Button
            width={120}
            disabled={errTeamDescription||errTeamNameLength||errTeamNameChars||errTeamNameExist}
            label="Save changes"
            onClick={() => {
              const regexp = /^(?!\s* $).+/;
              if (teamNameInputText.search(regexp) == -1) {
                setErrTeamNameRequired(true)
              } else {
                onEditTeam({
                  originalName: teamName,
                  newName: teamNameInputText,
                  description: teamDescriptionInputText,
                  permission:
                      permission === UserPermissionForTeam.ReadAccess
                          ? 'read'
                          : permission === UserPermissionForTeam.WriteAccess
                              ? 'write'
                              : 'admin'
                });
                onClose();
              }
            }
            }
            variant={ButtonVariant.Primary}
          />
        </div>
      ) : (
        <div className="team-settings-modal__buttons">
          <div className="modal-buttons__delete-buttons">
            <Icon icon="outline-exclamation-circle" fill="#DC2626" width={20} height={20} />
            Once deleted, it can’t be undone
          </div>
          <Button
            width={230}
            variant={ButtonVariant.Error}
            onClick={() => onDeleteTeam(teamName)}
            label="I understand, delete this team"
          />
          <Button
            width={80}
            label="Cancel"
            variant={ButtonVariant.Ghost}
            onClick={() => setDisplayDeleteBtns(false)}
          />
        </div>
      )}
    </>
  ];
  return <GenericModal title="Team settings" elements={elements} onClose={onClose} />;
}
