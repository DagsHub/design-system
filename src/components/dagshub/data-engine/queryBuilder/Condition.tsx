import React from 'react';
import {
    AndOrMetadataInput,
    MetadataFieldProps,
} from "./ConditionHelperFunctionsAndTypes";
import {MetadataType} from "../metadataKeyValue/MetadataKeyValueList";
import SimpleCondition from "./SimpleCondition";
import {Box} from "@mui/system";
import GroupCondition from './GroupCondition';

const Condition = ({
                       condition,
                       onChange,
                       metadataFields,
                       level = 0,
                       isSimple,
                       onRemove,
                       onAdd,
                       verifyCondition
                   }: {
    condition: AndOrMetadataInput;
    onChange: any;
    metadataFields: MetadataFieldProps[],
    level?: number;
    onRemove?: any;
    onAdd?: any;
    isSimple?: boolean;
    verifyCondition: (valueType: MetadataType, value: string) => boolean;
}) => {

    return (
        <Box key={condition.id ?? condition.filter?.id}
        >
            {!condition?.or && !condition?.and && !!condition?.filter ?
                <SimpleCondition
                    condition={condition}
                    onChange={onChange}
                    metadataFields={metadataFields}
                    verifyCondition={verifyCondition}
                    isSimple={isSimple}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
                :
                <GroupCondition
                    condition={condition}
                    onChange={onChange}
                    metadataFields={metadataFields}
                    verifyCondition={verifyCondition}
                    isSimple={isSimple}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            }
        </Box>
    );
}

export default Condition;
