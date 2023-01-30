import React from 'react';
import '../../../styles/root.scss';
import GenericModal from "../generic-modal";
import {Icon} from "../../../icons";
import {Button, ButtonVariant} from "../../../elements";
import RadioButtonList from "../radio-button-list";
import {RadioButtonItem} from "../../../forms/radio-button-item";
import {Dropdown} from "../../../elements/dropdown";

export interface AddMemberModalProps{
    isOrg: boolean;
    isAdmin: boolean;
    isTeam: boolean;
    name: string;
    teams?: string[] ;
}

export function AddMemberModal(props:AddMemberModalProps){
    const generateModalTitle=(isOrg: boolean, isAdmin: boolean, isTeam: boolean, name: string)=> {
        let title = "";
        title += "Add new ";
        title += props.isOrg && props.isAdmin ? 'organization admin' : 'member';
        title += " to " + props.name + " ";
        title += props.isTeam ? ' team' : '';
        return title;
    }

    const generateButtonText=(isOrg: boolean, isAdmin: boolean, isTeam: boolean)=> {
        let text = "";
        text+="Add new ";
        text+=props.isTeam ? 'team ' : 'organization ';
        text+=props.isOrg && props.isAdmin ? 'admin' : 'member';
        return text;
    }

    let title=generateModalTitle(props.isOrg, props.isAdmin, props.isTeam, props.name);
    let elements:JSX.Element[];
    elements=[
        <p className="modal-content__instructions">
          Search by username or name or enter email address to invite someone outside {props.name}
        </p>,
        <div className="input-block">
          <Icon width={16.67} height={16.67} fill="#172D32" icon="outline-search"/>
          <input className="search-input" type="text" placeholder="Enter username or email"></input>
        </div>,
        props.isOrg==true?
        <>
            <RadioButtonList items={
                [<RadioButtonItem width={599} label="Member access to organization"
                                  description="Description text"
                                  icon= {<Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>}/>,
                    <RadioButtonItem width={599} label="Admin access to organization"
                                     description="Admins have full access to all repositories and have admin rights to the organization"
                                     icon= {<Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>}/>]
            }/>
            {props.teams&&props.teams.length>0?
                <div className="dropdown">
                    <Dropdown label={"Choose team"} width={130}/>
                </div>
                : <div className="no-teams">You haven’t created any teams yet. To leverage different permission levels for different projectsc
                <a className="create-team">
                    {" "}create your first team{" "}
                    <Icon width={9.33} height={8} fill="#5467DE" icon="outline-arrow-sm-right"/>
                </a>
                </div>
            }
        </>:<></>,
        <div className="add-member-modal__buttons-section">
            <Button label={generateButtonText(props.isOrg, props.isAdmin, props.isTeam)} width={599}/>
            <p className="modal-content__or">or</p>
            <Button variant={ButtonVariant.Secondary} label={"Copy invitation link"} width={599} iconRight={<Icon icon="outline-copy" width={15} height={15} fill={"#000000"}/>}/>
        </div>
    ]
    return <GenericModal title={title} elements={elements}/>
}


//if organization, add radio buttons
//if organization and first time- show message for team creation, if not first time, show teams dropdown
//what should be the description text
//create generic element for dropdown
//use generic input component in the modal
