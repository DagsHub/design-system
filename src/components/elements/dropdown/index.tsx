import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';

import { Icon } from '../../icons';
import { Checkbox, RadioButtonItemProps, RadioButtonList } from '../../forms';

import '../../styles/root.scss';
import './dropdown.scss';

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
  onItemChecked?: (id: any) => void;
  title?: string;
  optionWidth?: number;
  alignOptionsToTheRight?: boolean;
  maxHeight?: number;
  dropdownBoxColor?: string;
  disabled?: boolean;
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
  alignOptionsToTheRight,
  maxHeight,
  dropdownBoxColor = '#f8fafc',
  disabled = false,
  ...props
}: DropdownProps & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  const dropdownRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [checked, setChecked] = useState<number | string>(initialChecked);
  const [_options, setDropdownOption] = useState<any>(
    options.map((opt) => ({ ...opt, checked: opt.id === checked }))
  );
  const [checkedOptLabel, setOptLabel] = useState(_options.find((opt: any) => opt.checked)?.label);
  const [checkboxOptions, setOptions] = useState<any>(_options);

  useEffect(
    function setNewCheck() {
      setChecked(initialChecked);
    },
    [initialChecked]
  );

  useEffect(
    function setNewOptions() {
      setDropdownOption(options.map((opt) => ({ ...opt, checked: opt.id === checked })));
    },
    [options, checked]
  );

  useEffect(
    function setNewOptLabel() {
      setOptLabel(_options.find((opt: any) => opt.checked)?.label);
    },
    [_options]
  );

  const onCheckboxClick = (optionId: string | number) => {
    const nextOptions = checkboxOptions.map((option: RadioButtonItemProps) => {
      if (option.id === optionId) {
        return { ...option, checked: !option.checked };
      }
      return option;
    });
    setOptions(nextOptions);
  };

  function detectOutsideClick(e: MouseEvent): void {
    if (dropdownRef.current && !(dropdownRef.current as any).contains(e.target)) {
      setIsCollapsed(true);
    }
  }

  useEffect(
    function onChecked() {
      onItemChecked(checked);
      if (kind != 'checkbox') {
        setIsCollapsed(true);
      }
    },
    [checked]
  );

  useEffect(function onDocClick() {
    document.addEventListener('click', detectOutsideClick);
    return () => {
      document.removeEventListener('click', detectOutsideClick);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="dagshub-dropdown"
      style={{ width, cursor: disabled ? 'not-allowed' : 'pointer' }}
      {...props}
    >
      <div
        className="dagshub-dropdown__box"
        style={{ background: dropdownBoxColor, pointerEvents: disabled ? 'none' : 'all' }}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {(kind != 'checkbox' && checkedOptLabel) || label}
        <Icon
          width={10}
          height={6}
          fill="#172D32"
          icon={`solid-cheveron-${isCollapsed ? 'down' : 'up'}`}
        />
      </div>
      {kind === 'checkbox' && !isCollapsed && (
        <div
          className={classNames('dagshub-dropdown__options', { right: alignOptionsToTheRight })}
          style={{ maxHeight: maxHeight }}
        >
          {checkboxOptions?.map((opt: RadioButtonItemProps) => (
            <Checkbox
              label={opt.label}
              onChange={() => {
                onCheckboxClick(opt.id);
              }}
              className={classNames('dagshub-dropdown__options-checkbox', { checked: opt.checked })}
              style={{ width: optionWidth ? optionWidth : '100%' }}
            />
          ))}
        </div>
      )}
      {kind === 'radio' && !isCollapsed && (
        <RadioButtonList
          title={title ? title : undefined}
          items={_options}
          onChecked={(id: number | string) => {
            if (id === checked) {
              setIsCollapsed(true);
            } else {
              setChecked(id);
            }
          }}
          initialChecked={checked}
          className={classNames('dagshub-dropdown__options dagshub-dropdown__options-radio', {
            right: alignOptionsToTheRight,
          })}
          style={{ width: optionWidth ? optionWidth : '100%', maxHeight: maxHeight }}
        />
      )}
      {kind === 'basic' && !isCollapsed && (
        <div
          className={classNames('dagshub-dropdown__options', { right: alignOptionsToTheRight })}
          style={{ maxHeight: maxHeight }}
        >
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
              style={{ width: optionWidth || '100%' }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
