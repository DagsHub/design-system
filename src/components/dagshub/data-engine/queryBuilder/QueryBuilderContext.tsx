import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import _ from 'lodash';

type MetadataType = 'BOOLEAN' | 'INTEGER' | 'FLOAT' | 'STRING' | 'BLOB';

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
  not?: boolean;
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
  getOperatorsByMetadataType: (type: MetadataType) => { label: string; id: Comparator }[];
  checkIfOperatorRequiresValueField: (operator: Comparator) => boolean;
  validateValueByType: (valueType: MetadataType, value: string, comparator: Comparator) => boolean;
  isDisplayableInSimpleMode: boolean;
  onToggleQueryMode: () => void;
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
  validateValueByType,
  onChange,
}: {
  children: ReactNode;
  queryInput: QueryInput;
  metadataFields: MetadataFieldProps[]; // need to take into consideration the select and the alias
  validateValueByType: (valueType: MetadataType, value: string, comparator: Comparator) => boolean;
  onChange: (query: QueryInput) => void;
}) => {
  const getInitialQuery = useCallback(() => {
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
    return addUniqueIds(convertBackandFormatToUiFormat(condition) ?? { and: [] });
  }, [queryInput]);

  const checkIfConditionIsDisplayableInSimpleMode = (
    query: AndOrMetadataInput | undefined
  ): boolean => {
    if (!query) return true;
    if (!!query?.or || !!query?.not) {
      return false;
    }
    if (!!query?.and) {
      // if it's an and group with no nested groups and no not-conditions, it's simple as well
      return !query.and.some((cond: AndOrMetadataInput) => {
        return !!cond.not || !!cond.or || !!cond.and;
      });
    }
    return true;
  };

  const [rootCondition, setRootCondition] = useState<AndOrMetadataInput>(() => getInitialQuery());
  const [isDisplayableInSimpleMode, setIsDisplayableInSimpleMode] = useState<boolean>(
    checkIfConditionIsDisplayableInSimpleMode(queryInput.query)
  );
  const [isCompoundModeForced, setIsCompoundModeForced] = useState<boolean>(false);
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(() =>
    isDisplayableInSimpleMode && !isCompoundModeForced
  );

  useEffect(() => {
    if (
      JSON.stringify(removeIdFields(getInitialQuery())) !==
      JSON.stringify(removeIdFields(rootCondition))
    ) {
      setRootCondition(getInitialQuery);
      setIsDisplayableInSimpleMode(checkIfConditionIsDisplayableInSimpleMode(queryInput.query));
    }
  }, [queryInput.query]);

  useEffect(() => {
    setIsDisplayableInSimpleMode(checkIfConditionIsDisplayableInSimpleMode(rootCondition));
  }, [rootCondition]);

  function onToggleQueryMode() {
    setIsCompoundModeForced(!isCompoundModeForced);
  }

  useEffect(() => {
    console.log("set is simple mode", isDisplayableInSimpleMode && !isCompoundModeForced);
    console.log("is compound mode forced", isCompoundModeForced);
    console.log("is displayable in simple mode", isDisplayableInSimpleMode);
    setIsSimpleMode(isDisplayableInSimpleMode && !isCompoundModeForced);
  }, [isCompoundModeForced, isDisplayableInSimpleMode]);

  //This function is used to remove the root and wrapper, if it was added for ui purposes and not needed anymore
  const removeRootAndBlockIfWasAddedAndNotNeeded = (condition: AndOrMetadataInput | null) => {
    if (!queryInput.query?.and && !!condition?.and) {
      if (condition.and.length === 0) {
        return undefined;
      }
      if (condition.and.length === 1 && !!condition.and[0].filter) {
        return condition.and[0];
      }
      return condition;
    }
    return condition;
  };

  const debouncedOnChange = useCallback(
    _.debounce(() => {
      onChange({
        ...queryInput,
        query:
          removeRootAndBlockIfWasAddedAndNotNeeded(
            convertUiFormatToBackandFormat(removeIdFields(rootCondition ?? {}))
          ) ?? undefined
      });
    }, 200),
    [onChange, queryInput, rootCondition]
  );

  useEffect(() => {
    debouncedOnChange();
    return () => {
      debouncedOnChange.cancel();
    };
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

  function removeIdFields(input: QueryInput | AndOrMetadataInput | MetadataInput): any {
    if (Array.isArray(input)) {
      return input.map((item) => removeIdFields(item));
    } else if (typeof input === 'object' && input !== null) {
      if ('id' in input) {
        const { id, ...rest } = input;
        const result: any = { ...rest };
        for (const key in result) {
          result[key] = removeIdFields(result[key]);
        }
        return result;
      } else {
        const result: any = { ...input };
        for (const key in result) {
          result[key] = removeIdFields(result[key]);
        }
        return result;
      }
    }
    return input;
  }

  function convertUiFormatToBackandFormat(
    condition: AndOrMetadataInput
  ): AndOrMetadataInput | null {
    if (!!condition.or || !!condition.and) {
      // Recursively convert to backand format
      const formattedNestedConditions = (condition.or || condition.and || []).flatMap(
        (c) => convertUiFormatToBackandFormat(c) as AndOrMetadataInput
      );

      // Return the modified condition
      if (condition.or) {
        return { or: formattedNestedConditions };
      } else {
        return { and: formattedNestedConditions };
      }
    }
    if ((condition.filter?.comparator as string) === 'IS_POSITIVE_INFINITY') {
      return {
        ...condition,
        filter: { ...condition.filter, comparator: 'EQUAL', value: 'inf' }
      };
    }
    if ((condition.filter?.comparator as string) === 'IS_NEGATIVE_INFINITY') {
      return {
        ...condition,
        filter: { ...condition.filter, comparator: 'EQUAL', value: '-inf' }
      };
    }
    if ((condition.filter?.comparator as string) === 'IS_NAN') {
      return {
        ...condition,
        filter: { ...condition.filter, comparator: 'EQUAL', value: 'nan' }
      };
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

  function convertBackandFormatToUiFormat(
    condition: AndOrMetadataInput
  ): AndOrMetadataInput | null {
    if (!!condition.or || !!condition.and) {
      // Recursively convert to ui format
      const formattedNestedConditions = (condition.or || condition.and || []).flatMap(
        (c) => convertBackandFormatToUiFormat(c) as AndOrMetadataInput
      );

      // Return the modified condition
      if (condition.or) {
        return { or: formattedNestedConditions };
      } else {
        return { and: formattedNestedConditions };
      }
    }
    if (condition?.filter?.valueType === 'FLOAT' && condition?.filter?.comparator === 'EQUAL') {
      if (condition.filter.value === 'inf') {
        return {
          ...condition,
          filter: { ...condition.filter, comparator: 'IS_POSITIVE_INFINITY', value: '' }
        };
      }
      if (condition.filter.value === '-inf') {
        return {
          ...condition,
          filter: { ...condition.filter, comparator: 'IS_NEGATIVE_INFINITY', value: '' }
        };
      }
      if (condition.filter.value === 'nan') {
        return {
          ...condition,
          filter: { ...condition.filter, comparator: 'IS_NAN', value: '' }
        };
      }
    }
    if (condition.filter?.comparator === 'IS_NULL') {
      return {
        ...condition,
        filter: {
          ...condition.filter,
          value: ''
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
        metadataFieldsList: metadataFields,
        generateUniqueId,
        addUniqueIds,
        getOperatorsByMetadataType,
        checkIfOperatorRequiresValueField,
        validateValueByType,
        isDisplayableInSimpleMode,
        onToggleQueryMode
      }}
    >
      {children}
    </QueryBuilderContext.Provider>
  );
};
