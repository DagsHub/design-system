import React, {useEffect, useState} from 'react';
import {
    AndOrMetadataInput,
    BooleanOperators,
    FloatOperators,
    IntegerOperators,
    Operators,
    StringOperators,
    BlobOperators, MetadataFieldProps
} from "./QueryBuilder";

class Comparator {
}

const Condition = ({
                       condition,
                       onChange,
                       metadataFields,
                       level = 0,
                       isSimple,
                       onRemove,
                       onAdd
                   }: { condition: AndOrMetadataInput; onChange: any; metadataFields: MetadataFieldProps[], level?: number; onRemove?: any, onAdd?: any, isSimple?: boolean }) => {
    const containerStyle = {
        fontFamily: "Inter",
        fontSize: "14px",
        lineHeight: "20px",
    };

    const [operatorsList, setOperatorsList] = useState<{ label: string; id: Comparator; }[]>(Operators);
    const [shouldDisplayValueField, setShouldDisplayValueField] = useState<boolean>(true);
    useEffect(() => {
        if (!!condition?.filter?.valueType) {
            switch (condition.filter.valueType) {
                case "STRING":
                    setOperatorsList(StringOperators);
                    break;
                case "INTEGER":
                    setOperatorsList(IntegerOperators);
                    break;
                case "FLOAT":
                    setOperatorsList(FloatOperators);
                    break;
                case "BOOLEAN":
                    setOperatorsList(BooleanOperators);
                    break;
                case "BLOB":
                    setOperatorsList(BlobOperators);
                    break;
            }
        }
    }, [condition.filter?.key])

    useEffect(() => {
        if (!!condition.filter?.comparator) {
            switch (condition.filter.comparator) {
                case "IS_NULL":
                case "IS_NEGATIVE_INFINITY":
                case "IS_POSITIVE_INFINITY":
                case "IS_NAN":
                    setShouldDisplayValueField(false);
                    onChange({...condition, filter: {...condition.filter, value: undefined}});
                    break;
                default:
                    setShouldDisplayValueField(true);
                    break;
            }
        }
    }, [condition.filter?.comparator])

    useEffect(()=>{
        if(!!condition.filter?.comparator){
            // check if comparator exists in operatorsList, and if not, change the comparator to the first one in the list
            const comparatorExists = operatorsList.some(op => op.id === condition.filter?.comparator);
            if(!comparatorExists){
                onChange({...condition, filter: {...condition.filter, comparator: operatorsList[0].id}});
            }
        }
    },[operatorsList])

    if (!condition?.or && !condition?.and && !!condition?.filter) {
        // Simple condition
        return (
            <div style={{...containerStyle, padding: "10px", margin: "10px 0", backgroundColor: "lightgrey"}}>
                {!isSimple && condition.not && <span>NOT </span>}
                <select
                    style={{...containerStyle}}
                    value={condition.filter?.key || undefined}// not sure if it's ok
                    onChange=
                        {e => {
                            onChange({
                                ...condition,
                                filter: {
                                    ...condition.filter,
                                    key: e.target.value,
                                    valueType: metadataFields.find(field => field.name === e.target.value)?.valueType
                                }
                            });
                        }
                        }
                >
                    <option value="" disabled selected>Select a metadata field</option>
                    {metadataFields?.map(op => <option key={op.name} value={op.name}>{op.name}</option>)}
                </select>
                <select
                    style={{...containerStyle}}
                    value={condition.filter?.comparator as string || operatorsList[0].id as string}
                    onChange={e => {onChange({...condition, filter: {...condition.filter, comparator: e.target.value}})}}
                >
                    {operatorsList.map(op => <option key={op.label} value={op.id as string}>{op.label}</option>)}
                </select>
                {shouldDisplayValueField &&
                    <input
                        style={{...containerStyle}}
                        value={condition.filter?.value || undefined}
                        aria-errormessage={"Value must be a " + condition.filter?.valueType}
                        onChange={e => onChange({...condition, filter: {...condition.filter, value: e.target.value}})}
                        placeholder="Value"
                    />}
                <button onClick={onRemove} style={{...containerStyle}}>
                    x
                </button>
                <button onClick={onAdd} style={{...containerStyle}}>
                    +
                </button>
                {!isSimple &&
                    <button style={{...containerStyle}} onClick={() => onChange({...condition, not: !condition.not})}>
                        {condition.not ? "Remove Not from condition" : "Add NOT to condition"}
                    </button>}
            </div>
        );
    } else {
        // Compound condition (AND/OR)
        //check if there are simple conditions in the group
        const isAndRelation = !!condition.and;
        const isThereSimpleFilters = (isAndRelation ? condition.and : condition.or)?.some((cond) => {
                return !!cond.filter;
            }
        );

        return (
            <div style={{
                ...containerStyle,
                padding: "10px",
                margin: "10px 0",
                border: level == 0 ? "1px solid black" : "1px dashed black"
            }}>
                {!isSimple && condition.not && <span style={{...containerStyle}}>NOT </span>}
                {!isSimple && <><select
                    value={isAndRelation ? 'AND' : 'OR'}
                    onChange={e => {
                        if (isAndRelation && e.target.value === 'OR') {
                            onChange({...condition, or: condition.and, and: undefined})
                        } else if (!isAndRelation && e.target.value === 'AND') {
                            onChange({...condition, and: condition.or, or: undefined})
                        }
                        //id the same relation, do nothing
                    }}>
                    <option style={{...containerStyle}} value="AND">AND</option>
                    <option style={{...containerStyle}} value="OR">OR</option>
                </select>
                    <button style={{...containerStyle}} onClick={() => onChange({...condition, not: !condition.not})}>
                        {condition.not ? "Remove Not from group" : "Add NOT to group"}
                    </button>
                </>}
                {!isSimple && onRemove !== undefined &&
                    <button style={{...containerStyle}} onClick={onRemove}>Remove Group</button>}
                {!isThereSimpleFilters && <div>
                    <button style={{...containerStyle}} onClick={() => {
                        const newConditions = condition.and || condition.or || [];
                        newConditions.splice(0,0,{filter: {comparator: Operators[0].id}});
                        // newConditions.push({filter: {comparator: Operators[0].id}});
                        if (isAndRelation) {
                            onChange({...condition, and: newConditions});
                        } else {// or relation
                            onChange({...condition, or: newConditions});
                        }
                    }}>
                        Add Condition
                    {/*    appears when there are no simple conditions, should add to the beginning of the list*/}
                    </button>
                </div>}
                <div>
                    {(isAndRelation ? condition.and : condition.or)?.map((cond, index) => (
                        <div key={index}>
                            <Condition
                                metadataFields={metadataFields}
                                isSimple={isSimple}
                                condition={cond}
                                onChange={(newCond: AndOrMetadataInput) => {
                                    const newConditions = condition.and || condition.or || [];
                                    newConditions[index] = newCond;
                                    if (isAndRelation) {
                                        onChange({...condition, and: newConditions});
                                    } else {// or relation
                                        onChange({...condition, or: newConditions});
                                    }
                                }}
                                level={level + 1}
                                onRemove={() => {
                                    const newConditions = condition.and || condition.or || [];
                                    newConditions.splice(index, 1);
                                    if (isAndRelation) {
                                        onChange({...condition, and: newConditions});
                                    } else {// or relation
                                        onChange({...condition, or: newConditions});
                                    }
                                }}
                                onAdd={() => {
                                    const newConditions = condition.and || condition.or || [];
                                    newConditions.splice(index+1, 0, {filter: {comparator: Operators[0].id}});
                                    // newConditions.push({filter: {comparator: Operators[0].id}});
                                    if (isAndRelation) {
                                        onChange({...condition, and: newConditions});
                                    } else {// or relation
                                        onChange({...condition, or: newConditions});
                                    }
                                }
                                }
                            />
                        </div>
                    ))}
                    {!isSimple && <div role={"button"} style={{...containerStyle, cursor: "pointer"}} onClick={() => {
                        const newConditions = condition.and || condition.or || [];
                        newConditions.push({and: []}); // is it ok or should it be [{}]
                        if (isAndRelation) {
                            onChange({...condition, and: newConditions});
                        } else {// or relation
                            onChange({...condition, or: newConditions});
                        }
                    }}>
                        Add Condition group (AND/OR)
                        {/*The group is AND by default,and always added to the end*/}
                    </div>}
                </div>
            </div>
        );
    }
}

export default Condition;
