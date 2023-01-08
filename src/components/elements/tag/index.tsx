import React from 'react';
import classNames from 'classnames';

import './tag.css';

export enum TagCategory {
  General = 'general',
  Task = 'task',
  DataDomain = 'data-domain',
  Framework = 'framework',
  Integration = 'integration',
  Type = 'type'
}

export enum TagSize {
  Small = 'sm',
  Medium = 'md',
  Large = 'lg'
}

export interface TagProps {
  category?: TagCategory;
  size?: TagSize;
  label: string;
  selected?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Tag = ({
  category = TagCategory.General,
  size = TagSize.Medium,
  selected = false,
  label,
  className = '',
  onClick = () => {}
}: TagProps & React.LabelHTMLAttributes<HTMLLabelElement>) => {
  const classes = classNames(
    [`dagshub-tag`, `dagshub-tag--${category}`, `dagshub-tag--${size}`, className],
    {
      selected
    }
  );

  return (
    <label className={classes} onClick={onClick}>
      {label}
    </label>
  );
};
