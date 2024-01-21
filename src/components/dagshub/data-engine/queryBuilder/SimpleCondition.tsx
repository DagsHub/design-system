import React, { useEffect, useState } from 'react';
import { ConditionDropdown } from './ConditionDropdown';
import {Box, Divider, IconButton, Menu, MenuItem, ThemeProvider, Tooltip, Typography} from '@mui/material';
import ConditionTextField from './ConditionTextField';
import { Button, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import theme from '../../../../theme';
import AddIcon from '@mui/icons-material/Add';
import {
  AndOrMetadataInput,
  Comparator,
  MetadataFieldProps,
  Operators,
  useQueryBuilderContext
} from './QueryBuilderContext';

export function SimpleCondition({
  condition,
  onChange,
  onRemove,
  onAdd
}: {
  condition: AndOrMetadataInput;
  onChange: any;
  onRemove: () => void;
  onAdd: () => void;
}) {
  const {
    isSimpleMode,
    validateValueByType,
    metadataFieldsList,
    getOperatorsByMetadataType,
    checkIfOperatorRequiresValueField
  } = useQueryBuilderContext();

  const [operatorsList, setOperatorsList] = useState<{ label: string; id: Comparator }[]>(
    condition?.filter?.valueType
      ? getOperatorsByMetadataType(condition.filter.valueType)
      : Operators
  );
  const [shouldDisplayValueField, setShouldDisplayValueField] = useState<boolean>(
    condition.filter?.comparator
      ? checkIfOperatorRequiresValueField(condition.filter?.comparator)
      : false
  );
  const [isErrored, setIsErrored] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  function checkIfConditionIsUncompleted() {
    return (
      !(condition.filter?.valueType == 'STRING' && condition.filter?.comparator == 'EQUAL') &&
      ((!condition.filter?.value && shouldDisplayValueField) ||
        !condition.filter?.key ||
        !condition.filter?.comparator)
    );
  }

  const [isEmpty, setIsEmpty] = useState<boolean>(checkIfConditionIsUncompleted());

  function getSelectedMetadataKey() {
    return metadataFieldsList?.find((field) => field.name === condition.filter?.key);
  }

  const [selectedMetadataKey, setSelectedMetadataKey] = useState<MetadataFieldProps | undefined>(
    getSelectedMetadataKey()
  );

  function getSelectedComparator() {
    return operatorsList?.find((operator) => operator.id === condition.filter?.comparator);
  }

  const [selectedOperator, setSelectedOperator] = useState<
    { label: string; id: Comparator } | undefined
  >(getSelectedComparator());

  useEffect(() => {
    setIsEmpty(checkIfConditionIsUncompleted());
  }, [condition]);

  useEffect(() => {
    setSelectedMetadataKey(getSelectedMetadataKey());
  }, [metadataFieldsList, condition.filter?.key]);

  useEffect(() => {
    setSelectedOperator(getSelectedComparator());
  }, [operatorsList, condition.filter?.comparator]);

  useEffect(() => {
    if (!!condition?.filter?.valueType) {
      setOperatorsList(getOperatorsByMetadataType(condition.filter.valueType));
    }
  }, [condition?.filter?.valueType]);

  useEffect(() => {
    if (!!condition.filter?.comparator) {
      if (checkIfOperatorRequiresValueField(condition.filter.comparator)) {
        setShouldDisplayValueField(true);
      } else {
        setShouldDisplayValueField(false);
        onChange({ ...condition, filter: { ...condition.filter, value: '' } });
      }
    }
  }, [condition.filter?.comparator]);

  useEffect(() => {
    // check if comparator exists in operatorsList, and if not, change the comparator to the first one in the list
    if (!!condition.filter?.comparator) {
      const comparatorExists = operatorsList?.some((op) => op.id === condition.filter?.comparator);
      if (!!operatorsList && !comparatorExists) {
        onChange({
          ...condition,
          filter: { ...condition.filter, comparator: operatorsList[0].id }
        });
      }
    }
  }, [operatorsList]);

  useEffect(() => {
    if (
      !!condition.filter?.valueType &&
      !!condition.filter?.value &&
      !!condition.filter?.comparator
    ) {
      setIsErrored(
        !validateValueByType(
          condition.filter.valueType,
          condition.filter.value,
          condition.filter.comparator
        )
      );
    } else {
      setIsErrored(false);
    }
  }, [condition.filter?.valueType, condition.filter?.value]);

  return (
    <ThemeProvider theme={theme}>
      <Box style={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
        {!isSimpleMode && condition.not && (
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
          alignInputTextToCenter={false}
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
                valueType: metadataFieldsList.find((field) => field.name === value?.label)
                  ?.valueType
              }
            });
          }}
          options={metadataFieldsList?.map((field) => ({ id: field.name, label: field.name }))}
        />
        <ConditionDropdown
          isReadOnly={true}
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
          options={operatorsList?.map((op) => ({ id: op.id, label: op.label })) ?? []}
        />
        {shouldDisplayValueField &&
          (condition.filter?.valueType === 'BOOLEAN' && condition.filter.comparator === 'EQUAL' ? (
            <ConditionDropdown
              isReadOnly={true}
              removeEndAdornment
              initialChecked={
                condition.filter.value === 'true'
                  ? {
                      id: 'true',
                      label: 'true'
                    }
                  : condition.filter.value === 'false'
                  ? { id: 'false', label: 'false' }
                  : undefined
              }
              label={'Set boolean'}
              onChange={(event, value) => {
                onChange({
                  ...condition,
                  filter: { ...condition.filter, value: value?.id }
                });
              }}
              options={[
                { id: 'true', label: 'true' },
                { id: 'false', label: 'false' }
              ]}
            />
          ) : (
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
          ))}
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
        <Tooltip title={'Remove condition'} placement={'top'} arrow={true} disableInteractive>
          <div>
            {' '}
            {/*This div is needed for the tooltip to work*/}
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
          </div>
        </Tooltip>
        <Tooltip title={'Add'} placement={'top'} arrow={true} disableInteractive>
          <IconButton
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              padding: '8px',
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex'
            }}
            onClick={(event) => {
              if (isSimpleMode) {
                onAdd();
              } else {
                setAnchorEl(event.currentTarget);
                setIsOpen(true);
              }
            }}
          >
            <AddIcon fontSize={'medium'} sx={{ fill: 'rgba(100, 116, 139, 1)' }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '12px'
            },
            '.MuiList-root':{
              padding:"8px!important"
            }
          }}
          id="basic-menu"
          anchorEl={anchorEl}
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
            sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', padding:"8px!important" }}
          >
            <Icon icon={"solid-plus"} width={11.2} height={11.2} fill={"rgba(71, 85, 105, 1)"}/>
            <Typography variant={'medium'}>Add condition</Typography>
          </MenuItem>
          {!isSimpleMode && !condition.not && (
            <>
              <Divider sx={{ height:"2px", backgroundColor: 'rgba(226, 232, 240, 1)', border:"0px" , margin:"0px!important"}} />
              <MenuItem
              onClick={() => {
                onChange({ ...condition, not: !condition.not });
                setIsOpen(false);
              }}
              sx={{ display: 'flex', flexDirection: 'row', gap: '8px', alignItems: 'center', padding:"8px!important" }}
            >
                <Icon icon={"outline-not"} width={14} height={14} fill={"rgba(71, 85, 105, 1)"}/>
              <Typography variant={'medium'}>Add NOT to condition</Typography>
            </MenuItem>
            </>
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
}

export default SimpleCondition;
