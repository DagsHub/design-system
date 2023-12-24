import {RadioButtonItemProps} from "../../../forms";
import {SyntheticEvent} from "react";
import {DropdownV2} from "../../../elements";
import React from "react";

export function ConditionDropdown({
                                      onChange,
                                      initialChecked,
                                      options,
                                      label,
                                      maxWidth,
                                      menuWidth = "175px",
                                      unsetMenuMaxHeight,
                                      inputColor = "rgba(23, 45, 50, 1)",
    isReadOnly,
                                      removeEndAdornment,
                                      alignInputTextToCenter
                                  }: {
    onChange: (event: SyntheticEvent<Element, Event>, value: RadioButtonItemProps | null) => void;
    initialChecked?: RadioButtonItemProps | undefined;
    options: RadioButtonItemProps[];
    label: string;
    maxWidth?: string;
    menuWidth?: string;
    unsetMenuMaxHeight?: boolean;
    inputColor?: string;
    isReadOnly?: boolean;
    removeEndAdornment?: boolean;
    alignInputTextToCenter?: boolean;
}) {

    return (
        <DropdownV2
            onChange={onChange}
            options={options}
            initialChecked={initialChecked}
            maxWidth={maxWidth}
            menuWidth={menuWidth}
            unsetMenuMaxHeight={unsetMenuMaxHeight}
            inputColor={inputColor}
            errored={false}
            isReadOnly={!!isReadOnly}
            disableClearable={true}
            makeWidthDynamic={true}
            removeEndAdornment={removeEndAdornment}
            alignInputTextToCenter={alignInputTextToCenter}
            label={label ?? ""}
            height={'28px'}
            inputBorderRadius={"8px"}
            borderColor={"rgba(226, 232, 240, 1)"}
            borderColorHover={"rgba(203, 213, 225, 1)"}
            bgColor={'rgba(255, 255, 255, 1)'}
            bgColorHover={"rgba(248, 250, 252, 1)"}
            backgroundColorFocus={"rgba(248, 250, 252, 1)"}
            placeholderColor={"rgba(23, 45, 50, 1)"}
        />
    );
}
