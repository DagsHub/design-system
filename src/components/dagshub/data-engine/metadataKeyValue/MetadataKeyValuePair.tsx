import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import CustomTextField from './CustomTextField';
import {DropdownV2} from '../../../elements/dropdownV2';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import {ThemeProvider, Tooltip} from '@mui/material';
import {MetadataType} from './MetadataKeyValueList';
import {ErroredTooltip, TooltipVariant} from '../../../elements/tooltipV2/ErroredTooltip';
import theme from '../../../../theme';
import {capitalize} from "lodash";

export interface MetadataKeyValuePairProps {
  index: number;
  keyName?: string;
  value?: string;
  valueType?: MetadataType;
  isEditable: boolean;
  description?: string;
  isNewlyCreated?: boolean;
  isRemovable?: boolean;
  saveKeyNameLocally?: (index: number, newVal?: string | undefined) => void;
  saveValueLocally?: (index: number, newVal?: string | undefined) => void;
  saveValueTypeLocally?: (index: number, newVal?: MetadataType | undefined) => void;
  deleteFieldPermanently?: (index: number) => void;
  shouldHighlightEmptyFields?: boolean;
  autoFocusKey?: boolean;
  validateValueByType?: (valueType: MetadataType, value: string) => boolean;
  markFieldStatusAsEditInProgress: (index: number) => void;
}

export function MetadataKeyValuePair({
                                       index,
                                       keyName,
                                       value,
                                       valueType,
                                       isEditable,
                                       description,
                                       isNewlyCreated,
                                       isRemovable,
                                       saveKeyNameLocally,
                                       saveValueLocally,
                                       saveValueTypeLocally,
                                       deleteFieldPermanently,
                                       shouldHighlightEmptyFields,
                                       autoFocusKey,
                                       validateValueByType,
                                       markFieldStatusAsEditInProgress
                                     }: MetadataKeyValuePairProps) {
  const [isErrored, setIsErrored] = React.useState(false);

  useEffect(() => {
    if (!!validateValueByType && !!valueType) {
      setIsErrored(!validateValueByType(valueType, value as string));
    }
  }, [valueType]);

  const valueTypes: { id: MetadataType; label: string }[] = [
    {
      id: 'INTEGER',
      label: 'Int',
    },
    {
      id: 'FLOAT',
      label: 'Float',
    },
    {
      id: 'BOOLEAN',
      label: 'Boolean',
    },
    {
      id: 'STRING',
      label: 'String',
    },
    // {
    //   id: 'BLOB',
    //   label: 'Blob',
    // },
  ];

  const getShortenedStringOfTheValueType = () => {
    if (valueType === 'INTEGER') {
      return 'int';
    } else if (valueType === 'FLOAT') {
      return 'float';
    } else if (valueType === 'BOOLEAN') {
      return 'bool';
    } else if (valueType === 'STRING') {
      return 'str';
    } else if (valueType === 'BLOB') {
      return 'blob';
    } else {
      return valueType;
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          height: '100%',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          alignItems: 'center',
          flexWrap: isNewlyCreated ? 'wrap' : 'nowrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexShrink: 1,
            flexGrow: 1,
            maxWidth: '100%',
            minWidth: '35%',
          }}
        >
          {/*key name should not be editable unless its newly created*/}
          <Tooltip title={keyName} disableInteractive={true} arrow={true} placement={'top'}>
            <div style={{width: '100%'}}>
              <CustomTextField
                readOnly={!isNewlyCreated}
                value={keyName}
                onInputSave={(newVal) => {
                  if (saveKeyNameLocally) {
                    saveKeyNameLocally(index, newVal);
                  }
                }}
                onInputChange={(newVal) => {
                  if (newVal !== keyName) {
                    markFieldStatusAsEditInProgress(index);
                  }
                }
                }
                helperText={description}
                placeholder={isNewlyCreated || !value ? 'Enter field name' : 'Typing...'}
                shouldHighlightIfEmpty={shouldHighlightEmptyFields}
                autoFocus={autoFocusKey}
              />
            </div>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            maxWidth: '100%',
            gap: '8px',
            flexShrink: 1,
            minWidth: '65%',
            height: '100%',
          }}
        >

          <div style={{width: '100%', maxWidth: '130px', flexShrink:1}}>
            <DropdownV2
              onChange={(event, value) => {
                if (saveValueTypeLocally) {
                  saveValueTypeLocally(index, value?.id);
                }
              }}
              initialChecked={valueTypes.find((type) => type.id === valueType)}
              options={valueTypes}
              isReadOnly={true}
              disabled={!isNewlyCreated}
              label={'Value type'}
              errored={false}
              maxWidth={'130px'}
              height={'100%'}
              isSquareCorners={true}
              withoutBorder={true}
              backgroundColorFocus={'white'}
              disableClearable
              shouldHighlightIfEmpty={shouldHighlightEmptyFields}
            />
          </div>

          <ErroredTooltip
            title={isErrored ? 'Value is not valid' : ''}
            placement={'top'}
            disableInteractive={true}
            open={isErrored}
            tooltipVariant={TooltipVariant.Error}
          >
            <div style={{width: '100%', minWidth:"160px"}}>
              <CustomTextField
                readOnly={!isEditable}
                value={value}
                onInputSave={(newVal) => {
                  if (!!validateValueByType && !!valueType) {
                    setIsErrored(!validateValueByType(valueType, newVal as string));
                  }
                  if (saveValueLocally) {
                    saveValueLocally(index, newVal);
                  }
                }}
                onInputChange={(newVal) => {
                  if (newVal !== value) {
                    markFieldStatusAsEditInProgress(index);
                  }
                  if (!!validateValueByType && !!valueType) {
                    setIsErrored(!validateValueByType(valueType, newVal as string));
                  }
                }}
                placeholder={isNewlyCreated || !value ? 'Add value' : 'Typing...'}
                shouldHighlightIfEmpty={(valueType != "STRING") && shouldHighlightEmptyFields}
                isErrored={isErrored}
              />
            </div>
          </ErroredTooltip>
          {!!isRemovable && (
            <IconButton
              style={{marginRight: '8px', height: '100%', padding: '6px'}}
              onClick={() => {
                if (deleteFieldPermanently) {
                  deleteFieldPermanently(index);
                }
              }}
            >
              <DeleteOutlinedIcon style={{color: 'rgba(148, 163, 184, 1)'}} fontSize={'medium'}/>
            </IconButton>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
