import React, {useState} from 'react';
import { Icon } from '../../../icons';
import '../../../styles/root.scss';
import '../shared-styles/table.scss';
import GenericTable, {Row} from "../generic-table";
import UserInfo from "../user-info";
import {UserPermissionForTeam} from "../people-table";
import {Button, ButtonStretch, ButtonVariant} from "../../../elements";
import '../../../styles/root.scss';
import '../shared-styles/table.scss';

export interface TeamTableProps {
  users:User[];
  team:Team;
}

export interface User{
  userImage: string,
  fullName: string,
  username: string
}

export interface Team {
  name:string;
  description:string;
  teamPermission:UserPermissionForTeam;
  teamRepos:Repo[];
}

export interface Repo{
  name:string;
}

//add functionality, tooltip
//change its css to BEM
//add (you) annotation to relevant user

export default function TeamTable(props:TeamTableProps) {
    const [style, setStyle] = useState("none");
    const [isActive, setActive] =useState(false)

    const handleClick = () => {
        setActive(current=>!current)
        setStyle(style => style==="none"? style = "flex": style="none")
    };

    let header:Row;
    header={
      columns: [
        <span className="left-side">
          <span className="header__team-name">{props.team.name}</span>
          <span className="header__team-description">{props.team.description}</span>
        </span>,
        <span className="right-side">
            <Button variant={ButtonVariant.Ghost} stretch={ButtonStretch.Slim}
                    iconLeft={<Icon width={10.67} height={10.67} fill="#172D32" icon="solid-plus"/>}
                    label={"Add new team member"}
            />
          <span className="dots-vertical-icon">
            <Icon width={3} height={13.5} fill="#64748B" icon="outline-dots-vertical"/>
          </span>
        </span>
      ]
    }

    let rows: Row[]=[];
    props.users.forEach((user, userIndex)=> {
        let row :Row={
          columns: [
            <UserInfo imageSource={user.userImage} fullName={user.fullName} userName={user.username}/>,
              <Button variant={ButtonVariant.Secondary}
                      iconRight={<Icon width={12} height={13.33} fill="#111827" icon="outline-trash"/>}
                      label={"Remove from team"} width={179}
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
        <span className="footer-left-section">
          <span className="permission">
            Team has
            <span className="permission-label">
              {props.team.teamPermission}
              <Icon width={10} height={6} fill="#172D32" icon="solid-cheveron-down"/>
            </span>
            to following repositories:
          </span>
          <span className="team-repos">
            {props.team.teamRepos?.map((repo: Repo) =>
              <span className="repo">
                <Icon width={16} height={21} fill="#172D32" icon="outline-repository-github"/>
                {repo.name}
              </span>
            )}
          </span>
        </span>,
        <span className="all-team-projects">
          See all teams projects
          <Icon width={9.33} height={8} fill="#5467DE" icon="outline-arrow-sm-right"/>
        </span>
      ]
    }
    return <GenericTable header={header} rows={rows} footer={footer}/>
}



