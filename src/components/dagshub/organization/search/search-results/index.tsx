import React from 'react';
import '../../../../styles/root.scss';
import './search-results.scss';
import {UserInfo} from "../../profiles/user-info";
import {Icon} from "../../../../icons";
import {Row, GenericTable} from "../../tables/generic-table";
import {Button, ButtonStretch, ButtonVariant} from "../../../../elements";

export interface SearchResultListProps{
    users:User[];
}

 interface User{
    userImage: string,
    fullName: string,
    username: string
}

export function SearchResultList(props:SearchResultListProps) {
    let rows: Row[]=[];
    for (let user of props.users) {
        let row :Row={
            rowClasses:"row",
            columns: [
                <UserInfo imageSource={user.userImage} fullName={user.fullName} userName={user.username}/>,
                <Button variant={ButtonVariant.Secondary} stretch={ButtonStretch.Slim}
                    iconRight={<Icon width={12} height={12} fill="#172D32" icon="outline-plus"/>}
                    label={"Add member"}
                />
            ]
        }
        rows.push(row);
    }
    return <GenericTable classnames={"search-result-list"} rows={rows}/>
}
