import React from "react";
import '../../styles/generic-table.scss'
import '../../styles/root.scss'
/** Helpers */

// helper to get an array containing the object values with
// the correct type infered.
function objectValues<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
}

function objectKeys<T extends {}>(obj: T) {
    return Object.keys(obj).map((objKey) => objKey as keyof T);
}

type PrimitiveType = string | Symbol | number | boolean;

// Type guard for the primitive types which will support printing
// out of the box
function isPrimitive(value: any): value is PrimitiveType {
    return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        typeof value === "symbol"
    );
}

/** Component */

interface MinTableItem {
    id: PrimitiveType;
    [others: string]: any;
}

type TableHeaders<T extends MinTableItem> = Record<keyof T, string>;

type CustomRenderers<T extends MinTableItem> = Partial<
    Record<keyof T, (it: T) => React.ReactNode>
>;

interface TableProps<T extends MinTableItem> {
    items: T[];
    headers: TableHeaders<T>;
    customRenderers?: CustomRenderers<T>;
}

export default function Table<T extends MinTableItem>(props: TableProps<T>) {
    function renderRow(item: T) {
        return (
        <tr>
            {objectKeys(item).map((itemProperty) => {
            const customRenderer = props.customRenderers?.[itemProperty];

            if (customRenderer) {
                return <td>{customRenderer(item)}</td>;
            }

            return (
                <td>{isPrimitive(item[itemProperty]) ? item[itemProperty] : ""}</td>
            );
            })}
        </tr>
        );
    }

return (
<table>
    <thead>
    {objectValues(props.headers).map((headerValue) => (
        <th>{headerValue}</th>
    ))}
    </thead>
    <tbody>{props.items.map(renderRow)}</tbody>
</table>
);
}
