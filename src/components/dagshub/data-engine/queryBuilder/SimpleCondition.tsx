import React, { useEffect, useState } from 'react';
import { ConditionDropdown } from './ConditionDropdown';
import { Box, IconButton, Menu, MenuItem, ThemeProvider, Typography } from '@mui/material';
import ConditionTextField from './ConditionTextField';
import { Button, ButtonVariant } from '../../../elements';
import { Icon } from '../../../icons';
import theme from '../../../../theme';
import AddIcon from '@mui/icons-material/Add';
import {
  AndOrMetadataInput,
  Comparator,
  Operators,
  useQueryBuilderContext
} from './QueryBuilderContext';

const SimpleCondition = ({
  condition,
  onChange,
  onRemove,
  onAdd
}: {
  condition: AndOrMetadataInput;
  onChange: any;
  onRemove: () => void;
  onAdd: () => void;
}) => {
  const {
    isSimpleMode,
    validateValueByType,
    metadataFieldsList,
    getOperatorsByMetadataType,
    checkIfOperatorRequiresValueField
  } = useQueryBuilderContext();

  const [operatorsList, setOperatorsList] =
    useState<{ label: string; id: Comparator }[]>(Operators);
  const [shouldDisplayValueField, setShouldDisplayValueField] = useState<boolean>(true);
  const [isErrored, setIsErrored] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  useEffect(() => {
    if (!!condition?.filter?.valueType) {
      setOperatorsList(getOperatorsByMetadataType(condition.filter.valueType));
      //Reset the value field whenever the valueType changes
      onChange({ ...condition, filter: { ...condition.filter, value: '' } });
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
    //Whenever the operatorsList changes, change the comparator to the first one in the list
    onChange({ ...condition, filter: { ...condition.filter, comparator: operatorsList[0].id } });
  }, [operatorsList]);

  useEffect(() => {
    if (!!condition.filter?.valueType && !!condition.filter?.value) {
      setIsErrored(!validateValueByType(condition.filter?.valueType, condition.filter?.value));
    } else {
      setIsErrored(false);
    }
  }, [condition.filter?.valueType, condition.filter?.value]);

  const isEmpty =
    !condition.filter?.key || !condition.filter?.comparator || !condition.filter?.value;
  const selectedMetadataKey = metadataFieldsList.find(
    (field) => field.name === condition.filter?.key
  );
  const selectedOperator = operatorsList.find(
    (operator) => operator.id === condition.filter?.comparator
  );

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
        {shouldDisplayValueField &&
          (condition.filter?.valueType === 'BOOLEAN' && condition.filter.comparator === 'EQUAL' ? (
            <ConditionDropdown
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
        <Menu
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '12px'
            },
            padding: '8px'
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
          >
            <Typography variant={'medium'}>Add condition</Typography>
          </MenuItem>
          {!isSimpleMode && !condition.not && (
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
