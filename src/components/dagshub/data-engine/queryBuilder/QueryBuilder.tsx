import React, {useState} from "react";
import Condition from "./Condition";

export const MetadataType= ["BOOLEAN", "INTEGER", "FLOAT", "STRING", "BLOB"];

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

export interface QueryInput {
    query?: AndOrMetadataInput
    include?: string[]
    exclude?: string[]
}

export function QueryBuilder({queryInput, forceCompoundMode=false}:{queryInput:QueryInput, forceCompoundMode?:boolean}) {
    const getInitialQuery=()=>{
        if(!!queryInput.query){
            if(!!queryInput.query.or || !!queryInput.query.and){
                return queryInput.query
            }else {
                return {and:[{filter:queryInput.query.filter}]}
            }
        }else {
            return {and:[{filter:{comparator: Comparator.EQUAL}}]}
        }
    }
    const checkIfSimpleMode = ()=>{
        if(forceCompoundMode){
            return false;
        }
        if(!!queryInput.query?.or || !!queryInput.query?.and || !!queryInput.query?.not){
            return false;
        }
        return true;
    }
    const [rootCondition, setRootCondition] = useState<AndOrMetadataInput>(getInitialQuery());

    return (
        <div className="App">
            <h1>{checkIfSimpleMode()?"Simple":"Compound"} query builder</h1>
            <Condition condition={rootCondition} onChange={setRootCondition} isSimple={checkIfSimpleMode()}/>
            <pre>{JSON.stringify(rootCondition, null, 2)}</pre>
        </div>
    );
}


