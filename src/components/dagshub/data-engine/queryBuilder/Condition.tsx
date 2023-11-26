import React from 'react';
import {AndOrMetadataInput, Operators} from "./QueryBuilder";

const Condition = ({condition, onChange, level = 0, isSimple, onRemove, onAdd}:{condition: AndOrMetadataInput; onChange: any; level?: number; onRemove?:any,onAdd?:any, isSimple?:boolean}) => {
    const containerStyle = {
        fontFamily:"Inter",
        fontSize:"14px",
        lineHeight:"20px",
    };

    if (!condition?.or && !condition?.and) {
        // Simple condition
        return (
            <div style={{...containerStyle, padding:"10px", margin:"10px 0", backgroundColor:"lightgrey"}}>
                {!isSimple && condition.not && <span>NOT </span>}
                <input
                    style={{...containerStyle}}
                    value={condition.filter?.key || undefined}
                    onChange=
                    {e => {
                            onChange({...condition, filter: {...condition.filter, key: e.target.value }});
                        }
                    }
                    placeholder="Field"
                />
                <select
                    style={{...containerStyle}}
                    value={condition.filter?.comparator || Operators[0].id}
                    onChange={e => onChange({...condition, filter: {...condition.filter, comparator: e.target.value }})}
                >
                    {Operators.map(op => <option key={op.label} value={op.id}>{op.label}</option>)}
                </select>
                <input
                    style={{...containerStyle}}
                    value={condition.filter?.value || undefined}
                    onChange={e => onChange({...condition, filter: {...condition.filter, value: e.target.value }})}
                    placeholder="Value"
                />
                <button onClick={onRemove} style={{...containerStyle}}>
                    x
                </button>
                <button onClick={onAdd}  style={{...containerStyle}}>
                    +
                </button>
                {!isSimple && <button  style={{...containerStyle}} onClick={()=>onChange({...condition, not: !condition.not})}>
                    {condition.not? "Remove Not from condition":"Add NOT to condition"}
                </button>}
            </div>
        );
    } else {
        // Compound condition (AND/OR)
        //check if there are simple conditions in the group
        const isAndRelation = !!condition.and;
        const isThereSimpleFilters= (isAndRelation?condition.and: condition.or)?.some((cond) =>
            {return !!cond.filter;}
        );

        return (
            <div style={{...containerStyle, padding:"10px", margin:"10px 0", border:level==0?"1px solid black": "1px dashed black"}}>
                {!isSimple && condition.not && <span  style={{...containerStyle}}>NOT </span>}
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
                    <option  style={{...containerStyle}} value="AND">AND</option>
                    <option  style={{...containerStyle}} value="OR">OR</option>
                </select>
                <button  style={{...containerStyle}} onClick={()=>onChange({...condition, not: !condition.not})}>
                    {condition.not? "Remove Not from group":"Add NOT to group"}
                </button></>}
                {!isSimple && onRemove !== undefined && <button  style={{...containerStyle}} onClick={onRemove}>Remove Group</button>}
                {!isThereSimpleFilters && <div><button  style={{...containerStyle}} onClick={() => {
                    const newConditions = condition.and || condition.or || [];
                    newConditions.push({filter:{comparator: Operators[0].id}});
                    if(isAndRelation){
                        onChange({...condition, and: newConditions});
                    } else {// or relation
                        onChange({...condition, or: newConditions});
                    }
                }}>
                    Add Condition
                </button></div>}
                <div>
                    {(isAndRelation?condition.and: condition.or)?.map((cond, index) => (
                        <div key={index}>
                            <Condition
                                isSimple={isSimple}
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
                                onAdd={() => {
                                    const newConditions = condition.and || condition.or || [];
                                    newConditions.push({filter:{comparator: Operators[0].id}});
                                    if(isAndRelation){
                                        onChange({...condition, and: newConditions});
                                    } else {// or relation
                                        onChange({...condition, or: newConditions});
                                    }
                                }
                                }
                            />
                        </div>
                    ))}
                    {!isSimple && <div role={"button"} style={{...containerStyle, cursor:"pointer"}} onClick={() => {
                        const newConditions = condition.and || condition.or || [];
                        newConditions.push({and:[]}); // is it ok or should it be [{}]
                        if(isAndRelation){
                            onChange({...condition, and: newConditions});
                        } else {// or relation
                            onChange({...condition, or: newConditions});
                        }
                    }}>
                        Add Condition group (AND/OR)
                        {/*The group is AND by default*/}
                    </div>}
                </div>
            </div>
        );
    }
}

export default Condition;
