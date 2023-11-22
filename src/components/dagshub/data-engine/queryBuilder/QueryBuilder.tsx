import React, {useState} from "react";
import Condition from "./Condition";

export enum MetadataType {
    BOOLEAN= "BOOLEAN",
    INTEGER= "INTEGER",
    FLOAT= "FLOAT",
    STRING= "STRING",
    BLOB="BLOB",
}

export enum Comparator {
    EQUAL="EQUAL",
    GREATER_THAN="GREATER_THAN",
    GREATER_EQUAL_THAN="GREATER_EQUAL_THAN",
    LESS_THAN="LESS_THAN",
    LESS_EQUAL_THAN="LESS_EQUAL_THAN",
    CONTAINS="CONTAINS",
    IS_NULL="IS_NULL",
}

export const Operators =[
    {label:"==", id: Comparator.EQUAL},
    {label:">", id: Comparator.GREATER_THAN},
    {label:">=", id: Comparator.GREATER_EQUAL_THAN},
    {label:"<", id: Comparator.LESS_THAN},
    {label:"<=", id: Comparator.LESS_EQUAL_THAN},
    {label:"contains", id: Comparator.CONTAINS},
    {label:"is null", id: Comparator.IS_NULL},
]

export interface MetadataInput {
    key?: string;
    value?: string;
    valueType?: MetadataType;
    comparator?: Comparator;
}

export interface AndOrMetadataInput { // each condition is either AND or OR or Filter
    or?: AndOrMetadataInput[];
    and?: AndOrMetadataInput[];
    filter?: MetadataInput;
    not?: Boolean;
}

export function QueryBuilder({isSimpleMode=false}:{isSimpleMode?:boolean}) {
    const [rootCondition, setRootCondition] = useState<AndOrMetadataInput>({
        and: [{filter:{comparator: Comparator.EQUAL}}]
    });

    return (
        <div className="App">
            <h1>{isSimpleMode?"Simple":"Compound"} query builder</h1>
            <Condition condition={rootCondition} onChange={setRootCondition} isSimple={isSimpleMode}/>
            <pre>{JSON.stringify(rootCondition, null, 2)}</pre>
        </div>
    );
}


