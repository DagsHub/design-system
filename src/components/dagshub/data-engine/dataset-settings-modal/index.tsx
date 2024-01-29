import React, { useEffect, useState } from 'react';
import { Icon } from '../../../icons';
import { Input } from '../../../forms';
import { GenericModal } from '../../organization';
import { ButtonVariant, Button } from '../../../elements';
import './dataset-settings-modal.scss';
import { Message } from '../../../elements/message';

export interface DatasetSettingsModal {
  name: string;
  onDelete: (args?: any) => void;
  onEdit: (args: any) => void;
  onClose: () => void;
  existingNames: string[];
  isDataset: boolean; //true- dataset; false- datasource
  onlyRemove?: boolean;
}

export function DatasetSettingsModal({
  name,
  onDelete,
  onEdit,
  onClose,
  existingNames,
  isDataset,
  onlyRemove
}: DatasetSettingsModal) {
  const [displayDeleteBtns, setDisplayDeleteBtns] = useState<boolean>(false);

  const [errNameLength, setErrNameLength] = useState<boolean>(false);
  const [errNameChars, setErrNameChars] = useState<boolean>(false);
  const [errNameExist, setErrNameExist] = useState<boolean>(false);
  const [errNameRequired, setErrNameRequired] = useState<boolean>(false);

  const nameWithIllegalCharactersErrText = `${
    isDataset ? 'Dataset' : 'Datasource'
  } name must be valid alpha or numeric or dash(-_) or dot characters.`;
  const nameLengthErrText = `${
    isDataset ? 'Dataset' : 'Datasource'
  } name cannot be empty and must contain at most 30 characters.`;
  const nameRequiredErrText = `${isDataset ? 'Dataset' : 'Datasource'} name cannot be empty.`;
  const nameExistErrText = `${isDataset ? 'Dataset' : 'Datasource'} name has already been taken.`;

  const [nameInputText, setNameInputText] = useState<string>(name);

  const onNameInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setNameInputText(e.target.value);
  };

  // useEffect(
  //   function checkNameInput() {
  //     const regexChars = /^$|^[a-zA-Z0-9-_.]+$/;
  //     const regexLength = /^.{0,30}$/;
  //     setErrNameChars(nameInputText.search(regexChars) == -1)
  //     setErrNameLength(nameInputText.search(regexLength) == -1)
  //     setErrNameExist(existingNames.includes(nameInputText.toLowerCase()))
  //     const regexp = /^(?!\s* $).+/;
  //     if(nameInputText.search(regexp) != -1) {
  //       setErrNameRequired(false)
  //     }
  //   },
  //   [nameInputText]
  // );

  let elements: JSX.Element[];
  elements = [
    <>
      {isDataset ? (
        <Message
          text={
            'Deleting a dataset will only remove the query, it won’t delete the actual files and metadata in the repository.'
          }
          kind={'warning'}
        />
      ) : (
        <Message
          text={
            'Deleting a datasource will only remove the source from the table and its associated metadata, it won’t delete the actual files in the repository.'
          }
          kind={'warning'}
        />
      )}
    </>,
    <Input
      label={
        onlyRemove
          ? `${isDataset ? 'Dataset' : 'Datasource'} name`
          : `Edit ${isDataset ? 'dataset' : 'datasource'} name`
      }
      rootMaxWidth={600}
      value={nameInputText}
      onChange={onNameInputChange}
      disabled={onlyRemove}
    />,
    <>{errNameChars && <div style={{ color: 'red' }}>{nameWithIllegalCharactersErrText}</div>}</>,
    <>{errNameLength && <div style={{ color: 'red' }}>{nameLengthErrText}</div>}</>,
    <>{errNameExist && <div style={{ color: 'red' }}>{nameExistErrText}</div>}</>,
    <>
      {errNameRequired && (
        <div style={{ color: 'red', fontSize: '12px' }}>{nameRequiredErrText}</div>
      )}
    </>,
    <>
      {!displayDeleteBtns ? (
        <div className="dataset-settings-modal__buttons">
          <Button
            width={152}
            label={`Delete ${isDataset ? 'dataset' : 'datasource'}`}
            variant={ButtonVariant.Error}
            onClick={() => setDisplayDeleteBtns(true)}
          />
          {!onlyRemove && (
            <Button
              width={120}
              disabled={errNameLength || errNameChars || errNameExist}
              label="Save changes"
              onClick={() => {
                const regexp = /^(?!\s* $).+/;
                if (nameInputText.search(regexp) == -1) {
                  setErrNameRequired(true);
                } else {
                  onEdit({
                    originalName: name,
                    newName: nameInputText
                  });
                  onClose();
                }
              }}
              variant={ButtonVariant.Primary}
            />
          )}
        </div>
      ) : (
        <div className="dataset-settings-modal__buttons">
          <div className="modal-buttons__delete-buttons">
            <Icon icon="outline-exclamation-circle" fill="#DC2626" width={20} height={20} />
            Once deleted, it can’t be undone
          </div>
          <Button
            width={230}
            variant={ButtonVariant.Error}
            onClick={() => onDelete(name)}
            label={`I understand, delete anyway`}
          />
          <Button
            width={80}
            label="Cancel"
            variant={ButtonVariant.Ghost}
            onClick={() => setDisplayDeleteBtns(false)}
          />
        </div>
      )}
    </>
  ];
  return (
    <GenericModal
      title={onlyRemove ? `Delete ${isDataset ? 'dataset' : 'datasource'}` : 'Settings'}
      elements={elements}
      onClose={onClose}
    />
  );
}
