import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CustomTextField from './CustomTextField';
import { DropdownV2 } from '../../../elements/dropdownV2';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import { ThemeProvider, Tooltip } from '@mui/material';
import { MetadataType } from './MetadataKeyValueList';
import { ErroredTooltip, TooltipVariant } from '../../../elements/tooltipV2/ErroredTooltip';
import theme from '../../../../theme';

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
    {
      id: 'BLOB',
      label: 'Blob',
    },
  ];

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
            <div style={{ width: '100%' }}>
              <CustomTextField
                readOnly={!isNewlyCreated}
                value={keyName}
                onInputSave={(newVal) => {
                  if (saveKeyNameLocally) {
                    saveKeyNameLocally(index, newVal);
                  }
                }}
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
          {isNewlyCreated && (
            <div style={{ width: '100%', maxWidth: '130px' }}>
              <DropdownV2
                onChange={(event, value) => {
                  if (saveValueTypeLocally) {
                    saveValueTypeLocally(index, value?.id);
                  }
                }}
                options={valueTypes}
                isReadOnly={true}
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
          )}
          <ErroredTooltip
            title={isErrored ? 'Value is not valid' : ''}
            placement={'top'}
            disableInteractive={true}
            open={isErrored}
            tooltipVariant={TooltipVariant.Error}
          >
            <div style={{ width: '100%' }}>
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
                  if (!!validateValueByType && !!valueType) {
                    setIsErrored(!validateValueByType(valueType, newVal as string));
                  }
                }}
                placeholder={isNewlyCreated || !value ? 'Add value' : 'Typing...'}
                shouldHighlightIfEmpty={shouldHighlightEmptyFields}
                isErrored={isErrored} //TODO: add validation
              />
            </div>
          </ErroredTooltip>
          {isEditable && isRemovable && (
            <IconButton
              style={{ marginRight: '8px', height: '100%', padding: '6px' }}
              onClick={() => {
                if (deleteFieldPermanently) {
                  deleteFieldPermanently(index);
                }
              }}
            >
              <DeleteOutlinedIcon style={{ color: 'rgba(148, 163, 184, 1)' }} fontSize={'medium'} />
            </IconButton>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
