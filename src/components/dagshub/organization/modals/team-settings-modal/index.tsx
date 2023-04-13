import React, { useState } from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { Button, ButtonVariant } from '../../../../elements';
import { UserPermissionForTeam } from '../../../../../types';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';

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
  onEditTeam: (args?: any) => void;
  onClose: () => void;
}

export function TeamSettingsModal({
  teamName,
  teamDescription,
  onDeleteTeam,
  onEditTeam,
  onClose,
  userPermissionForTeam = UserPermissionForTeam.ReadAccess
}: TeamSettingsModalProps) {
  const [displayDeleteBtns, setDisplayDeleteBtns] = useState<boolean>(false);
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

  let elements: JSX.Element[];
  elements = [
    <Input
      label="Team name"
      helperText="Changing the team name will break past @mentions."
      rootMaxWidth={600}
      value={teamNameInputText}
      onChange={onTeamNameInputChange}
    />,
    <Input
      label="Description"
      helperText="What is this team all about?"
      rootMaxWidth={600}
      value={teamDescriptionInputText}
      onChange={onTeamDescriptionInputChange}
    />,
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
            label="Save changes"
            onClick={() =>
              onEditTeam({
                name: teamNameInputText,
                description: teamDescriptionInputText,
                permission
              })
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
