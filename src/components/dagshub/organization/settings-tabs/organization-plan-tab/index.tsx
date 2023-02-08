import './organization-plan-tab.scss';
import React from 'react';
import '../../../../styles/root.scss';
import { Icon } from '../../../../icons';
import { GenericSettingsTab } from '../generic-setting-tab';

export interface OrganizationPlanSettingsTabProps {
  organizationPlan: string;
  seatsInUse: number;
  seatsInPlan: number;
  renewDateString: string;
}

//what should be the text for different plans
//add hrefs
//what should be displayed when I open the seats in plan dropdown
export function OrganizationPlanSettingsTab(props: OrganizationPlanSettingsTabProps) {
  let elements: JSX.Element[] = [];
  elements.push(
    <div className="organization-plan-setting-tab">
      <div className="organization-plan-setting-tab__settings">
        <div className="setting-section">
          <p>Your current Plan</p>
          <p>{props.organizationPlan} Plan</p>
        </div>
        <div className="setting-section">
          <p>Number of seats in use</p>
          <div className="seats-in-use">
            {props.seatsInUse} /
            <span className="seats-in-use__seats-in-plan">
              {props.seatsInPlan}
              <Icon icon="solid-cheveron-down" fill={'#172D32'} width={10} height={6} />
            </span>
          </div>
        </div>
      </div>
      <div className="tab-texts">
        <p className="current-plan-subscription">
          You are currently subscribed to the {props.organizationPlan} plan, scheduled to renew on{' '}
          {props.renewDateString}.
          <a href={''} className="current-plan-subscription__update-text">
            Update payment method, personal details, see invoices, or cancel plan
            <Icon icon="outline-arrow-sm-right" fill={'#5467DE'} width={9.33} height={8} />
          </a>
        </p>
        <p className="questions-text">
          Questions?
          <a target="_blank" href="mailto:sales@dagshub.com" className="questions-text__mail">
            Contact us at sales@dagshub.com
            <Icon icon="outline-arrow-sm-right" fill={'#5467DE'} width={9.33} height={8} />
          </a>
        </p>
      </div>
    </div>
  );
  return <GenericSettingsTab title={'Organization Plan'} elements={elements} />;
}
