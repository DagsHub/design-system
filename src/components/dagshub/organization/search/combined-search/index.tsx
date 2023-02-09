import React from 'react';
import '../../../../styles/root.scss';
import './combined-search.scss';
import { UserInfoProps } from '../../profiles/user-info';
import {SearchResultList} from "../search-results";
import {Input} from "../../../../forms";

export interface CombinedSearchProps {
    onInputChange:(e: { target: { value: React.SetStateAction<string>; }; })=>void;
    inputText:string;
    resultUsers: UserInfoProps[];
    onInputClick:()=>void;
    placeholder:string;
}

export function CombinedSearch(props: CombinedSearchProps) {
    return (
        <div className={"combined-search"}>
            <Input
                type="text"
                value={props.inputText}
                onChange={props.onInputChange}
                onClick={props.onInputClick}
                width={599}
                placeholder={props.placeholder}
            />
            {props.resultUsers.length && <SearchResultList users={props.resultUsers} />}
        </div>
    )
}
