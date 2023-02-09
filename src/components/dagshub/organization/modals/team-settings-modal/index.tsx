import React from 'react';
import '../../../../styles/root.scss';
import { GenericModal } from '../generic-modal';
import { Icon } from '../../../../icons';
import { Button, ButtonVariant } from '../../../../elements';
import { Input } from '../../../../forms';
import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';
import { RadioButtonItem } from '../../../../forms/radio-button/radio-button-item';
import './team-settings-modal.scss';

export interface TeamSettingsModalProps {
    display:boolean;
    onClick:()=>void;
}

export function TeamSettingsModal(props: TeamSettingsModalProps) {
  let elements: JSX.Element[];
  elements = [
    <Input
      label={'Team name'}
      helperText={'Changing the team name will break past @mentions.'}
      width={599}
    />,
    <Input label={'Description'} helperText={'What is this team all about?'} width={599} />,
    <RadioButtonList
      items={[
        <RadioButtonItem
          label="Read access"
          description="This team will be able to view and clone its repositories"
          icon={<Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />}
        />,
        <RadioButtonItem
          label="Write access"
          description="This team will be able to read its repositories, as well as push to them."
          icon={<Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />}
        />,
        <RadioButtonItem
          label="Admin access"
          description="This team will be able to push/pull to its repositories, as well as add other collaborators to them."
          icon={<Icon icon="outline-lock-closed" fill={'#94A3B8'} width={12} height={13.33} />}
        />
      ]}
      title={'Team permissions'}
    />,
    <div className="team-settings-modal__buttons">
      <Button variant={ButtonVariant.Error} label={'Delete team'} width={110} />
      <Button variant={ButtonVariant.Primary} label={'Save changes'} width={119} />
    </div>
  ];
  return <GenericModal title={'Team settings'} elements={elements} display={props.display} onClick={props.onClick} />;
}
