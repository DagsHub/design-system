import React, {FunctionComponent} from 'react';
import '../../../styles/root.css';
import '../shared-styles/table.css';

export interface TableProps{
    headers: Row;
    rows: Row[];
}

export interface Row{
    columns: Column[];
    columnsProps: any[];
}

export interface Column{
    columnElements: (FunctionComponent<any>|string)[];
    elementsProps: any[];
    elementsChildren: any[];
}

//make the array 2d
//send styles/classes
//what will i do if im sensing div or p elements
//add generic button for one icon and direction, or two icons
//add all icons to the list

export default function GeneralTable(props:TableProps) {

    return (
        <div className="table">
            <div className="table__header">
                {props.headers?.columns?.map((column) =>
                    <div className="row__column" >
                        {column.columnElements?.map((columnElement, elementIndex) =>
                            React.createElement(columnElement, column.elementsProps[elementIndex], column.elementsChildren[elementIndex])
                        )}
                    </div>
                )}
            </div>

            {props.rows?.map((row: Row) =>
                <div className="table__row">
                    {row.columns?.map((column, columnIndex) =>
                        <div className={row.columnsProps[columnIndex]["className"]+" row__column"}>
                            {column.columnElements?.map((columnElement, elementIndex) =>
                                React.createElement(columnElement, column.elementsProps[elementIndex], column.elementsChildren[elementIndex])
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

//connect images
//add headers
//add styles
