import './vertical-menu.scss';
import '../../../../styles/root.scss';
import React from 'react';
import { VerticalMenuTab, VerticalMenuTabProps } from '../vertical-menu-tab';

export interface VerticalMenuProps {
  title?: string;
  tabs: VerticalMenuTabProps[];
}

export function VerticalMenu(props: VerticalMenuProps) {
  return (
    <div className="vertical-menu">
      {props.title ? <p className={'vertical-menu__title'}>{props.title}</p> : null}
      <div className={'vertical-menu__tabs'}>
        {props.tabs?.map((tab) => (
          <VerticalMenuTab text={tab.text} href={tab.href} checked={tab.checked} />
        ))}
      </div>
    </div>
  );
}
