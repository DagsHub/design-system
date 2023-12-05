import React, {useState} from "react";
import Condition from "./Condition";

type MetadataType = "BOOLEAN" | "INTEGER" | "FLOAT" | "STRING" | "BLOB";
type Comparator = "EQUAL" | "GREATER_THAN" | "GREATER_EQUAL_THAN" | "LESS_THAN" | "LESS_EQUAL_THAN" | "CONTAINS" | "IS_NULL";

export const Operators: { label: string; id: Comparator }[] = [
    { label: "==", id: "EQUAL" },
    { label: ">", id: "GREATER_THAN" },
    { label: ">=", id: "GREATER_EQUAL_THAN" },
    { label: "<", id: "LESS_THAN" },
    { label: "<=", id: "LESS_EQUAL_THAN" },
    { label: "contains", id: "CONTAINS" },
    { label: "is null", id: "IS_NULL" },
];

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
            return {and:[]}
        }
    }
    const checkIfSimpleMode = ()=>{
        if(forceCompoundMode){
            return false;
        }
        if(!!queryInput.query?.or || !!queryInput.query?.not){
            return false;
        }
        if (!!queryInput.query?.and){ // if it's an and group with no nested groups and no not-conditions, it's simple as well
            return !queryInput.query.and.some((cond) =>
                {return !!cond.not || !!cond.or || !!cond.and}
            );
        }
        return true;
    }
    const [rootCondition, setRootCondition] = useState<AndOrMetadataInput>(getInitialQuery());


    return (
        <div className="App">
            <h1>{checkIfSimpleMode()?"Simple":"Compound"} query builder</h1>
            <Condition condition={rootCondition} onChange={setRootCondition} isSimple={checkIfSimpleMode()}/>
            <pre>UI QUERY {JSON.stringify(rootCondition, null, 2)}</pre>
        </div>
    );
}


