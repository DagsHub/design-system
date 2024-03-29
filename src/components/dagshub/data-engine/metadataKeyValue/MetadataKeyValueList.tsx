import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { MetadataKeyValuePair } from './MetadataKeyValuePair';
import StyledTextField from './StyledTextField';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export type MetadataType = 'BOOLEAN' | 'INTEGER' | 'FLOAT' | 'STRING' | 'BLOB';

export interface NewMetadataField {
  key?: string;
  value?: any;
  valueType?: MetadataType;
  multiple?: boolean;
  isAutoGenerated?: boolean;
  isNewlyCreated?: boolean;
}

export interface MetadataField {
  key: string;
  value: any;
  valueType: MetadataType;
  multiple?: boolean;
  isAutoGenerated?: boolean;
}

export interface MetadataKeyValueListProps {
  maxHeight?: string;
  metadataList: MetadataField[];
  editingEnabled: boolean;
  deletionEnabled: boolean;
  onDeleteHandler?: (keyName: string) => void;
  onChangeHandler?: (metadataList: NewMetadataField[]) => void;
}

export function MetadataKeyValueList({
  maxHeight,
  metadataList,
  editingEnabled,
  deletionEnabled,
  onDeleteHandler,
  onChangeHandler,
}: MetadataKeyValueListProps) {
  //Todo:
  // - Not sure what to do with the multiple field. (If I need to use it as part of the validations in the future, and also what value should I set for newly created fields).
  // - Validations that are missing:
  //  * Check whether new field created was left empty
  //  * When edit/ creating new keys, make sure the value match the value type.
  //  * When creating new keys, make sure that the new key name doesn't already exist.
  // - Not sure yet how the external save progress should work. For now, whenever I'm saving changes locally, I'm calling the external 'onChangeHandler' func.
  //    Whoever use this component will have external save button.
  // - The deletion of existing metadata field doesnt depend on the external save button.

  const [temporaryMetadataList, setTemporaryMetadataList] = useState<NewMetadataField[]>([
    ...metadataList,
  ]);
  const metadataFieldsSection = useRef(null);
  const [shouldHighlightEmptyFields, setShouldHighlightEmptyFields] = useState(false);
  const [autoFocusNewlyCreatedFieldKey, setAutoFocusNewlyCreatedFieldKey] = useState(true);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState<boolean>(false); //Should scroll to bottom only after adding new field

  useEffect(() => {
    setTemporaryMetadataList([...metadataList]);
    if (metadataFieldsSection.current) {
      (metadataFieldsSection.current as HTMLDivElement).scrollTop = 0;
    }
  }, [metadataList]);

  useEffect(() => {
    if (onChangeHandler) {
      onChangeHandler({ ...temporaryMetadataList });
    }
    if (shouldScrollToBottom && metadataFieldsSection.current) {
      // scroll to button only if + button was clicked
      (metadataFieldsSection.current as HTMLDivElement).scrollTop = (
        metadataFieldsSection.current as HTMLDivElement
      ).scrollHeight;
      setShouldScrollToBottom(false); //turn it off after scrolling
    }
    setAutoFocusNewlyCreatedFieldKey(true); //highlight again when the user adds new field
  }, [temporaryMetadataList]);

  useEffect(() => {
    if (shouldHighlightEmptyFields) {
      setTimeout(() => {
        setShouldHighlightEmptyFields(false);
      }, 1000);
    }
  }, [shouldHighlightEmptyFields]);

  const CheckIfEmptyFieldsAndHighlightThem = () => {
    const hasEmptyFields = temporaryMetadataList.some((field) => {
      return (
        field.key === undefined ||
        field.key == '' ||
        field.value === undefined ||
        field.value === '' ||
        field.valueType === undefined
      );
    });

    setShouldHighlightEmptyFields(hasEmptyFields);
    return hasEmptyFields;
  };

  const handleAddNew = () => {
    setShouldScrollToBottom(true); //scroll to button when clicking on the + button
    const hasEmptyFields = CheckIfEmptyFieldsAndHighlightThem();
    if (!hasEmptyFields) {
      //if there are no empty fields, add new field
      const newField: NewMetadataField = {
        key: undefined,
        value: '',
        valueType: undefined,
        multiple: false,
        isAutoGenerated: undefined,
        isNewlyCreated: true,
      };
      setTemporaryMetadataList((prevList) => [...prevList, newField]);
    }
  };

  const locallyEditKeyAtIndex = (index: number, newKey: string | undefined) => {
    if (temporaryMetadataList[index].isNewlyCreated) {
      setAutoFocusNewlyCreatedFieldKey(false);
    }
    setTemporaryMetadataList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], key: newKey };
      return newList;
    });
  };

  const locallyEditValueAtIndex = (index: number, newValue: string | undefined) => {
    setTemporaryMetadataList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], value: newValue };
      return newList;
    });
  };

  const locallyEditValueTypeAtIndex = (index: number, newType: MetadataType | undefined) => {
    setTemporaryMetadataList((prevList) => {
      const newList = [...prevList];
      newList[index] = { ...newList[index], valueType: newType };
      return newList;
    });
  };

  const locallyRemoveMetadataFieldByIndex = (indexToRemove: number) => {
    if (temporaryMetadataList[indexToRemove].isNewlyCreated) {
      setAutoFocusNewlyCreatedFieldKey(true); //stop highlighting the edited field
    }
    setTemporaryMetadataList((prevList) => {
      const newList = prevList.filter((_, index) => index !== indexToRemove);
      return newList;
    });
  };

  const permanentlyDeleteMetadataFieldByIndex = (indexToRemove: number) => {
    if (onDeleteHandler) {
      try {
        onDeleteHandler(metadataList[indexToRemove].key);
        setTemporaryMetadataList((prevList) => {
          const newList = prevList.filter((_, index) => index !== indexToRemove);
          return newList;
        });
      } catch (e) {}
    }
  };

  const checkIfPairIsRemovable = (metadataField: {
    key?: string;
    value?: string;
    valueType?: string;
    multiple?: boolean;
    isAutoGenerated?: boolean;
    isNewlyCreated?: boolean;
  }) => {
    if (editingEnabled && metadataField.isNewlyCreated) {
      //it should always be possible to delete newly created fields
      return true;
    }
    if (editingEnabled && deletionEnabled && !!onDeleteHandler && !metadataField.isAutoGenerated) {
      //logic for pre-existing fields
      return true;
    }
    return false;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: maxHeight ?? '100%',
        overflowX: 'hidden',
      }}
    >
      <Box
        ref={metadataFieldsSection}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          maxHeight: '100%',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {temporaryMetadataList.map((metadataField, index) => (
          <MetadataKeyValuePair
            {...metadataField}
            index={index}
            keyName={metadataField.key}
            value={String(metadataField.value)}
            isEditable={editingEnabled && !metadataField.isAutoGenerated}
            description={metadataField.isAutoGenerated ? 'Auto-generated' : undefined}
            isRemovable={checkIfPairIsRemovable(metadataField)}
            saveKeyNameLocally={locallyEditKeyAtIndex}
            saveValueTypeLocally={locallyEditValueTypeAtIndex}
            saveValueLocally={locallyEditValueAtIndex}
            shouldHighlightEmptyFields={shouldHighlightEmptyFields}
            deleteFieldPermanently={
              metadataField.isNewlyCreated
                ? locallyRemoveMetadataFieldByIndex
                : permanentlyDeleteMetadataFieldByIndex
            }
            autoFocusKey={metadataField.isNewlyCreated && autoFocusNewlyCreatedFieldKey}
          />
        ))}
      </Box>
      {editingEnabled && (
        <StyledTextField
          onClick={handleAddNew}
          sx={{
            borderBottom: '1px solid #E2E8F0',
            borderRadius: 0,
          }}
          focusModeDisabled
          changeColorOnHover
          InputProps={{
            sx: { input: { cursor: 'pointer!important' } },
            readOnly: true,
            endAdornment: (
              <IconButton>
                <AddIcon />
              </IconButton>
            ),
          }}
          value={'Add new'}
        />
      )}
    </Box>
  );
}
