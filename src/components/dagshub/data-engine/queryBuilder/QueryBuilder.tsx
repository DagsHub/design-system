import React from 'react';
import {
  MetadataFieldProps,
  QueryBuilderProvider,
  QueryInput,
  SourceType
} from './QueryBuilderContext';
import QueryWrapper from './QueryWrapper';

export function QueryBuilder({
  queryInput,
  metadataFields,
  forceCompoundMode = false,
  sourceType,
  sourceName,
  onApplyQuery,
  onSaveNewDataset,
  onUpdateDatasetQuery,
  isQueryApiLoading
}: {
  queryInput: QueryInput;
  metadataFields: MetadataFieldProps[]; // need to take into consideration the select and the alias
  forceCompoundMode?: boolean;
  sourceType: SourceType;
  sourceName: string;
  onApplyQuery: (queryInput: QueryInput) => void;
  onSaveNewDataset: (newDatasetName: string, queryInput: QueryInput) => void;
  onUpdateDatasetQuery: (queryInput: QueryInput) => void;
  isQueryApiLoading: boolean;
}) {
  return (
    <QueryBuilderProvider
      queryInput={queryInput}
      metadataFields={metadataFields}
      sourceType={sourceType}
      sourceName={sourceName}
      onApplyQuery={onApplyQuery}
      onSaveNewDataset={onSaveNewDataset}
      onUpdateDatasetQuery={onUpdateDatasetQuery}
      isQueryApiLoading={isQueryApiLoading}
      forceCompoundMode={forceCompoundMode}
    >
      <QueryWrapper />
    </QueryBuilderProvider>
  );
}
