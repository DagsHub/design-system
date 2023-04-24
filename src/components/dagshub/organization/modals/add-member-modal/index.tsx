import _ from 'lodash';
import React, { ChangeEvent, useState } from 'react';
import isEmail from 'validator/lib/isEmail';

import { Icon } from '../../../../icons';
import { GenericModal } from '../generic-modal';
import { UserInfoProps } from '../../profiles/user-info';
import { Dropdown } from '../../../../elements/dropdown';
import { CombinedSearch } from '../../search/combined-search';
import { Button, ButtonVariant } from '../../../../elements/button';
// import { RadioButtonList } from '../../../../forms/radio-button/radio-button-list';

import '../../../../styles/root.scss';
import './add-member-modal.scss';

function getEmailMembers(membersInput: string) {
  return _(membersInput.split(/,/))
    .map(_.trim)
    .filter((val: string) => isEmail(val))
    .value();
}

export interface AddMemberModalProps {
  isOrg: boolean;
  isAdmin: boolean;
  isTeam: boolean;
  name: string;
  teams?: { id: number | string; name: string }[];
  onClose?: () => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  inputText: string;
  resultUsers?: UserInfoProps[];
  placeholder?: string;
  addMembers: (args?: any) => void;
  copyInvitationAction: (args?: any) => void;
}

export function AddMemberModal({
  isOrg,
  isAdmin,
  isTeam,
  name,
  teams = [],
  onClose = () => {},
  onInputChange,
  inputText,
  resultUsers = [],
  placeholder = '',
  addMembers,
  copyInvitationAction
}: AddMemberModalProps) {
  const [team, setTeam] = useState<number | string>('');
  const [access, setAccess] = useState<string>('member-access');
  const [addedMembers, setAddedMembers] = useState<UserInfoProps[]>([]);
  // const [copyInvitation, setCopyInvitation] = useState<boolean>(false);

  function onAddMember(user: UserInfoProps) {
    setAddedMembers([...addedMembers, user]);
    onInputChange({ target: { value: '' } } as any);
  }

  function onRemoveMember(username: string) {
    setAddedMembers(addedMembers.filter((u) => u.userName !== username));
  }

  const elements: JSX.Element[] = [
    <p className="add-member-modal__instructions">
      Search by username or name or enter email address to invite someone outside {name}
    </p>,
    <div className="input-block">
      <CombinedSearch
        onAdd={onAddMember}
        inputText={inputText}
        placeholder={placeholder}
        itemsList={addedMembers}
        onRemove={onRemoveMember}
        onInputChange={onInputChange}
        resultUsers={(resultUsers ?? []).filter(
          (u: UserInfoProps) => !addedMembers.find((m) => m.userName === u.userName)
        )}
      />
    </div>,
    // isOrg ? (
    //   <>
    //     <RadioButtonList
    //       initialChecked={access}
    //       onChecked={setAccess}
    //       items={[
    //         {
    //           id: 'member-access',
    //           width: 600,
    //           label: 'Member access to organization',
    //           description:
    //             'Members have no special access by default. Grant them repository access once they are added.',
    //           icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
    //         },
    //         {
    //           id: 'admin-access',
    //           width: 600,
    //           label: 'Admin access to organization',
    //           description:
    //             'Admins have full access to all repositories and have admin rights to the organization',
    //           icon: <Icon icon="outline-lock-closed" fill="#94A3B8" width={12} height={13} />
    //         }
    //       ]}
    //     />
    //     {teams?.length && false ? (
    //       <div className="add-member-modal__dropdown">
    //         <Dropdown
    //           kind="checkbox"
    //           width={130}
    //           label="Select teams"
    //           onItemChecked={setTeam}
    //           maxHeight={125}
    //           options={teams.map((team: any) => ({ id: team.id, label: team.name }))}
    //         />
    //       </div>
    //     ) : (
    //       !isAdmin && (
    //         <div className="add-member-modal__no-teams-text">
    //           You haven’t created any teams yet. To leverage different permission levels for
    //           different projects
    //           <a className="add-member-modal__create-team-text">
    //             {' '}
    //             create your first team{' '}
    //             <Icon width={9} height={8} fill="#5467DE" icon="outline-arrow-sm-right" />
    //           </a>
    //         </div>
    //       )
    //     )}
    //   </>
    // ) : (
    //   <></>
    // ),
    <div className="add-member-modal__buttons-section">
      <Button
        label={`Add new ${isTeam ? 'team' : 'organization'} ${
          isOrg && isAdmin ? 'admin' : 'member'
        }`}
        width={600}
        onClick={() =>
          addMembers({
            team,
            access,
            members: addedMembers,
            invitees: getEmailMembers(inputText)
          })
        }
      />
      {/*<p className="add-member-modal__buttons-seperator">or</p>*/}
      {/*<Button*/}
      {/*  width={600}*/}
      {/*  label={copyInvitation ? 'The link was copied to your clipboard' : 'Copy invitation link'}*/}
      {/*  variant={ButtonVariant.Secondary}*/}
      {/*  iconRight={*/}
      {/*    copyInvitation ? (*/}
      {/*      <Icon icon="outline-check" width={11} height={8} fill="#000000" />*/}
      {/*    ) : (*/}
      {/*      <Icon icon="outline-copy" width={15} height={15} fill="#000000" />*/}
      {/*    )*/}
      {/*  }*/}
      {/*  onClick={() => {*/}
      {/*    setCopyInvitation(!copyInvitation);*/}
      {/*    copyInvitationAction();*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  ];

  return (
    <GenericModal
      title={`Add new ${isOrg && isAdmin ? 'organization admin' : 'member'} to ${name}${
        isTeam ? ' team' : ''
      }`}
      elements={elements}
      onClose={onClose}
    />
  );
}

//if organization, add radio buttons
//if organization and first time- show message for team creation, if not first time, show teams dropdown
//what should be the description text
//create generic element for dropdown
//use generic input component in the modal
