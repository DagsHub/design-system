import React, {useState} from 'react';
import {
    AndOrMetadataInput, generateUniqueId,
    MetadataFieldProps,
    Operators,
} from "./ConditionHelperFunctionsAndTypes";
import {MetadataType} from "../metadataKeyValue/MetadataKeyValueList";
import {Box} from "@mui/system";
import {ConditionDropdown} from "./ConditionDropdown";
import {Button, ButtonVariant} from "../../../elements";
import {Icon} from "../../../icons";
import {Menu, MenuItem, ThemeProvider, Typography} from "@mui/material";
import theme from "../../../../theme";
import Condition from "./Condition";

const GroupCondition = ({
                            condition,
                            onChange,
                            metadataFields,
                            level = 0,
                            isSimple,
                            onRemove,
                            verifyCondition
                        }: {
    condition: AndOrMetadataInput;
    onChange: any;
    metadataFields: MetadataFieldProps[],
    level?: number;
    onRemove?: any;
    onAdd?: any;
    isSimple?: boolean;
    verifyCondition: (valueType: MetadataType, value: string) => boolean;
}) => {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const conditionGroupAddButtonRef = React.useRef<HTMLButtonElement>(null);

    //check if there are simple conditions in the group
    const isAndRelation = !!condition.and;
    const areThereSimpleFilters = (isAndRelation ? condition.and : condition.or)?.some((cond) => {
            return !!cond.filter;
        }
    );

    return (
        <ThemeProvider theme={theme}>
            <Box
                style={{
                    padding: "10px",
                    border: level == 0 ? "1px solid rgba(226, 232, 240, 1)" : "2px dashed rgba(203, 213, 225, 1)",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    backgroundColor: "rgba(248, 250, 252, 1)"
                }}
            >
                {isSimple && !areThereSimpleFilters &&
                    <Button
                        ref={conditionGroupAddButtonRef}
                        style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "8px",
                            padding: "8px",
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex"
                        }}
                        label={""}
                        onClick={() => {
                            const newConditions = condition.and || condition.or || [];
                            newConditions.splice(0, 0, {filter: {comparator: Operators[0].id}});
                            if (isAndRelation) {
                                onChange({...condition, and: newConditions});
                            } else {// or relation
                                onChange({...condition, or: newConditions});
                            }
                        }}
                        variant={ButtonVariant.Ghost}
                        iconRight={<Icon icon={"solid-plus"} width={14} height={16}
                                         fill={"rgba(100, 116, 139, 1)"}/>}
                    />}
                {!isSimple &&
                    <Box style={{display: "flex", flexDirection: "row", gap: "4px"}}>
                        {condition.not &&
                            <Box style={{
                                display: "flex",
                                width: "fit-content",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: "8px",
                                padding: "4px 8px",
                                backgroundColor: "rgba(241, 245, 249, 1)",
                                borderRadius: "8px",
                                border: "1px solid rgba(226, 232, 240, 1)",
                                boxSizing: "border-box",
                                height: "28px"
                            }}>
                                <Typography variant={"medium"}
                                            style={{color: "rgba(84, 103, 222, 1)"}}>NOT</Typography>
                                <span style={{display: "flex", cursor: "pointer"}}><Icon
                                    onClick={() => onChange({...condition, not: !condition.not})}
                                    icon={"solid-x-circle"} width={16} height={16}
                                    fill={"rgba(148, 163, 184, 1)"}/></span>
                            </Box>
                        }
                        <ConditionDropdown
                            inputColor={"rgba(84, 103, 222, 1)"}
                            initialChecked={isAndRelation ? {id: 'AND', label: 'AND'} : {id: 'OR', label: 'OR'}}
                            label={""}
                            onChange={(e, value) => {
                                if (isAndRelation && value?.id === 'OR') {
                                    onChange({...condition, or: condition.and, and: undefined})
                                } else if (!isAndRelation && value?.id === 'AND') {
                                    onChange({...condition, and: condition.or, or: undefined})
                                }
                                //if the same relation, do nothing
                            }}
                            options={[{id: "AND", label: "AND"}, {id: "OR", label: "OR"}]}
                        />

                        {!isSimple && onRemove !== undefined && <Button
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "8px",
                                padding: "8px",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex"
                            }}
                            label={""}
                            variant={ButtonVariant.Ghost}
                            onClick={onRemove}
                            iconRight={<Icon icon={"solid-trash"} width={14} height={16}
                                             fill={"rgba(100, 116, 139, 1)"}/>}
                        />}

                        <Button
                            ref={conditionGroupAddButtonRef}
                            style={{
                                width: "28px",
                                height: "28px",
                                borderRadius: "8px",
                                padding: "8px",
                                alignItems: "center",
                                justifyContent: "center",
                                display: "flex"
                            }}
                            label={""}
                            onClick={() => setIsOpen(true)}
                            variant={ButtonVariant.Ghost}
                            iconRight={<Icon icon={"solid-plus"} width={14} height={16}
                                             fill={"rgba(100, 116, 139, 1)"}/>}
                        />
                        <Menu
                            sx={{
                                '& .MuiPaper-root': {
                                    borderRadius: '12px',
                                },
                                padding: '8px',
                            }}
                            id="basic-menu"
                            anchorEl={conditionGroupAddButtonRef.current}
                            open={isOpen}
                            onClose={() => setIsOpen(false)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => {
                                const newConditions = condition.and || condition.or || [];
                                newConditions.push({and: []}); // is it ok or should it be [{}]
                                if (isAndRelation) {
                                    onChange({...condition, and: newConditions});
                                } else {// or relation
                                    onChange({...condition, or: newConditions});
                                }
                                setIsOpen(false)
                            }}>
                                <Typography variant={"medium"}>
                                    Add condition group
                                </Typography>
                            </MenuItem>
                            {!condition.not &&
                                <MenuItem onClick={() => {
                                    onChange({...condition, not: !condition.not});
                                    setIsOpen(false)
                                }}>
                                    <Typography variant={"medium"}>
                                        Add NOT to group
                                    </Typography>
                                </MenuItem>
                            }
                            {!areThereSimpleFilters && <MenuItem onClick={() => {
                                const newConditions = condition.and || condition.or || [];
                                newConditions.splice(0, 0,
                                    {
                                        filter: {
                                            id: generateUniqueId(),
                                            key: "",
                                            comparator: Operators[0].id,
                                            value: ""
                                        }
                                    });
                                if (isAndRelation) {
                                    onChange({...condition, and: newConditions});
                                } else {// or relation
                                    onChange({...condition, or: newConditions});
                                }
                                setIsOpen(false)
                            }}>
                                <Typography variant={"medium"}>
                                    Add condition
                                </Typography>
                            </MenuItem>}
                        </Menu>
                    </Box>
                }

                {(isAndRelation ? condition.and : condition.or)?.map((cond, index) => (
                    <Condition
                        metadataFields={metadataFields}
                        isSimple={isSimple}
                        condition={cond}
                        verifyCondition={verifyCondition}
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
                            newConditions.splice(index + 1, 0, {
                                filter: {
                                    id: generateUniqueId(),
                                    key: "",
                                    comparator: Operators[0].id,
                                    value: ""
                                }
                            });
                            if (isAndRelation) {
                                onChange({...condition, and: newConditions});
                            } else {// or relation
                                onChange({...condition, or: newConditions});
                            }
                        }
                        }
                    />
                ))}
            </Box>
        </ThemeProvider>
    );
}

export default GroupCondition;
