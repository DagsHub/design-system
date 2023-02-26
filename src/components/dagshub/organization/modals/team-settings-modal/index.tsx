import React, { useState } from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { Button, ButtonVariant } from '../../../../elements';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';

export interface TeamSettingsModalProps {
  onClose: () => void;
  teamName: string;
  teamDescription?: string;
  onDeleteTeam: (args?: any) => void;
  onEditTeam: (args?: any) => void;
}

export function TeamSettingsModal(props: TeamSettingsModalProps) {
  const [teamNameInputText, setTeamNameInputText] = useState<string>(props.teamName);
  const onTeamNameInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTeamNameInputText(e.target.value);
  };
  const [teamDescriptionInputText, setTeamDescriptionInputText] = useState<string>(
    props.teamDescription ? props.teamDescription : ''
  );
  const onTeamDescriptionInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setTeamDescriptionInputText(e.target.value);
  };

  const [displayDeleteTeamButtons, setDisplayDeleteTeamButtons] = useState<boolean>(false);

  const [access, setAccess] = useState<string>('member-access');

  let elements: JSX.Element[];
  elements = [
    <Input
      label="Team name"
      helperText="Changing the team name will break past @mentions."
      rootMaxWidth={599}
      value={teamNameInputText}
      onChange={onTeamNameInputChange}
    />,
    <Input
      label="Description"
      helperText="What is this team all about?"
      rootMaxWidth={599}
      value={teamDescriptionInputText}
      onChange={onTeamDescriptionInputChange}
    />,
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
    <>
      {!displayDeleteTeamButtons ? (
        <div className="team-settings-modal__buttons">
          <Button
            variant={ButtonVariant.Error}
            label={'Delete team'}
            width={110}
            onClick={() => {
              setDisplayDeleteTeamButtons(true);
            }}
          />
          <Button
            variant={ButtonVariant.Primary}
            label={'Save changes'}
            width={119}
            onClick={props.onEditTeam}
          />
        </div>
      ) : (
        <div className="team-settings-modal__buttons">
          <div className={'modal-buttons__delete-buttons'}>
            <Icon icon={'outline-exclamation-circle'} fill={'#DC2626'} width={20} height={20} />
            Once deleted, it can’t be undone
          </div>
          <Button
            variant={ButtonVariant.Error}
            label={'I understand, delete this team'}
            width={230}
            onClick={props.onDeleteTeam}
          />
          <Button
            variant={ButtonVariant.Ghost}
            label={'Cancel'}
            width={80}
            onClick={() => {
              setDisplayDeleteTeamButtons(false);
            }}
          />
        </div>
      )}
    </>
  ];
  return <GenericModal title="Team settings" elements={elements} onClose={props.onClose} />;
}
