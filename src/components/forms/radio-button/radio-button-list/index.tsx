import * as React from 'react';
import {
  RadioButtonItem,
  RadioButtonItemProps
} from '../../../forms/radio-button/radio-button-item';
import './radio-button-list.scss';

export interface RadioButtonListProps {
  title?: string;
  items: JSX.Element[];
}

export function RadioButtonList(props: RadioButtonListProps) {
  return (
    <div className="radio-button-list">
      {props.title ? <p className="radio-button-list__title">{props.title}</p> : <></>}
      {props.items?.map((item, columnIndex) => item)}
    </div>
  );
}
