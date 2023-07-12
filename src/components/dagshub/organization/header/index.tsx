import './header.scss';
import '../../../styles/root.scss';
import React from 'react';
import { Icon } from '../../../icons';

export interface HeaderProps {
  orgImageSource: string;
  orgName: string;
  orgSite?: string;
  orgPlan: string;
  orgLink: string;
  badgeLink?: string;
}

export function Header(props: HeaderProps) {
  return (
    <div className="organization-header">
      <a href={props.badgeLink ?? undefined} className="organization-header__org-image">
        <img src={props.orgImageSource}></img>
      </a>
      <div className="org-info">
        <div className={'org-upper-info'}>
          <a href={props.orgLink} className={'org-upper-info__name'}>
            {props.orgName}
          </a>
          <span className={'org-upper-info__plan'}>{props.orgPlan} plan</span>
        </div>
        {props.orgSite && (
          <div className={'org-info__org-site'}>
            <Icon icon={'outline-link'} width={18} height={18} fill={'#64748B'} />
            <a href={props.orgSite}>{props.orgSite}</a>
          </div>
        )}
      </div>
    </div>
  );
}
