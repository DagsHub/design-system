import React from 'react';
import Box from "@mui/material/Box";
import CustomTextField from "./CustomTextField";
import {DropdownV2} from "../dropdownV2";
import {RadioButtonItemProps} from "../../forms";

export interface MetadataKeyValuePairProps {
    keyName?: string;
    value?: string;
    valueType?: string;
    isEditable: boolean;
    isAutoGenerated?: boolean;
    isNewlyCreated?: boolean;
}

export function MetadataKeyValuePair({
                                         keyName,
                                         value,
                                         valueType,
                                         isEditable,
                                         isAutoGenerated,
                                         isNewlyCreated
                                     }: MetadataKeyValuePairProps) {
    const valueTypes: RadioButtonItemProps[] = [
        {
            id: 'int',
            label: 'Int'
        },
        {
            id: 'float',
            label: 'Float'
        },
        {
            id: 'boolean',
            label: 'Boolean'
        },
        {
            id: 'string',
            label: 'String'
        },
        {
            id: 'bytes',
            label: 'Blob'
        }
    ];

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
            backgroundColor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
            alignItems: "center",
            gap: "8px"
        }}>
            <Box sx={{
                display: "flex",
                width: "35%",
                height: "100%",
                flexShrink: 0
            }}>
                {/*key name should not be editable unless its newly created*/}
                <CustomTextField
                    readOnly={!isNewlyCreated}
                    value={keyName}
                    onChange={(newVal) => {
                    }}
                    helperText={isAutoGenerated ? "Auto-generated" : undefined}
                    placeholder={"Enter field name"}
                />
            </Box>
            <Box sx={{
                display: "flex",
                width: "65%",
                height: "100%",
            }}>
                {isNewlyCreated &&
                    <Box flexShrink={0}><DropdownV2
                        onChange={() => {
                        }}
                        options={valueTypes}
                        isReadOnly={true}
                        label={"Value type"}
                        errored={false}
                        maxWidth={"130px"}
                        height={'36px'}
                        isSquareCorners={true}
                        withoutBorder={true}
                        backgroundColorFocus={"white"}
                    /></Box>
                }
                <CustomTextField
                    readOnly={!isEditable || !!isAutoGenerated}
                    value={value}
                    onChange={(newVal) => {
                    }}
                    placeholder={isNewlyCreated ? "Add value" : "Typing"}
                />
            </Box>
        </Box>
    );
}
