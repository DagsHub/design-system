import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';
import { RadioButtonItemProps, RadioButtonList } from '../../forms';

import '../../styles/root.scss';
import './dropdown.scss';
import classNames from 'classnames';

export interface DropdownOption {
  id: string;
  label: string;
  description?: string;
}

export interface DropdownProps {
  kind?: 'basic' | 'radio';
  width: number;
  label: string;
  isCollapsed?: boolean;
  options?: RadioButtonItemProps[];
  onItemChecked?: (id: number | string) => void;
}

export const Dropdown = ({
  kind = 'basic',
  width,
  label,
  options = [],
  onItemChecked = () => {},
  ...props
}: DropdownProps & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  const [checked, setChecked] = useState<number | string>('');
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const _options = options.map(opt => ({ ...opt, checked: opt.id === checked }));
  const checkedOptLabel = _options.find(opt => opt.checked)?.label;

  useEffect(function onChecked() {
    onItemChecked(checked);
    setIsCollapsed(true);
  }, [checked]);

  return (
    <div className="dagshub-dropdown" style={{ width }} {...props}>
      <div className="dagshub-dropdown__box" onClick={() => setIsCollapsed(!isCollapsed)}>
        {checkedOptLabel || label}
        <Icon
          width={10}
          height={6}
          fill="#172D32"
          icon={`solid-cheveron-${isCollapsed ? 'down' : 'up'}`}
        />
      </div>
      {kind === 'radio' && !isCollapsed && (
        <RadioButtonList
          items={_options}
          onChecked={setChecked}
          className="dagshub-dropdown__options dagshub-dropdown__options-radio"
        />
      )}  
      {kind === 'basic' && !isCollapsed && (
         <div className='dagshub-dropdown__options'>
          {_options?.map((opt: RadioButtonItemProps) => (
            <div 
              key={opt.id} 
              onClick={() => setChecked(opt.id)} 
              className={classNames('dagshub-dropdown__options-opt', { checked: opt.checked })}
            >
              {opt.label}
            </div>
         ))}
       </div>
      )}
    </div>
  );
};
