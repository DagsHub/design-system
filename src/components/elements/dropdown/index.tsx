import React from 'react';
import classNames from 'classnames';
import { Icon } from '../../icons';
import { RadioButtonItemProps, RadioButtonList } from '../../forms';

import '../../styles/root.scss';
import './dropdown.scss';

export interface DropdownOption {
  id: string;
  label: string;
  description?: string;
}

export interface DropdownProps {
  width: number;
  label: string;
  isCollapsed?: boolean;
  toggleCollapse?: () => void;
  options?: RadioButtonItemProps[];
  onItemChecked?: (id: number | string) => void;
}

export const Dropdown = ({
  width,
  label,
  options = [],
  isCollapsed = true,
  toggleCollapse = () => {},
  onItemChecked = () => {},
  ...props
}: DropdownProps & React.ButtonHTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="dagshub-dropdown" style={{ width }} {...props}>
      <div className="dagshub-dropdown__box" onClick={toggleCollapse}>
        {label}
        <Icon
          width={10}
          height={6}
          fill="#172D32"
          icon={`solid-cheveron-${isCollapsed ? 'down' : 'up'}`}
        />
      </div>
      {!isCollapsed && (
        <RadioButtonList
          className="dagshub-dropdown__options"
          items={options}
          onChecked={onItemChecked}
        />
      )}
    </div>
  );
};
