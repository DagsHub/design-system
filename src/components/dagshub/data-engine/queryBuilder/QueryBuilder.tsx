import React, {useEffect, useState} from "react";
import Condition from "./Condition";
import {
    AndOrMetadataInput, convertToBackandFormatAndRemoveEmptyConditions,
    hasUncompletedConditions,
    MetadataFieldProps,
    QueryInput,
    validateConditionValue
} from "./TypesCondition";

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
    const [isUncompleted, setIsUncompleted] = useState<boolean | null>(null);

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

    return (
        <div className="App">
            <h1>{isSimpleMode ? "Simple" : "Compound"} query builder</h1>
            <Condition condition={rootCondition} onChange={setRootCondition} isSimple={isSimpleMode}
                       metadataFields={metadataFieldsState} verifyCondition={validateConditionValue}/>
            <button
                onClick={() => {
                    const empty = hasUncompletedConditions(rootCondition)
                    setIsUncompleted(empty)
                    if (!empty) {
                        setRootConditionBackend(convertToBackandFormatAndRemoveEmptyConditions(rootCondition))
                    }
                }}
            >
                Apply
            </button>
            <pre>UI {JSON.stringify(rootCondition, null, 2)}</pre>
            <pre>BACKEND {JSON.stringify(rootConditionBackend, null, 2)}</pre>
            <pre>IS_EMPTY {JSON.stringify(isUncompleted, null, 2)}</pre>
        </div>
    );
}


