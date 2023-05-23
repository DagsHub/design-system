import React, { useEffect, useState } from 'react';
import { Icon } from '../../../icons';
import { Input } from '../../../forms';
import {GenericModal} from "../../organization";
import { ButtonVariant, Button} from "../../../elements";
import './dataset-settings-modal.scss';

export interface DatasetSettingsModal {
  datasetName: string;
  onDeleteDataset: (args?: any) => void;
  onEditDataset: (args: any) => void;
  onClose: () => void;
  existingDatasetsNames:string[];
}

export function DatasetSettingsModal({
  datasetName,
  onDeleteDataset,
  onEditDataset,
  onClose,
  existingDatasetsNames,
}: DatasetSettingsModal) {
  const [displayDeleteBtns, setDisplayDeleteBtns] = useState<boolean>(false);

  const [errDatasetNameLength, setErrDatasetNameLength] = useState<boolean>(false);
  const [errDatasetNameChars, setErrDatasetNameChars] = useState<boolean>(false);
  const [errDatasetNameExist, setErrDatasetNameExist] = useState<boolean>(false);
  const [errDatasetNameRequired, setErrDatasetNameRequired] = useState<boolean>(false);

  const datasetNameWithIllegalCharactersErrText="Dataset name must be valid alpha or numeric or dash(-_) or dot characters."
  const datasetNameLengthErrText="Dataset name cannot be empty and must contain at most 30 characters."
  const datasetNameRequiredErrText="Dataset name cannot be empty."
  const datasetNameExistErrText="Dataset name has already been taken."

  const [datasetNameInputText, setDatasetNameInputText] = useState<string>(datasetName);

  const onDatasetNameInputChange = (e: { target: { value: React.SetStateAction<string> } }) => {
    setDatasetNameInputText(e.target.value);
  };

  useEffect(
    function checkDatasetNameInput() {
      const regexChars = /^$|^[a-zA-Z0-9-_.]+$/;
      const regexLength = /^.{0,30}$/;
      setErrDatasetNameChars(datasetNameInputText.search(regexChars) == -1)
      setErrDatasetNameLength(datasetNameInputText.search(regexLength) == -1)
      setErrDatasetNameExist(existingDatasetsNames.includes(datasetNameInputText.toLowerCase()))
      const regexp = /^(?!\s* $).+/;
      if(datasetNameInputText.search(regexp) != -1) {
        setErrDatasetNameRequired(false)
      }
    },
    [datasetNameInputText]
  );

  let elements: JSX.Element[];
  elements = [
    <Input
      label="Edit dataset name"
      rootMaxWidth={600}
      value={datasetNameInputText}
      onChange={onDatasetNameInputChange}
    />,
      <>{errDatasetNameChars&&<div style={{color:"red"}}>{datasetNameWithIllegalCharactersErrText}</div>}
      </>,
    <>{errDatasetNameLength&&<div style={{color:"red"}}>{datasetNameLengthErrText}</div>}
    </>,
    <>{errDatasetNameExist&&<div style={{color:"red"}}>{datasetNameExistErrText}</div>}
    </>,
    <>{errDatasetNameRequired&&<div style={{color:"red", fontSize:"12px"}}>{datasetNameRequiredErrText}</div>}
    </>,
    <>
      {!displayDeleteBtns ? (
        <div className="dataset-settings-modal__buttons">
          <Button
            width={110}
            label="Delete dataset"
            variant={ButtonVariant.Error}
            onClick={() => setDisplayDeleteBtns(true)}
          />
          <Button
            width={120}
            disabled={errDatasetNameLength||errDatasetNameChars||errDatasetNameExist}
            label="Save changes"
            onClick={() => {
              const regexp = /^(?!\s* $).+/;
              if (datasetNameInputText.search(regexp) == -1) {
                setErrDatasetNameRequired(true)
              } else {
                onEditDataset({
                  originalName: datasetName,
                  newName: datasetNameInputText,
                });
                onClose();
              }
            }
            }
            variant={ButtonVariant.Primary}
          />
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
            onClick={() => onDeleteDataset(datasetName)}
            label="I understand, delete this dataset"
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
  return <GenericModal title="Settings" elements={elements} onClose={onClose} />;
}
