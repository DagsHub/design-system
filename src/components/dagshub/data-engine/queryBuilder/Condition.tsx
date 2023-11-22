import React from 'react';
import {AndOrMetadataInput, Comparator, Operators} from "./QueryBuilder";

const Condition = ({condition, onChange, level = 0, isSimple, onRemove}:{condition: AndOrMetadataInput; onChange: any; level?: number; onRemove?:any, isSimple?:boolean}) => {
    const containerStyle = {
        border: '1px solid black',
        padding: '10px',
        margin: '10px 0',
    };

    if (!condition?.or && !condition?.and) {
        // Simple condition
        return (
            <div style={{padding:"10px", margin:"10px 0", backgroundColor:"lightgrey"}}>
                {!isSimple && condition.not && <span>NOT </span>}
                <input
                    value={condition.filter?.key || undefined}
                    onChange=
                    {e => {
                            onChange({...condition, filter: {...condition.filter, key: e.target.value }});
                        }
                    }
                    placeholder="Field"
                />
                <select
                    value={condition.filter?.comparator || Operators[0].id}
                    onChange={e => onChange({...condition, filter: {...condition.filter, comparator: e.target.value }})}
                >
                    {Operators.map(op => <option key={op.label} value={op.id}>{op.label}</option>)}
                </select>
                <input
                    value={condition.filter?.value || undefined}
                    onChange={e => onChange({...condition, filter: {...condition.filter, value: e.target.value }})}
                    placeholder="Value"
                />
                <button onClick={onRemove}>
                    Remove Condition
                </button>
                {!isSimple && <button onClick={()=>onChange({...condition, not: !condition.not})}>
                    {condition.not? "Remove Not from condition":"Add NOT to condition"}
                </button>}
            </div>
        );
    } else {
        // Compound condition (AND/OR)
        const isAndRelation = !!condition.and;
        return (
            <div style={{padding:"10px", margin:"10px 0", border:level==0?"1px solid black": "1px dashed black"}}>
                {!isSimple && condition.not && <span>NOT </span>}
                {!isSimple && <><select
                    value={isAndRelation? 'AND' : 'OR'}
                    onChange={e => {
                        if(isAndRelation && e.target.value === 'OR'){
                            onChange({...condition, or: condition.and, and: undefined})
                        } else if(!isAndRelation && e.target.value === 'AND'){
                            onChange({...condition, and: condition.or, or: undefined})
                        }
                        //id the same relation, do nothing
                }}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>
                <button onClick={()=>onChange({...condition, not: !condition.not})}>
                    {condition.not? "Remove Not from group":"Add NOT to group"}
                </button></>}
                {!isSimple && onRemove !== undefined && <button onClick={onRemove}>Remove Group</button>}
                <div>
                    {(isAndRelation?condition.and: condition.or)?.map((cond, index) => (
                        <div key={index}>
                            <Condition
                                isSimple
                                condition={cond}
                                onChange={(newCond:AndOrMetadataInput) => {
                                    const newConditions = condition.and || condition.or || [];
                                    newConditions[index] = newCond;
                                    if(isAndRelation){
                                        onChange({...condition, and: newConditions});
                                    } else{// or relation
                                        onChange({...condition, or: newConditions});
                                    }
                                }}
                                level={level + 1}
                                onRemove={() => {
                                    const newConditions = condition.and || condition.or || [];
                                    newConditions.splice(index, 1);
                                    if(isAndRelation){
                                        onChange({...condition, and: newConditions});
                                    } else{// or relation
                                        onChange({...condition, or: newConditions});
                                    }
                                }}
                            />
                        </div>
                    ))}
                    <button onClick={() => {
                        const newConditions = condition.and || condition.or || [];
                        newConditions.push({filter:{comparator: Comparator.EQUAL}});
                        if(isAndRelation){
                            onChange({...condition, and: newConditions});
                        } else {// or relation
                            onChange({...condition, or: newConditions});
                        }
                    }}>
                        Add Condition
                    </button>
                    {!isSimple && <button onClick={() => {
                        const newConditions = condition.and || condition.or || [];
                        newConditions.push({and:[{filter:{comparator: Comparator.EQUAL}}]});
                        if(isAndRelation){
                            onChange({...condition, and: newConditions});
                        } else {// or relation
                            onChange({...condition, or: newConditions});
                        }
                    }}>
                        Add Group
                        {/*The group is AND by default*/}
                    </button>}
                </div>
            </div>
        );
    }
}

export default Condition;
