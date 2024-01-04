import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import _ from 'lodash';

export type MetadataType = 'BOOLEAN' | 'INTEGER' | 'FLOAT' | 'STRING' | 'BLOB';

export type Comparator =
  | 'EQUAL'
  | 'GREATER_THAN'
  | 'GREATER_EQUAL_THAN'
  | 'LESS_THAN'
  | 'LESS_EQUAL_THAN'
  | 'CONTAINS'
  | 'IS_NULL'
  | 'IS_POSITIVE_INFINITY'
  | 'IS_NEGATIVE_INFINITY'
  | 'IS_NAN';

export const Operators: { label: string; id: Comparator; value?: string }[] = [
  { label: '==', id: 'EQUAL' },
  { label: '>', id: 'GREATER_THAN' },
  { label: '>=', id: 'GREATER_EQUAL_THAN' },
  { label: '<', id: 'LESS_THAN' },
  { label: '<=', id: 'LESS_EQUAL_THAN' },
  { label: 'contains', id: 'CONTAINS' },
  { label: 'is null', id: 'IS_NULL' }
];

export const StringOperators: { label: string; id: Comparator; value?: string }[] = [
  { label: '==', id: 'EQUAL' },
  { label: 'contains', id: 'CONTAINS' },
  { label: 'is null', id: 'IS_NULL' }
];

export const BooleanOperators: { label: string; id: Comparator }[] = [
  { label: '==', id: 'EQUAL' },
  { label: 'is null', id: 'IS_NULL' }
];

export const BlobOperators: { label: string; id: Comparator }[] = [
  { label: 'is null', id: 'IS_NULL' }
];

export const IntegerOperators: { label: string; id: Comparator }[] = [
  { label: '==', id: 'EQUAL' },
  { label: '>', id: 'GREATER_THAN' },
  { label: '>=', id: 'GREATER_EQUAL_THAN' },
  { label: '<', id: 'LESS_THAN' },
  { label: '<=', id: 'LESS_EQUAL_THAN' },
  { label: 'is null', id: 'IS_NULL' }
];

export const FloatOperators: { label: string; id: Comparator }[] = [
  { label: '==', id: 'EQUAL' },
  { label: '>', id: 'GREATER_THAN' },
  { label: '>=', id: 'GREATER_EQUAL_THAN' },
  { label: '<', id: 'LESS_THAN' },
  { label: '<=', id: 'LESS_EQUAL_THAN' },
  { label: 'is null', id: 'IS_NULL' },
  { label: 'is +Inf', id: 'IS_POSITIVE_INFINITY' },
  { label: 'is -Inf', id: 'IS_NEGATIVE_INFINITY' },
  { label: 'is NaN', id: 'IS_NAN' }
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
  id?: string;
}

export interface AndOrMetadataInput {
  or?: AndOrMetadataInput[];
  and?: AndOrMetadataInput[];
  filter?: MetadataInput;
  not?: Boolean;
  id?: string;
}

export interface QueryInput {
  query?: AndOrMetadataInput;
  include?: string[];
  exclude?: string[];
}

interface QueryBuilderContextInterface {
  isSimpleMode: boolean;
  setIsSimpleMode: (isSimpleMode: boolean) => void;
  rootCondition: AndOrMetadataInput;
  setRootCondition: (rootCondition: AndOrMetadataInput) => void;
  metadataFieldsList: MetadataFieldProps[];
  generateUniqueId: () => string;
  addUniqueIds: (input: AndOrMetadataInput) => AndOrMetadataInput;
  getZeroValueByType: (type: MetadataType | undefined) => string;
  getOperatorsByMetadataType: (type: MetadataType) => { label: string; id: Comparator }[];
  checkIfOperatorRequiresValueField: (operator: Comparator) => boolean;
  validateValueByType: (valueType: MetadataType, value: string) => boolean;
  convertToBackandFormatAndRemoveEmptyConditions: (
    condition: AndOrMetadataInput
  ) => AndOrMetadataInput | null;
}

export const QueryBuilderContext = createContext<QueryBuilderContextInterface | undefined>(
  undefined
);

export const useQueryBuilderContext = () => {
  const context = useContext(QueryBuilderContext);
  if (!context) {
    throw new Error('Must be used within a MyContextProvider');
  }
  return context;
};

