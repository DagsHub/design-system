import React from 'react';
import '../../../../styles/root.scss';
import { GenericModal } from '../generic-modal';
import { Button, ButtonVariant } from '../../../../elements';
import './remove-member-modal.scss';

export interface RemoveMemberModalProps {
  username: string;
  orgOrTeamName: string;
  onClose: () => void;
  onRemove:()=>void;
}

export function RemoveMemberModal(props: RemoveMemberModalProps) {
  let elements: JSX.Element[];
  elements = [
    <div className="remove-member-modal__text">
      Are you sure you want to remove{' '}
      <span className="remove-member-modal__text-username">@{props.username}</span> from {props.orgOrTeamName}
      ?
    </div>,
    <div className="remove-member-modal__buttons">
      <Button variant={ButtonVariant.Error} label={'Remove member'} width={143} onClick={props.onRemove}/>
      <Button variant={ButtonVariant.Primary} label={'Cancel'} width={95} onClick={props.onClose} />
    </div>
  ];
  return (
    <GenericModal
      title={'Remove member'}
      elements={elements}
      onClose={props.onClose}
    />
  );
}
