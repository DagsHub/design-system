import React from 'react';
import Box from '@mui/material/Box';
import CustomTextField from './CustomTextField';
import {DropdownV2} from '../../../elements/dropdownV2';
import {RadioButtonItemProps} from '../../../forms';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';

export interface MetadataKeyValuePairProps {
    index: number;
    keyName?: string;
    value?: string;
    valueType?: string;
    isEditable: boolean;
    description?: string;
    isNewlyCreated?: boolean;
    isRemovable?: boolean;
    saveKeyNameLocally?: (index: number, newVal?: string | undefined) => void;
    saveValueLocally?: (index: number, newVal?: string | undefined) => void;
    saveValueTypeLocally?: (index: number, newVal?: string | number | undefined) => void;
    deleteFieldPermanently?: (index: number) => void;
    shouldHighlightEmptyFields?: boolean;
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
                                         shouldHighlightEmptyFields
                                     }: MetadataKeyValuePairProps) {
    const valueTypes: RadioButtonItemProps[] = [
        {
            id: 'INTEGER',
            label: 'Int'
        },
        {
            id: 'FLOAT',
            label: 'Float'
        },
        {
            id: 'BOOLEAN',
            label: 'Boolean'
        },
        {
            id: 'STRING',
            label: 'String'
        },
        {
            id: 'BLOB',
            label: 'Blob'
        }
    ];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                backgroundColor: '#F8FAFC',
                borderBottom: '1px solid #E2E8F0',
                alignItems: 'center',
                gap: '8px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    width: '35%',
                    height: '100%',
                    flexShrink: 0
                }}
            >
                {/*key name should not be editable unless its newly created*/}
                <CustomTextField
                    readOnly={!isNewlyCreated}
                    value={keyName}
                    onSaveHandler={(newVal) => {
                        if (saveKeyNameLocally) {
                            saveKeyNameLocally(index, newVal);
                        }
                    }}
                    helperText={description}
                    placeholder={isNewlyCreated || !value ? 'Enter field name' : 'Typing...'}
                    shouldHighlightIfEmpty={shouldHighlightEmptyFields}
                    autoFocus={isNewlyCreated}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    width: '65%',
                    height: '100%',
                    gap:"8px"
                }}
            >
                {isNewlyCreated && (
                    <Box flexShrink={0}>
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
                    </Box>
                )}
                <CustomTextField
                    readOnly={!isEditable}
                    value={value}
                    onSaveHandler={(newVal) => {
                        if (saveValueLocally) {
                            saveValueLocally(index, newVal);
                        }
                    }}
                    placeholder={isNewlyCreated || !value ? 'Add value' : 'Typing...'}
                    shouldHighlightIfEmpty={shouldHighlightEmptyFields}
                />
            </Box>
            {isEditable && isRemovable && (
                <IconButton
                    style={{marginRight: '14px', height: '100%', padding: '6px'}}
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
    );
}
