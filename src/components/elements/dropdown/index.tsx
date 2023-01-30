import React from "react";
import classNames from "classnames";
import {Icon} from "../../icons";
import "./dropdown.scss";

export interface DropdownProps {
    width:number;
    label:string;
}

export const Dropdown = ({
   width,
   label,
   ...props
}: DropdownProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const classes = classNames([`dagshub-dropdown`]);
    return (
        <span className={classes} style={{width:width}}>
            {label}
            <Icon width={10} height={6} fill="#172D32" icon="solid-cheveron-down"/>
        </span>
    );
};
