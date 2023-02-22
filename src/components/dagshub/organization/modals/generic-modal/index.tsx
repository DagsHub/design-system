import React from 'react';
import '../../../../styles/root.scss';
import './generic-modal.scss';
import { Icon } from '.././../../../icons/index';

export interface ModalProps {
  title: string;
  elements: JSX.Element[];
  onClose: () => void;
}

//add closing function and background color when open
//add functionality to search input (should be received as props)
//when clicking on the input there should be written "Typing..."
//pass class name to icon

export function GenericModal({ title, elements, onClose }: ModalProps) {
  return (
    <>
      <div className="modal">
        <button className="modal__x-button" onClick={onClose}>
          <Icon width={10} height={10} fill="#94A3B8" icon="outline-x" />
        </button>
        <div className="modal-content">
          <p className="modal-content__title">{title}</p>
          {elements}
        </div>
      </div>
      <div className={'overlay'}></div>
    </>
  );
}
