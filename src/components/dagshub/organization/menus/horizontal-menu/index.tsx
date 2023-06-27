import './horizontal-menu.scss';
import '../../../../styles/root.scss';
import React from 'react';
import { HorizontalMenuTab, HorizontalMenuTabProps } from '../horizontal-menu-tab';
import { Dropdown } from '../../../../elements';

export interface HorizontalMenuProps {
  tabs: HorizontalMenuTabProps[];
  full?: boolean;
}

export function HorizontalMenu(props: HorizontalMenuProps) {
  return (
    <div
      className={'horizontal-menu'}
      style={{
        maxWidth: props.full ? '100%' : '1216px',
        paddingRight: props.full ? '24px' : '0px',
        paddingLeft: props.full ? '28px' : '0px'
      }}
    >
      {props.tabs?.map((tab, i) => (
        <HorizontalMenuTab
          key={`${tab.text}-${i}`}
          text={tab.text}
          count={tab.count}
          icon={tab.icon}
          href={tab.href}
          checked={tab.checked}
          iconRight={tab.iconRight}
          onClick={tab.onClick}
        />
      ))}
    </div>
  );
}
