import React, {useState} from 'react';
import { Icon } from '../../../../icons';
import '../../../../styles/root.scss';
import {Row, GenericTable} from "../generic-table";
import {UserInfo} from "../../profiles/user-info";
import {UserPermissionForTeam} from "../shared-classes";
  import {Button, ButtonStretch, ButtonVariant} from "../../../../elements";
import '../../../../styles/root.scss';
import '../generic-table/table.scss';
import "./teams-table.scss"

export interface TeamTableProps {
  members:Member[];
  teamName:string;
  teamDescription:string;
  teamPermission?:UserPermissionForTeam;
  teamRepos?:Repo[];
}

export interface Member{
    username:string;
    fullName:string;
    homeLink:string;
    relAvatarLink:string;
}


export interface Repo{
  name:string;
}

//add functionality, tooltip
//change its css to BEM
//add (you) annotation to relevant user

export function TeamTable(props:TeamTableProps) {
    const [style, setStyle] = useState("none");
    const [isActive, setActive] =useState(false)

    const handleClick = () => {
        setActive(current=>!current)
        setStyle(style => style==="none"? style = "flex": style="none")
    };

    let header:Row;
    header={
      columns: [
        <span className="teams-table-left-side-header">
          <span className="teams-table-left-side-header__team-name">{props.teamName}</span>
          <span className="teams-table-left-side-header__team-description">{props.teamDescription}</span>
        </span>,
        <span className="teams-table-right-side-header">
            <Button variant={ButtonVariant.Ghost} stretch={ButtonStretch.Slim}
                    iconLeft={<Icon width={10.67} height={10.67} fill="#172D32" icon="solid-plus"/>}
                    label={"Add new team member"}
            />
          <span className="teams-table-right-side-header__dots-vertical-icon">
            <Icon width={3} height={13.5} fill="#64748B" icon="outline-dots-vertical"/>
          </span>
        </span>
      ]
    }

    let rows: Row[]=[];
    props.members.forEach((member, userIndex)=> {
        let row :Row={
          columns: [
            <UserInfo imageSource={member.relAvatarLink} fullName={member.fullName} userName={member.username}/>,
              <Button variant={ButtonVariant.Secondary}
                      iconRight={<Icon width={12} height={13.33} fill="#111827" icon="outline-trash"/>}
                      label={"Remove from team"} width={175}
              />
          ],
          style: userIndex>6?{display:style}:{}
        }
        rows.push(row);
    });

    let row :Row={
      columns: [
        <span>{isActive?"Collapse":"See all team members"}</span>,
        <Icon width={8} height={4.8} fill="#172D32" icon={isActive? "solid-cheveron-up":"solid-cheveron-down"}/>
      ],
      rowClasses: "table__collapse",
      onClick: handleClick
    }
    rows.push(row);

    let footer:Row;
    footer={
      columns: [
        <span className="teams-table-footer-left-section">
          <span className="teams-table-footer-left-section__permission-text">
            Team has
            <span className="teams-table-footer-left-section__permission-label">
              {props.teamPermission}
              <Icon width={10} height={6} fill="#172D32" icon="solid-cheveron-down"/>
            </span>
            to following repositories:
          </span>
          <span className="team-repos">
            {props.teamRepos?.map((repo: Repo) =>
              <span className="team-repos__repo">
                <Icon width={16} height={21} fill="#172D32" icon="outline-repository-github"/>
                {repo.name}
              </span>
            )}
          </span>
        </span>,
        <span className="teams-table-footer-right-section">
          See all teams projects
          <Icon width={9.33} height={8} fill="#5467DE" icon="outline-arrow-sm-right"/>
        </span>
      ]
    }
    return <GenericTable header={header} rows={rows} footer={footer}/>
}



