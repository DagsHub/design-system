import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';

import { Icon } from '../../icons';
import { RadioButtonItemProps, RadioButtonList } from '../../forms';

import '../../styles/root.scss';
import './dropdown.scss';

export interface SelectorOption {
  id: string;
  label: string;
  description?: string;
}

export interface SelectorProps {
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
  sorted?: 'desc' | 'asc' | 'none';
}

export const Selector = ({
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
  sorted = 'none',
  ...props
}: SelectorProps & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  const dropdownRef = useRef(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [checked, setChecked] = useState<number | string>(initialChecked);
  const [sortDirection, setSortDirection] = useState<string>(sorted);

  const _options = options.map((opt) => ({ ...opt, checked: opt.id === checked }));

  const onClick = (optionId: string | number) => {
    const nextDirection = _options.find(function (option) {
      return option.id === optionId;
    });
    setSortDirection(nextDirection?.sortDirection ?? 'none');
  };

  useEffect(function onChecked() {}, [sortDirection]);

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
        <Icon
          width={10}
          height={6}
          fill="#172D32"
          icon={
            sortDirection === 'desc'
              ? `solid-cheveron-down`
              : sortDirection === 'asc'
              ? `solid-cheveron-up`
              : 'solid-selector'
          }
        />
      </div>
      {kind === 'radio' && !isCollapsed && (
        <RadioButtonList
          title={title ? title : undefined}
          items={_options}
          onChecked={(id: number | string) => {
            if (id === checked) {
              setIsCollapsed(true);
            } else {
              onClick(id);
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
                  onClick(opt.id);
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