export const QueryBuilderProvider = ({
  children,
  queryInput,
  metadataFields,
  forceCompoundMode = false,
  validateValueByType,
  onChange
}: {
  children: ReactNode;
  queryInput: QueryInput;
  metadataFields: MetadataFieldProps[]; // need to take into consideration the select and the alias
  forceCompoundMode?: boolean;
  validateValueByType: (valueType: MetadataType, value: string) => boolean;
  onChange: (query: QueryInput) => void;
}) => {
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
      return !queryInput.query.and.some((cond: AndOrMetadataInput) => {
        return !!cond.not || !!cond.or || !!cond.and;
      });
    }
    return true;
  };

  const [rootCondition, setRootCondition] = useState<AndOrMetadataInput>(getInitialQuery());
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(checkIfSimpleMode());

  // const [rootConditionBackend, setRootConditionBackend] = useState<AndOrMetadataInput | null>(null);
  const [metadataFieldsList, setMetadataFieldsList] =
    useState<MetadataFieldProps[]>(metadataFields);

  useEffect(() => {
    setIsSimpleMode(checkIfSimpleMode());
    setRootCondition(getInitialQuery());
  }, [queryInput]);

  useEffect(() => {
    setIsSimpleMode(checkIfSimpleMode());
  }, [forceCompoundMode]);

  useEffect(() => {
    setMetadataFieldsList(metadataFields);
  }, [metadataFields]);

  useEffect(() => {
    onChange({
      query: convertToBackandFormatAndRemoveEmptyConditions(rootCondition) ?? {}
    });
  }, [rootCondition]);

  function generateUniqueId(): string {
    return _.random(0, 100000).toString();
  }

  function addUniqueIds(input: AndOrMetadataInput): AndOrMetadataInput {
    const id = generateUniqueId();
    const updatedInput: AndOrMetadataInput = { ...input, id };
    if (input.or) {
      updatedInput.or = input.or.map((orInput) => addUniqueIds(orInput));
    }
    if (input.and) {
      updatedInput.and = input.and.map((andInput) => addUniqueIds(andInput));
    }
    return updatedInput;
  }

  function getZeroValueByType(type: MetadataType | undefined): string {
    switch (type) {
      case 'BOOLEAN':
        return 'false';
      case 'INTEGER':
        return '0';
      case 'FLOAT':
        return '0.0';
      case 'STRING':
        return '';
      case 'BLOB':
        return '';
      default:
        return '';
    }
  }

  function getOperatorsByMetadataType(type: MetadataType): { label: string; id: Comparator }[] {
    switch (type) {
      case 'BOOLEAN':
        return BooleanOperators;
      case 'INTEGER':
        return IntegerOperators;
      case 'FLOAT':
        return FloatOperators;
      case 'STRING':
        return StringOperators;
      case 'BLOB':
        return BlobOperators;
      default:
        return [];
    }
  }

  function checkIfOperatorRequiresValueField(operator: Comparator): boolean {
    switch (operator) {
      case 'IS_NULL':
      case 'IS_POSITIVE_INFINITY':
      case 'IS_NEGATIVE_INFINITY':
      case 'IS_NAN':
        return false;
      default:
        return true;
    }
  }

  function convertToBackandFormatAndRemoveEmptyConditions(
    condition: AndOrMetadataInput
  ): AndOrMetadataInput | null {
    if (!!condition.or || !!condition.and) {
      // Recursively remove empty conditions from nested conditions
      const nonEmptyConditions = (condition.or || condition.and || [])
        .map(convertToBackandFormatAndRemoveEmptyConditions) //for each nested condition call removeEmptyConditions
        .filter((c) => c !== null) as AndOrMetadataInput[];

      // If all nested conditions are removed and the current condition is empty, return null
      if (nonEmptyConditions.length === 0) {
        return null;
      }

      // Return the modified condition
      if (condition.or) {
        return { or: nonEmptyConditions };
      } else {
        return { and: nonEmptyConditions };
      }
    } else if (!!condition.filter) {
      // If it's a simple filter, check if it's empty
      if (
        !condition.filter.key ||
        (!condition.filter.value &&
          !(
            condition.filter?.comparator === 'IS_POSITIVE_INFINITY' ||
            condition.filter?.comparator === 'IS_NEGATIVE_INFINITY' ||
            condition.filter?.comparator === 'IS_NAN' ||
            condition.filter?.comparator === 'IS_NULL'
          ))
      ) {
        return null;
      }
    }
    // Return the original input if it's not a filter, OR, or AND
    if (condition.filter?.comparator === 'IS_POSITIVE_INFINITY') {
      return { ...condition, filter: { ...condition.filter, comparator: 'EQUAL', value: '+Inf' } };
    }
    if (condition.filter?.comparator === 'IS_NEGATIVE_INFINITY') {
      return { ...condition, filter: { ...condition.filter, comparator: 'EQUAL', value: '-Inf' } };
    }
    if (condition.filter?.comparator === 'IS_NAN') {
      return { ...condition, filter: { ...condition.filter, comparator: 'EQUAL', value: 'NaN' } };
    }
    if (condition.filter?.comparator === 'IS_NULL') {
      return {
        ...condition,
        filter: {
          ...condition.filter,
          value: getZeroValueByType(condition.filter.valueType)
        }
      };
    }
    return condition;
  }

  return (
    <QueryBuilderContext.Provider
      value={{
        isSimpleMode,
        setIsSimpleMode,
        rootCondition,
        setRootCondition,
        metadataFieldsList,
        generateUniqueId,
        addUniqueIds,
        getZeroValueByType,
        getOperatorsByMetadataType,
        checkIfOperatorRequiresValueField,
        convertToBackandFormatAndRemoveEmptyConditions,
        validateValueByType
      }}
    >
      {children}
    </QueryBuilderContext.Provider>
  );
};
