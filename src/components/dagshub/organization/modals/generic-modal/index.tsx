import React from 'react';
import '../../../../styles/root.scss';
import './generic-modal.scss';
import { Icon } from '.././../../../icons/index';

export interface ModalProps {
  title: string;
  elements: JSX.Element[];
  onClose: () => void;
  height?:number;
}

export function GenericModal({ title, elements, onClose , height}: ModalProps) {
    const genericModalHeightStyle = {
        height:height?height:"auto"
    };

  return (
    <>
      <div className="modal" style={genericModalHeightStyle}>
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
