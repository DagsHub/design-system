import { useState } from 'react';
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
  id?: string; // Add unique ID property
}

export interface AndOrMetadataInput {
  // each condition is either AND or OR or Filter
  or?: AndOrMetadataInput[];
  and?: AndOrMetadataInput[];
  filter?: MetadataInput;
  not?: Boolean;
  id?: string; // Add unique ID property
}

export interface QueryInput {
  query?: AndOrMetadataInput;
  include?: string[];
  exclude?: string[];
}

export function generateUniqueId(): string {
  return _.random(0, 100000).toString();
}

export function addUniqueIds(input: AndOrMetadataInput): AndOrMetadataInput {
  debugger;
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

export const validateConditionValue = (valueType: MetadataType, value: string): boolean => {
  try {
    switch (valueType) {
      case 'BOOLEAN':
        return value === 'true' || value === 'false';
      case 'INTEGER':
        const integerRegex = /^([-+]?(0|[1-9][0-9]*))$/;
        return !isNaN(parseInt(value)) && integerRegex.test(value);
      case 'FLOAT':
        const floatRegex = /^([-+]?(0\.[0-9]+|0|[1-9][0-9]*(\.[0-9]+)?))$/;
        return !isNaN(parseFloat(value)) && floatRegex.test(value);
      case 'STRING':
        return true;
      case 'BLOB':
        return true;
      default:
        return false; //This mechanism is not perfect, cause for numbers with a lot of digits, there is rounding, and then it's not equal to the string
    }
  } catch (e) {
    return false;
  }
};

export function getZeroValueByType(type: MetadataType | undefined): string {
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

export function hasUncompletedConditions(condition: AndOrMetadataInput): boolean {
  if (!!condition.or || !!condition.and) {
    if (condition.or?.length === 0 || condition.and?.length === 0) {
      return false; // it is possible to have an empty group, it is not considered uncompleted
    }
    // Recursively check if all nested conditions are empty
    return (condition.or || condition.and || []).every(hasUncompletedConditions);
  } else if (!!condition.filter) {
    // If it's a simple filter, check if it's empty
    return (
      !condition.filter.key ||
      (!condition.filter.value &&
        !(
          condition.filter?.comparator === 'IS_POSITIVE_INFINITY' ||
          condition.filter?.comparator === 'IS_NEGATIVE_INFINITY' ||
          condition.filter?.comparator === 'IS_NAN' ||
          condition.filter?.comparator === 'IS_NULL'
        ))
    );
  }
  // Return false if it's not a filter, OR, or AND
  return false;
}

export function convertToBackandFormatAndRemoveEmptyConditions(
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
