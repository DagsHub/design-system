import React, {useState} from 'react';
import classNames from 'classnames';
import { RadioButtonItem, RadioButtonItemProps } from '../radio-button-item';

import './radio-button-list.scss';

export interface RadioButtonListProps {
  title?: string;
  className?: string;
  style?: React.CSSProperties;
  onChecked?: (args: any) => void;
  items: RadioButtonItemProps[];
}

export function RadioButtonList({
  title = '',
  className = '',
  style = {},
  onChecked = () => {},
  items
}: RadioButtonListProps) {
  const [checked, setChecked] = useState<number | string>('');
  const _items = items.map(item => ({ ...item, checked: item.id === checked }));
  const checkedOptLabel = _items.find(item => item.checked)?.label;
  return (
    <div className={classNames('radio-button-list', className)} style={style}>
      {title && <p className="radio-button-list__title">{title}</p>}
      {_items?.map((item: RadioButtonItemProps) => (
        <RadioButtonItem key={item.id} onChecked={setChecked} {...item}/>
      ))}
    </div>
  );
}
