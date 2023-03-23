import React, { MouseEventHandler } from 'react';

import '../../../../styles/root.scss';
import './table.scss';

export interface TableProps {
  classnames?: string;
  header?: Row;
  rows: Row[];
  footer?: Row;
  rowHeight?: number;
  tableWidth?: number;
}

export interface Row {
  rowClasses?: string;
  columns: JSX.Element[];
  style?: {};
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function GenericTable(props: TableProps) {
  const generateClassName = (footer: Boolean, rowIndex: number, rowsLength: number, row: Row) => {
    let classname = '';
    classname += !footer && rowIndex === rowsLength - 1 ? 'table__row--footer ' : '';
    classname += row.rowClasses ? row.rowClasses : 'table__row';
    return classname;
  };

  return (
    <div
      className={props.classnames ? props.classnames : 'table'}
      style={{ maxWidth: props.tableWidth }}
    >
      {props.header && (
        <div className="table__header">{props.header?.columns?.map((column) => column)}</div>
      )}
      {props.rows?.map((row: Row, rowIndex) => (
        <div
          onClick={row.onClick}
          style={{ ...row.style, height: props.rowHeight }}
          className={generateClassName(!!props.footer, rowIndex, props.rows.length, row)}
        >
          {row.columns?.map((column) => column)}
        </div>
      ))}
      {props.footer && (
        <div className="table__footer table__row--footer">
          {props.footer?.columns?.map((column) => (
            column
          ))}
        </div>
      )}
    </div>
  );
}
