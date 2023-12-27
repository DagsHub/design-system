import React, { useEffect, useState } from 'react';
import {
  AndOrMetadataInput,
  BlobOperators,
  BooleanOperators,
  Comparator,
  FloatOperators,
  IntegerOperators,
  MetadataFieldProps,
  Operators,
  StringOperators
} from './ConditionHelperFunctionsAndTypes';
import { MetadataType } from '../metadataKeyValue/MetadataKeyValueList';
import { ConditionDropdown } from './ConditionDropdown';
import { Box, Menu, MenuItem, ThemeProvider, Typography } from '@mui/material';
import ConditionTextField from './ConditionTextField';
import { Button, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import theme from '../../../../theme';

const SimpleCondition = ({
  condition,
  onChange,
  metadataFields,
  isSimple,
  onRemove,
  onAdd,
  verifyCondition
}: {
  condition: AndOrMetadataInput;
  onChange: any;
  metadataFields: MetadataFieldProps[];
  onRemove?: any;
  onAdd?: any;
  isSimple?: boolean;
  verifyCondition: (valueType: MetadataType, value: string) => boolean;
}) => {
  const [operatorsList, setOperatorsList] =
    useState<{ label: string; id: Comparator }[]>(Operators);
  const [shouldDisplayValueField, setShouldDisplayValueField] = useState<boolean>(true);
  const [isErrored, setIsErrored] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const conditionAddButtonRef = React.useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!!condition?.filter?.valueType) {
      switch (condition.filter.valueType) {
        case 'STRING':
          setOperatorsList(StringOperators);
          break;
        case 'INTEGER':
          setOperatorsList(IntegerOperators);
          break;
        case 'FLOAT':
          setOperatorsList(FloatOperators);
          break;
        case 'BOOLEAN':
          setOperatorsList(BooleanOperators);
          break;
        case 'BLOB':
          setOperatorsList(BlobOperators);
          break;
      }
    }
  }, [condition.filter?.key]);

  useEffect(() => {
    if (!!condition.filter?.comparator) {
      switch (condition.filter.comparator) {
        case 'IS_NULL':
        case 'IS_NEGATIVE_INFINITY':
        case 'IS_POSITIVE_INFINITY':
        case 'IS_NAN':
          setShouldDisplayValueField(false);
          onChange({ ...condition, filter: { ...condition.filter, value: undefined } });
          break;
        default:
          setShouldDisplayValueField(true);
          break;
      }
    }
  }, [condition.filter?.comparator]);

  useEffect(() => {
    // check if comparator exists in operatorsList, and if not, change the comparator to the first one in the list
    if (!!condition.filter?.comparator) {
      const comparatorExists = operatorsList.some((op) => op.id === condition.filter?.comparator);
      if (!comparatorExists) {
        onChange({
          ...condition,
          filter: { ...condition.filter, comparator: operatorsList[0].id }
        });
      }
    }

    //Whenever the operatorsList changes, change the comparator to the first one in the list
    // onChange({...condition, filter: {...condition.filter, comparator: operatorsList[0].id}});
  }, [operatorsList]);

  useEffect(() => {
    if (!!condition.filter?.valueType && !!condition.filter?.value) {
      setIsErrored(!verifyCondition(condition.filter?.valueType, condition.filter?.value));
    } else {
      setIsErrored(false);
    }
  }, [condition.filter?.valueType, condition.filter?.value]);

  const isEmpty =
    !condition.filter?.key || !condition.filter?.comparator || !condition.filter?.value;
  const selectedMetadataKey = metadataFields.find((field) => field.name === condition.filter?.key);
  const selectedOperator = operatorsList.find(
    (operator) => operator.id === condition.filter?.comparator
  );

  // Simple condition
  return (
    <ThemeProvider theme={theme}>
      <Box style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
        {!isSimple && condition.not && (
          <Box
            style={{
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              flexDirection: 'row',
              gap: '8px',
              padding: '4px 8px',
              backgroundColor: 'rgba(241, 245, 249, 1)',
              borderRadius: '8px',
              border: '1px solid rgba(226, 232, 240, 1)',
              boxSizing: 'border-box',
              height: '28px'
            }}
          >
            <Typography variant={'medium'} style={{ color: 'rgba(84, 103, 222, 1)' }}>
              NOT
            </Typography>
            <span style={{ display: 'flex', cursor: 'pointer' }}>
              <Icon
                onClick={() => onChange({ ...condition, not: !condition.not })}
                icon={'solid-x-circle'}
                width={16}
                height={16}
                fill={'rgba(148, 163, 184, 1)'}
              />
            </span>
          </Box>
        )}
        {condition.not && (
          <Box
            style={{
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              padding: '4px 8px',
              backgroundColor: 'rgba(241, 245, 249, 1)',
              borderRadius: '8px',
              border: '1px solid rgba(226, 232, 240, 1)',
              boxSizing: 'border-box',
              height: '28px'
            }}
          >
            <Typography variant={'medium'}>(</Typography>
          </Box>
        )}
        <ConditionDropdown
          removeEndAdornment={true}
          alignInputTextToCenter={true}
          initialChecked={
            selectedMetadataKey
              ? { id: selectedMetadataKey.name, label: selectedMetadataKey.name }
              : undefined
          }
          label={'Choose metadata key'}
          onChange={(e, value) => {
            onChange({
              ...condition,
              filter: {
                ...condition.filter,
                key: value?.id,
                valueType: metadataFields.find((field) => field.name === value?.label)?.valueType
              }
            });
          }}
          options={metadataFields?.map((field) => ({ id: field.name, label: field.name }))}
        />
        <ConditionDropdown
          removeEndAdornment
          alignInputTextToCenter={true}
          inputColor={'rgba(84, 103, 222, 1)'}
          initialChecked={
            selectedOperator
              ? { id: selectedOperator.id, label: selectedOperator.label }
              : undefined
          }
          label={''}
          onChange={(e, value) => {
            onChange({ ...condition, filter: { ...condition.filter, comparator: value?.id } });
          }}
          options={operatorsList?.map((op) => ({ id: op.id, label: op.label }))}
        />
        {shouldDisplayValueField && (
          <ConditionTextField
            value={condition.filter?.value}
            placeholder={'Enter value'}
            disabled={false}
            onChange={(newVal) =>
              onChange({
                ...condition,
                filter: { ...condition.filter, value: newVal }
              })
            }
            helperText={isErrored ? `Value is not valid` : ''}
            isErrored={isErrored}
          />
        )}
        {condition.not && (
          <Box
            style={{
              display: 'flex',
              width: 'fit-content',
              alignItems: 'center',
              padding: '4px 8px',
              backgroundColor: 'rgba(241, 245, 249, 1)',
              borderRadius: '8px',
              border: '1px solid rgba(226, 232, 240, 1)',
              boxSizing: 'border-box',
              height: '28px'
            }}
          >
            <Typography variant={'medium'}>)</Typography>
          </Box>
        )}
        <Button
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            padding: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}
          label={''}
          variant={ButtonVariant.Ghost}
          onClick={onRemove}
          iconRight={
            <Icon icon={'solid-trash'} width={14} height={16} fill={'rgba(100, 116, 139, 1)'} />
          }
        />
        <Button
          ref={conditionAddButtonRef}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            padding: '8px',
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex'
          }}
          label={''}
          onClick={() => {
            if (isSimple) {
              onAdd();
            } else {
              setIsOpen(true);
            }
          }}
          variant={ButtonVariant.Ghost}
          iconRight={
            <Icon icon={'solid-plus'} width={14} height={16} fill={'rgba(100, 116, 139, 1)'} />
          }
        />
        <Menu
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '12px'
            },
            padding: '8px'
          }}
          id="basic-menu"
          anchorEl={conditionAddButtonRef.current}
          open={isOpen}
          onClose={() => setIsOpen(false)}
          MenuListProps={{
            'aria-labelledby': 'basic-button'
          }}
        >
          <MenuItem
            onClick={() => {
              onAdd();
              setIsOpen(false);
            }}
          >
            <Typography variant={'medium'}>Add condition</Typography>
          </MenuItem>
          {!isSimple && !condition.not && (
            <MenuItem
              onClick={() => {
                onChange({ ...condition, not: !condition.not });
                setIsOpen(false);
              }}
            >
              <Typography variant={'medium'}>Add NOT to condition</Typography>
            </MenuItem>
          )}
        </Menu>
        {isEmpty && (
          <Box style={{ height: '28px', display: 'flex', alignItems: 'center' }}>
            <Typography variant={'thin'} style={{ color: 'rgba(71, 85, 105, 1)' }}>
              {' '}
              *Required
            </Typography>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default SimpleCondition;
