import React from 'react';
import {
  Comparator,
  MetadataFieldProps,
  QueryBuilderProvider,
  QueryInput
} from './QueryBuilderContext';
import QueryWrapper from './QueryWrapper';
import { MetadataType } from '../metadataKeyValue/MetadataKeyValueList';

export function QueryBuilder({
  queryInput,
  metadataFields,
  onChange,
  validateValueByType,
  showConditionSummary = false
}: {
  queryInput: QueryInput;
  metadataFields: MetadataFieldProps[]; // need to take into consideration the select and the alias
  onChange: (query: QueryInput) => void;
  validateValueByType: (valueType: MetadataType, value: string, comparator: Comparator) => boolean;
  showConditionSummary?: boolean;
}) {
  return (
    <QueryBuilderProvider
      queryInput={queryInput}
      metadataFields={metadataFields}
      validateValueByType={validateValueByType}
      onChange={onChange}
    >
      <QueryWrapper showConditionSummary={showConditionSummary} />
    </QueryBuilderProvider>
  );
}

export default QueryBuilder;
