import React from 'react';
import '../../../../styles/root.scss';
import './generic-modal.scss';
import { Icon } from '.././../../../icons/index';

export interface ModalProps {
  title: string;
  elements: JSX.Element[];
  display:boolean;
  onClick:()=>void;
}

//add closing function and background color when open
//add functionality to search input (should be received as props)
//when clicking on the input there should be written "Typing..."
//pass class name to icon

export function GenericModal(props: ModalProps) {
  return (
      <>
          <div className="modal" style={{display:props.display?"block":"none"}}>
              <button className="modal__x-button" onClick={props.onClick}>
                  <Icon width={10} height={10} fill="#94A3B8" icon="outline-x" />
              </button>
              <div className="modal-content">
                  <p className="modal-content__title">{props.title}</p>
                  {props.elements?.map((element, elementIndex) => element)}
              </div>
          </div>
          <div className={"overlay"} style={{display:props.display?"block":"none"}}></div>
      </>
  );
}
