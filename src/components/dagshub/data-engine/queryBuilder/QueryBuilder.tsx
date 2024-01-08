import React from 'react';
import {
  MetadataFieldProps,
  QueryBuilderProvider,
  QueryInput
} from './QueryBuilderContext';
import QueryWrapper from './QueryWrapper';
import {MetadataType} from "../metadataKeyValue/MetadataKeyValueList";

export function QueryBuilder({
  queryInput,
  metadataFields,
  forceCompoundMode = false,
  onChange,
  validateValueByType,
  showConditionSummary = false
}: {
  queryInput: QueryInput;
  metadataFields: MetadataFieldProps[]; // need to take into consideration the select and the alias
  forceCompoundMode?: boolean;
  onChange: (query: QueryInput) => void;
  validateValueByType: (valueType: MetadataType, value: string) => boolean;
  showConditionSummary?: boolean;
}) {
  return (
    <QueryBuilderProvider
      queryInput={queryInput}
      metadataFields={metadataFields}
      forceCompoundMode={forceCompoundMode}
      validateValueByType={validateValueByType}
      onChange={onChange}
    >
      <QueryWrapper showConditionSummary={showConditionSummary} />
    </QueryBuilderProvider>
  );
}

export default QueryBuilder;
