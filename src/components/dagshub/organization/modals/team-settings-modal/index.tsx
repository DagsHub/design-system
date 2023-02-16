import React from 'react';
import { Icon } from '../../../../icons';
import { Input } from '../../../../forms';
import { GenericModal } from '../generic-modal';
import { Button, ButtonVariant } from '../../../../elements';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './team-settings-modal.scss';

export interface TeamSettingsModalProps {
  display: boolean;
  onClick: () => void;
}

export function TeamSettingsModal(props: TeamSettingsModalProps) {
  let elements: JSX.Element[];
  elements = [
    <Input
      label="Team name"
      helperText="Changing the team name will break past @mentions."
      rootMaxWidth={599}
    />,
    <Input label="Description" helperText="What is this team all about?" rootMaxWidth={599} />,
    <RadioButtonList
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
      <Button variant={ButtonVariant.Error} label={'Delete team'} width={110} />
      <Button variant={ButtonVariant.Primary} label={'Save changes'} width={119} />
    </div>
  ];
  return (
    <GenericModal
      title="Team settings"
      elements={elements}
      isVisible={props.display}
      onClose={props.onClick}
    />
  );
}
