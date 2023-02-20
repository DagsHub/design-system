import React, { useEffect, useState } from 'react';
import { Icon } from '../../icons';
import {Checkbox, RadioButtonItemProps, RadioButtonList} from '../../forms';

import '../../styles/root.scss';
import './dropdown.scss';
import classNames from 'classnames';

export interface DropdownOption {
  id: string;
  label: string;
  description?: string;
}

export interface DropdownProps {
  kind?: 'basic' | 'radio' | 'checkbox';
  width: number;
  label: string;
  isCollapsed?: boolean;
  options?: RadioButtonItemProps[];
  initialChecked?: number | string;
  onItemChecked?: (id: number | string) => void;
  title?:string;
  optionWidth?:number;
}

export const Dropdown = ({
  kind = 'basic',
  width,
  label,
  options = [],
  initialChecked = '',
  onItemChecked = () => {},
  title,
  optionWidth,
  ...props
}: DropdownProps & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [checked, setChecked] = useState<number | string>(initialChecked);

  const _options = options.map((opt) => ({ ...opt, checked: opt.id === checked }));
  const checkedOptLabel = _options.find((opt) => opt.checked)?.label;

  useEffect(
    function onChecked() {
      onItemChecked(checked);
      setIsCollapsed(true);
    },
    [checked]
  );

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
      {kind === 'checkbox' && !isCollapsed && (
          <div className="dagshub-dropdown__options">
            {_options?.map((opt: RadioButtonItemProps) => (
                <Checkbox
                    label={opt.label}
                    onChange={() => {
                      if (opt.id === checked) {
                        setIsCollapsed(true);
                      } else {
                        setChecked(opt.id);
                      }
                    }}
                    className={classNames('dagshub-dropdown__options-checkbox', { checked: opt.checked })}
                    style={{width:optionWidth?optionWidth:"100%"}}
                />
            ))}
          </div>
      )}
      {kind === 'radio' && !isCollapsed && (
        <RadioButtonList
          title={title?title:undefined}
          items={_options}
          onChecked={(id: number | string) => {
            if (id === checked) {
              setIsCollapsed(true);
            } else {
              setChecked(id);
            }
          }}
          initialChecked={checked}
          className="dagshub-dropdown__options dagshub-dropdown__options-radio"
          style={{width:optionWidth?optionWidth:"100%"}}
        />
      )}
      {kind === 'basic' && !isCollapsed && (
        <div className="dagshub-dropdown__options">
          {_options?.map((opt: RadioButtonItemProps) => (
            <div
              key={opt.id}
              onClick={() => {
                if (opt.id === checked) {
                  setIsCollapsed(true);
                } else {
                  setChecked(opt.id);
                }
              }}
              className={classNames('dagshub-dropdown__options-opt', { checked: opt.checked })}
              style={{width:optionWidth?optionWidth:"100%"}}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
