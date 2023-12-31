import React, { useEffect, useState } from 'react';
import Condition from './Condition';
import {
  addUniqueIds,
  AndOrMetadataInput,
  convertToBackandFormatAndRemoveEmptyConditions,
  hasUncompletedConditions,
  MetadataFieldProps,
  QueryInput,
  validateConditionValue
} from './ConditionHelperFunctionsAndTypes';

export function QueryBuilder({
  queryInput,
  metadataFields,
  forceCompoundMode = false
}: {
  queryInput: QueryInput;
  metadataFields: MetadataFieldProps[];
  forceCompoundMode?: boolean;
}) {
  const getInitialQuery = () => {
    let condition: AndOrMetadataInput | undefined = undefined;
    if (!!queryInput.query) {
      if (!!queryInput.query.or || !!queryInput.query.and) {
        condition = queryInput.query;
      } else {
        condition = { and: [{ filter: queryInput.query.filter }] };
      }
    } else {
      condition = { and: [] };
    }
    return addUniqueIds(condition);
  };

  const checkIfSimpleMode = () => {
    if (forceCompoundMode) {
      return false;
    }
    if (!!queryInput.query?.or || !!queryInput.query?.not) {
      return false;
    }
    if (!!queryInput.query?.and) {
      // if it's an and group with no nested groups and no not-conditions, it's simple as well
      return !queryInput.query.and.some((cond) => {
        return !!cond.not || !!cond.or || !!cond.and;
      });
    }
    return true;
  };

  const [rootCondition, setRootCondition] = useState<AndOrMetadataInput>(getInitialQuery());
  const [rootConditionBackend, setRootConditionBackend] = useState<AndOrMetadataInput | null>(null);
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(checkIfSimpleMode());
  const [metadataFieldsState, setMetadataFieldsState] =
    useState<MetadataFieldProps[]>(metadataFields);
  const [isUncompleted, setIsUncompleted] = useState<boolean | null>(null);

  useEffect(() => {
    setIsSimpleMode(checkIfSimpleMode());
    setRootCondition(getInitialQuery());
  }, [queryInput]);

  useEffect(() => {
    setIsSimpleMode(checkIfSimpleMode());
  }, [forceCompoundMode]);

  useEffect(() => {
    setMetadataFieldsState(metadataFields);
  }, [metadataFields]);

  useEffect(()=>{
      setIsUncompleted(hasUncompletedConditions(rootCondition));
  },[rootCondition])

    const onApply = () => {
        setRootConditionBackend(convertToBackandFormatAndRemoveEmptyConditions(rootCondition));
    }

  return (
    <div className="App">
      <h1>{isSimpleMode ? 'Simple' : 'Compound'} query builder</h1>
      <br />
      <Condition
        condition={rootCondition}
        onChange={setRootCondition}
        isSimple={isSimpleMode}
        metadataFields={metadataFieldsState}
        verifyCondition={validateConditionValue}
      />
      <pre>UI {JSON.stringify(rootCondition, null, 2)}</pre>
      <pre>BACKEND {JSON.stringify(rootConditionBackend, null, 2)}</pre>
      <pre>IS_EMPTY {JSON.stringify(isUncompleted, null, 2)}</pre>
    </div>
  );
}
