import React from 'react';
import '../../../../styles/root.scss';
import './modal.scss';
import {Icon} from ".././../../../icons/index";

export interface ModalProps{
  title:string;
  elements: JSX.Element[];
}

//add closing function and background color when open
//add functionality to search input (should be received as props)
//when clicking on the input there should be written "Typing..."
//pass class name to icon

export function GenericModal(props: ModalProps) {
  return (
    <div className="modal modal_border">
      <div className="modal__x-button">
        <Icon width={10} height={10} fill="#94A3B8" icon="outline-x"/>
      </div>
      <div className="modal-content">
        <p className="modal-content__title">
          {props.title}
        </p>
          {props.elements?.map((element, elementIndex) =>
              element
          )}
      </div>
    </div>
  );
}


