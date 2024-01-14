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
  forceCompoundMode = false,
  onChange,
  validateValueByType,
  showConditionSummary = false,
  isCollapsed = true,
}: {
  queryInput: QueryInput;
  metadataFields: MetadataFieldProps[]; // need to take into consideration the select and the alias
  forceCompoundMode?: boolean;
  onChange: (query: QueryInput) => void;
  validateValueByType: (valueType: MetadataType, value: string, comparator: Comparator) => boolean;
  showConditionSummary?: boolean;
  isCollapsed?: boolean;
}) {
  return (
    <QueryBuilderProvider
      queryInput={queryInput}
      metadataFields={metadataFields}
      forceCompoundMode={forceCompoundMode}
      validateValueByType={validateValueByType}
      onChange={onChange}
      isCollapsed={isCollapsed}
    >
      <QueryWrapper showConditionSummary={showConditionSummary} />
    </QueryBuilderProvider>
  );
}

export default QueryBuilder;
