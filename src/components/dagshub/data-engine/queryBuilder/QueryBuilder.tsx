import React, {useEffect, useState} from "react";
import Condition from "./Condition";
import condition from "./Condition";

type MetadataType =
    "BOOLEAN"
    | "INTEGER"
    | "FLOAT"
    | "STRING"
    | "BLOB";

type Comparator =
    "EQUAL"
    | "GREATER_THAN"
    | "GREATER_EQUAL_THAN"
    | "LESS_THAN"
    | "LESS_EQUAL_THAN"
    | "CONTAINS"
    | "IS_NULL"
    | "IS_POSITIVE_INFINITY"
    | "IS_NEGATIVE_INFINITY"
    | "IS_NAN";
;

export const Operators: { label: string; id: Comparator, value?: string }[] = [
    {label: "==", id: "EQUAL"},
    {label: ">", id: "GREATER_THAN"},
    {label: ">=", id: "GREATER_EQUAL_THAN"},
    {label: "<", id: "LESS_THAN"},
    {label: "<=", id: "LESS_EQUAL_THAN"},
    {label: "contains", id: "CONTAINS"},
    {label: "is null", id: "IS_NULL"},
];

export const StringOperators: { label: string; id: Comparator, value?: string }[] = [
    {label: "==", id: "EQUAL"},
    {label: "contains", id: "CONTAINS"},
    {label: "is null", id: "IS_NULL"},
];

export const BooleanOperators: { label: string; id: Comparator }[] = [
    {label: "==", id: "EQUAL"},
    {label: "is null", id: "IS_NULL"},
];

export const BlobOperators: { label: string; id: Comparator }[] = [
    {label: "is null", id: "IS_NULL"},
];

export const IntegerOperators: { label: string; id: Comparator }[] = [
    {label: "==", id: "EQUAL"},
    {label: ">", id: "GREATER_THAN"},
    {label: ">=", id: "GREATER_EQUAL_THAN"},
    {label: "<", id: "LESS_THAN"},
    {label: "<=", id: "LESS_EQUAL_THAN"},
    {label: "is null", id: "IS_NULL"},
];

export const FloatOperators: { label: string; id: Comparator }[] = [
    {label: "==", id: "EQUAL"},
    {label: ">", id: "GREATER_THAN"},
    {label: ">=", id: "GREATER_EQUAL_THAN"},
    {label: "<", id: "LESS_THAN"},
    {label: "<=", id: "LESS_EQUAL_THAN"},
    {label: "is null", id: "IS_NULL"},
    {label: "is +Inf", id: "IS_POSITIVE_INFINITY"},
    {label: "is -Inf", id: "IS_NEGATIVE_INFINITY"},
    {label: "is NaN", id: "IS_NAN"},
];

export interface MetadataFieldProps {
    name: string;
    valueType: MetadataType;
    tags: string[];
    multiple: boolean;
}

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

export function QueryBuilder({
                                 queryInput,
                                 metadataFields,
                                 forceCompoundMode = false,
                             }: {
    queryInput: QueryInput,
    metadataFields: MetadataFieldProps[],
    forceCompoundMode?: boolean
}) {

    const getInitialQuery = () => {
        if (!!queryInput.query) {
            if (!!queryInput.query.or || !!queryInput.query.and) {
                return queryInput.query
            } else {
                return {and: [{filter: queryInput.query.filter}]}
            }
        } else {
            return {and: []}
        }
    }
    const checkIfSimpleMode = () => {
        if (forceCompoundMode) {
            return false;
        }
        if (!!queryInput.query?.or || !!queryInput.query?.not) {
            return false;
        }
        if (!!queryInput.query?.and) { // if it's an and group with no nested groups and no not-conditions, it's simple as well
            return !queryInput.query.and.some((cond) => {
                    return !!cond.not || !!cond.or || !!cond.and
                }
            );
        }
        return true;
    }

    const [rootCondition, setRootCondition] = useState<AndOrMetadataInput>(getInitialQuery());
    const [rootConditionBackend, setRootConditionBackend] = useState<AndOrMetadataInput | null>(null);
    const [isSimpleMode, setIsSimpleMode] = useState<boolean>(checkIfSimpleMode());
    const [metadataFieldsState, setMetadataFieldsState] = useState<MetadataFieldProps[]>(metadataFields);

    useEffect(() => {
        setIsSimpleMode(checkIfSimpleMode())
        setRootCondition(getInitialQuery())
    }, [queryInput]);

    useEffect(() => {
        setIsSimpleMode(checkIfSimpleMode())
    }, [forceCompoundMode]);

    useEffect(() => {
        setMetadataFieldsState(metadataFields)
    }, [metadataFields])

    function getZeroValueByType(type: MetadataType | undefined): string {
        switch (type) {
            case "BOOLEAN":
                return "false";
            case "INTEGER":
                return "0";
            case "FLOAT":
                return "0.0";
            case "STRING":
                return "";
            case "BLOB":
                return "";
            default:
                return "";
        }
    }

    function removeEmptyConditions(condition: AndOrMetadataInput): AndOrMetadataInput | null {
        if (!!condition.or || !!condition.and) {
            // Recursively remove empty conditions from nested conditions
            const nonEmptyConditions = (condition.or || condition.and || [])
                .map(removeEmptyConditions) //for each nested condition call removeEmptyConditions
                .filter((c) => c !== null) as AndOrMetadataInput[];

            // If all nested conditions are removed and the current condition is empty, return null
            if (nonEmptyConditions.length === 0) {
                return null;
            }

            // Return the modified condition
            if (condition.or) {
                return {or: nonEmptyConditions};
            } else {
                return {and: nonEmptyConditions};
            }
        } else if (!!condition.filter) {
            // If it's a simple filter, check if it's empty
            if ((!condition.filter.key || !condition.filter.value) && !(condition.filter?.comparator === "IS_POSITIVE_INFINITY" || condition.filter?.comparator === "IS_NEGATIVE_INFINITY" || condition.filter?.comparator === "IS_NAN" || condition.filter?.comparator === "IS_NULL")) {
                return null;
            }
        }
        // Return the original input if it's not a filter, OR, or AND
        if (condition.filter?.comparator === "IS_POSITIVE_INFINITY") {
            return {...condition, filter: {...condition.filter, comparator: "EQUAL", value: "+Inf"}}
        }
        if (condition.filter?.comparator === "IS_NEGATIVE_INFINITY") {
            return {...condition, filter: {...condition.filter, comparator: "EQUAL", value: "-Inf"}}
        }
        if (condition.filter?.comparator === "IS_NAN") {
            return {...condition, filter: {...condition.filter, comparator: "EQUAL", value: "NaN"}}
        }
        if (condition.filter?.comparator === "IS_NULL") {
            console.log( "value",getZeroValueByType(condition.filter.valueType)
        )
            return {...condition,
                filter: {
                    ...condition.filter,
                    value: getZeroValueByType(condition.filter.valueType)
                }
            }
        }
        return condition;
    }

    return (
        <div className="App">
            <h1>{isSimpleMode ? "Simple" : "Compound"} query builder</h1>
            <Condition condition={rootCondition} onChange={setRootCondition} isSimple={isSimpleMode}
                       metadataFields={metadataFieldsState}/>
            <button
                onClick={() => {
                    setRootConditionBackend(removeEmptyConditions(rootCondition))
                }}
            >
                Calculate backend query
            </button>
            <pre>UI {JSON.stringify(rootCondition, null, 2)}</pre>
            <pre>BACKEND {JSON.stringify(rootConditionBackend, null, 2)}</pre>
        </div>
    );
}


