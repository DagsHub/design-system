import React, { useEffect, useRef } from 'react';
import '../../../../styles/root.scss';
import './generic-modal.scss';
import { Icon } from '.././../../../icons/index';

export interface ModalProps {
  title?: string;
  elements: JSX.Element[];
  onClose: () => void;
  height?: number;
  maxHeight?: number;
}

export function GenericModal({ title, elements, onClose, height, maxHeight }: ModalProps) {
  const genericModalHeightStyle = {
    height: height ? height : 'auto',
    maxHeight: maxHeight ? maxHeight : 'auto',
  };

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef]);

  return (
    <>
      <div ref={modalRef} className="modal" style={genericModalHeightStyle}>
        <button className="modal__x-button" onClick={onClose}>
          <Icon width={10} height={10} fill="#94A3B8" icon="outline-x" />
        </button>
        <div className="modal-content">
          {!!title && <p className="modal-content__title">{title}</p>}
          {elements}
        </div>
      </div>
      <div className={'overlay'}></div>
    </>
  );
}
