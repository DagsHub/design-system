import React, { useMemo } from 'react';
import {
  useTable,
  useColumnOrder,
  useBlockLayout,
  useRowSelect,
  useResizeColumns,
  ColumnInstance,
  HeaderGroup
} from 'react-table';
import { FixedSizeList } from 'react-window';

import './react-table.scss';
import { Checkbox } from '../../../forms';

export interface BasicTableProps {
  tcolumns: any[];
  data: any[];
  enableColumnOrdering?: boolean;
  enableColumnHiding?: boolean;
  enableRowSelection?: boolean;
  enableVirtualization?: boolean;
  virtualizationTableHeight: number;
  rowHeight: number;
  cellWidth: number;
  onScroll: () => void;
  listInnerRef: any;
}

export function BasicTable({
  tcolumns,
  data,
  enableColumnOrdering = false,
  enableColumnHiding = false,
  enableRowSelection = false,
  enableVirtualization = false,
  virtualizationTableHeight,
  rowHeight,
  cellWidth,
  onScroll,
  listInnerRef
}: BasicTableProps) {
  const columns = useMemo<any>(() => tcolumns, []);
  const defaultColumn = React.useMemo(
    () => ({
      width: cellWidth,
      minWidth: 30,
      maxWidth: 400
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    visibleColumns,
    setColumnOrder,
    getToggleHideAllColumnsProps,
    selectedFlatRows,
    totalColumnsWidth,
    resetResizing,
    state,
    toggleHideColumn
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetSelectedRows: false
    },
    useColumnOrder,
    useResizeColumns,
    useBlockLayout,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => {
        if (enableRowSelection) {
          return [
            {
              id: 'Selection',
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <Checkbox {...getToggleAllRowsSelectedProps()} />
              ),
              Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
              width: 52,
              minWidth: 30,
              maxWidth: 400
            },
            ...columns
          ];
        }
        return [...columns];
      });
    }
  );

  const changeOrder = (sIndex: number, dIndex: number) => {
    const colOrder = visibleColumns.map((o) => o.id);
    const id = colOrder[sIndex];
    colOrder.splice(sIndex, 1); //remove from index
    colOrder.splice(dIndex, 0, id); //add to index
    setColumnOrder(colOrder);
  };

  const moveRight = (colId: string) => {
    const colOrder = visibleColumns.map((o) => o.id);
    const index = colOrder.indexOf(colId);
    changeOrder(index, index + 1);
  };

  const moveLeft = (colId: string) => {
    const colOrder = visibleColumns.map((o) => o.id);
    const index = colOrder.indexOf(colId);
    changeOrder(index, index - 1);
  };

  const moveLeftShouldBeDisabled = (colId: string) => {
    const colOrder = visibleColumns.map((o) => o.id);
    const index = colOrder.indexOf(colId);
    return enableRowSelection ? index === 1 : index === 0;
  };

  const moveRightShouldBeDisabled = (colId: string) => {
    const colOrder = visibleColumns.map((o) => o.id);
    const index = colOrder.indexOf(colId);
    return index === colOrder.length - 1;
  };

  const RenderRow = React.useCallback(
    ({ index, style }: any) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <tr {...row.getRowProps({ style })}>
          {row.cells.map((cell) => {
            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
          })}
        </tr>
      );
    },
    [prepareRow, rows.map((row) => row.isSelected)]
  );

  const initialGroupHeaders: HeaderGroup<object>[] = useMemo<any>(() => headerGroups, []);
  const set: HeaderGroup<object>[] = [];
  {
    initialGroupHeaders.map((headerGroup) => headerGroup.headers.map((column) => set.push(column)));
  }

  const groupedHeaders = set.filter(
    (header) => header.parent === undefined && header.columns != null
  );
  const unGroupedHeaders = [...new Set(allColumns.filter((column) => column.parent === undefined))];

  function changeState(headerGroup: HeaderGroup<object>) {
    headerGroup?.headers.map((header) => toggleHideColumn(header.id));
  }

  function shouldBeChecked(headerGroup: HeaderGroup<object>) {
    let bool: boolean = true;
    headerGroup?.headers.map((header) => {
      if (!header.isVisible) {
        bool = false;
      }
    });
    return bool;
  }

  return (
    <>
      {enableColumnHiding && (
        <div>
          <div>
            <Checkbox {...getToggleHideAllColumnsProps()} label={'Toggle All'} />
          </div>
          {groupedHeaders?.map((headerGroup) => (
            <div key={headerGroup?.id}>
              <label>
                <Checkbox
                  checked={shouldBeChecked(headerGroup)}
                  onChange={() => changeState(headerGroup)}
                  label={JSON.stringify(headerGroup.render('Header')).replaceAll('"', '')}
                />
                {headerGroup?.headers.map((header) => (
                  <div key={header?.id}>
                    <label>
                      <Checkbox
                        {...header?.getToggleHiddenProps()}
                        label={'---' + header.render('Header')}
                      />
                    </label>
                  </div>
                ))}
              </label>
            </div>
          ))}
          {unGroupedHeaders?.map((headerGroup) => (
            <div key={headerGroup?.id}>
              <label>
                <Checkbox {...headerGroup?.getToggleHiddenProps()} label={headerGroup?.id} />
              </label>
            </div>
          ))}
          <br />
        </div>
      )}

      <button onClick={resetResizing}>Reset Resizing</button>
      <br />
      <br />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className={'header'} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render('Header')}
                  <div
                    {...column.getResizerProps()}
                    className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                  />
                  {enableColumnOrdering &&
                    column.id != 'Selection' &&
                    column.headers === undefined && (
                      <div className={'move-columns'}>
                        <button
                          disabled={moveLeftShouldBeDisabled(column.id)}
                          onClick={() => moveLeft(column.id)}
                        >
                          moveLeft
                        </button>
                        <button
                          disabled={moveRightShouldBeDisabled(column.id)}
                          onClick={() => moveRight(column.id)}
                        >
                          moveRight
                        </button>
                      </div>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          onScroll={onScroll}
          ref={listInnerRef}
          style={{
            height: virtualizationTableHeight,
            width: `auto`,
            maxWidth: `${totalColumnsWidth}px`
          }}
          {...getTableBodyProps()}
        >
          {!enableVirtualization ? (
            rows.map((row) => RenderRow({ ...row, style: { height: rowHeight, width: 'auto' } }))
          ) : (
            <FixedSizeList
              height={
                rowHeight * rows.length < virtualizationTableHeight
                  ? rowHeight * rows.length
                  : virtualizationTableHeight
              }
              itemCount={rows.length}
              itemSize={rowHeight}
              width={totalColumnsWidth} //need to add scroller width like in the example
              style={{overflow:"none"}}            >
              {RenderRow}
            </FixedSizeList>
          )}
        </tbody>
      </table>
    </>
  );
}

//how can I give each column its own width
