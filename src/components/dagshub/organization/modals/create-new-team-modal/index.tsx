// import React from 'react';
// import '../../../../styles/root.scss';
// import GenericModal from "../generic-modal";
// import {Icon} from "../../../icons";
// import {Button, ButtonVariant} from "../../../elements";
// import RadioButtonList from "../radio-button-list";
// import {RadioButtonItem} from "../../../forms/radio-button-item";
// import {Dropdown} from "../../../elements/dropdown";
// import {Input} from "../../../forms";
//
// export interface CreateNewTeamModalProps{
//     orgName:string;
// }
//
// export function CreateNewTeamModal(props:CreateNewTeamModalProps){
//     let elements:JSX.Element[];
//     elements=[
//         <Input label={"Team name"} helperText={"Changing the team name will break past @mentions."} width={599}/>,
//         <Input label={"Description"} helperText={"What is this team all about?"} width={599}/>,
//         <div className="input-block">
//             <Icon width={16.67} height={16.67} fill="#172D32" icon="outline-search"/>
//             <input className="search-input" type="text" placeholder="Enter username or email"></input>
//         </div>,
//         props.isOrg==true?
//             <>
//                 <RadioButtonList items={
//                     [<RadioButtonItem width={599} label="Member access to organization"
//                                       description="Description text"
//                                       icon= {<Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>}/>,
//                         <RadioButtonItem width={599} label="Admin access to organization"
//                                          description="Admins have full access to all repositories and have admin rights to the organization"
//                                          icon= {<Icon icon="outline-lock-closed" fill={"#94A3B8"} width={12} height={13.33}/>}/>]
//                 }/>
//                 {props.teams&&props.teams.length>0?
//                     <div className="dropdown">
//                         <Dropdown label={"Choose team"} width={130}/>
//                     </div>
//                     : <div className="no-teams">You haven’t created any teams yet. To leverage different permission levels for different projectsc
//                         <a className="create-team">
//                             {" "}create your first team{" "}
//                             <Icon width={9.33} height={8} fill="#5467DE" icon="outline-arrow-sm-right"/>
//                         </a>
//                     </div>
//                 }
//             </>:<></>,
//         <div className="add-member-modal__buttons-section">
//             <Button label={generateButtonText(props.isOrg, props.isAdmin, props.isTeam)} width={599}/>
//             <p className="modal-content__or">or</p>
//             <Button variant={ButtonVariant.Secondary} label={"Copy invitation link"} width={599} iconRight={<Icon icon="outline-copy" width={15} height={15} fill={"#000000"}/>}/>
//         </div>
//     ]
//     return <GenericModal title={"Create new team in "+props.orgName} elements={elements}/>
// }
