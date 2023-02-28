import React, { startTransition, useState } from 'react';
import { Icon } from '../../../icons';
import { UserInfo } from '../../organization/profiles/user-info';
import { GenericTable, Row } from '../../organization/tables/generic-table';
import { TeamsModal } from '../../organization/modals/teams-modal';
import { TeamCardProps } from '../../organization/cards/team-card';
import { Dropdown } from '../../../elements/dropdown';
import {Checkbox, RadioButtonItemProps} from '../../../forms';

import './datapoints-table.scss';

export interface DataPointsTableProps {
  users: User[];
  loggedUserId: number;
  loggedUserIsOwner: boolean;
  orgName: string;
}

interface User {
  id: number;
  userImage: string;
  username: string;
  userTeams: TeamCardProps[];
  leaveLink?: string;
  removeLink?: string;
  removeMember: (args?: any) => void;
  changeMembershipVisibility?: (args?: any) => void;
  toggleTeamsModal: (args?: any) => void;
  displayTeamsModal: boolean;
  userIndex: number;
  homeLink: string;
}

const header: Row = {
  columns: [
    <div className="people-table__header one">
      <Checkbox />
      <Icon icon={"solid-cheveron-down"} width={9} height={5} fill={"#94A3B8"}/>
    </div>,
    <div className="people-table__header two">
      File name & header
      <div className={"sorting-arrows"}>
        <Icon icon={"solid-selector"} width={20} height={20} fill={"#94A3B8"}/>
      </div>
    </div>,
    <div className="people-table__header rest">
      Date created
    </div>,
    <div className="people-table__header rest">
      Size in bytes
    </div>,
    <div className="people-table__header rest">
      Dimensions
    </div>,
    <div className="people-table__header rest">
      Annotations
    </div>
  ]
};

//table width
//row height
export function DataPointsTable(props: DataPointsTableProps) {

  const rows: Row[] = [{
    columns: [
      <div className="one">
        <Checkbox />
      </div>,
      <div className="row two">
        {"Chronic Sinusitis.txt\n" +
          "\n" +
          "Description Patient having severe sinusitis about two to three months ago with facial discomfort, " +
            "nasal congestion, eye pain, and postnasal drip symptoms.(Medical Transcription Sample Report)"}
      </div>,
      <div className="row rest">22-Jan-2023 04:58:14.00 (GMT+2)</div>,
      <div className="row rest">657.8 kB</div>,
      <div className="row rest">720x720</div>,
      <div className="row rest">Annotations</div>
    ]
  },{
    columns: [
      <div className="one">
        <Checkbox />
      </div>,
      <div className="row two">{"Chronic Sinusitis.txt\n" +
          "\n" +
          "Description Patient having severe sinusitis about two to three months ago with facial discomfort, nasal congestion, eye pain, and postnasal drip symptoms.(Medical Transcription Sample Report)"}</div>,
      <div className="row rest">22-Jan-2023 04:58:14.00 (GMT+2)</div>,
      <div className="row rest">657.8 kB</div>,
      <div className="row rest">720x720</div>,
      <div className="row rest">Annotations</div>
    ]
  },{
    columns: [
      <div className="one">
        <Checkbox />
      </div>,
      <div className="row two">{"Chronic Sinusitis.txt\n" +
          "\n" +
          "Description Patient having severe sinusitis about two to three months ago with facial discomfort, nasal congestion, eye pain, and postnasal drip symptoms.(Medical Transcription Sample Report)"}</div>,
      <div className="row rest">22-Jan-2023 04:58:14.00 (GMT+2)</div>,
      <div className="row rest">657.8 kB</div>,
      <div className="row rest">720x720</div>,
      <div className="row rest">Annotations</div>
    ]
  },{
    columns: [
      <div className="one">
        <Checkbox />
      </div>,
      <div className="row two">{"Chronic Sinusitis.txt\n" +
          "\n" +
          "Description Patient having severe sinusitis about two to three months ago with facial discomfort, nasal congestion, eye pain, and postnasal drip symptoms.(Medical Transcription Sample Report)"}</div>,
      <div className="row rest">22-Jan-2023 04:58:14.00 (GMT+2)</div>,
      <div className="row rest">657.8 kB</div>,
      <div className="row rest">720x720</div>,
      <div className="row rest">Annotations</div>
    ]
  }];


  return <GenericTable header={header} rows={rows} tableWidth={1464} rowHeight={144}/>;
}
