import React from 'react';
import '../../../../styles/root.scss';
import './generic-setting-tab.scss';

export interface GenericSettingsTabProps {
  classnames?: string;
  title: string;
  elements: JSX.Element[];
}

export function GenericSettingsTab(props: GenericSettingsTabProps) {
  return (
    <div className={props.classnames ? props.classnames : 'generic-settings-tab'}>
      {props.title ? <div className="generic-settings-tab__header">{props.title}</div> : <></>}
      <div className="generic-settings-tab__elements">
        {props.elements?.map((element) => element)}
      </div>
    </div>
  );
}
