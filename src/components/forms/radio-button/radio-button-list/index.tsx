import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { RadioButtonItem, RadioButtonItemProps } from '../radio-button-item';

import './radio-button-list.scss';

export interface RadioButtonListProps {
  title?: string;
  className?: string;
  initialChecked?: number | string;
  style?: React.CSSProperties;
  onChecked?: (args: any) => void;
  items: RadioButtonItemProps[];
}

export function RadioButtonList({
  title = '',
  className = '',
  initialChecked = '',
  style = {},
  onChecked = () => {},
  items
}: RadioButtonListProps) {
  const _items = items.map((item) => ({ ...item, checked: item.id === initialChecked }));

  return (
    <div className={classNames('radio-button-list', className)} style={style}>
      {title && <p className="radio-button-list__title">{title}</p>}
      {_items?.map((item: RadioButtonItemProps) => (
        <RadioButtonItem key={item.id} checked={item.checked} onChecked={onChecked} {...item} />
      ))}
    </div>
  );
}
