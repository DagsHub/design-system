import React , {useMemo} from 'react';
import { useTable, useColumnOrder, useBlockLayout, useRowSelect} from 'react-table';
import { FixedSizeList } from 'react-window';


import './table.css';
import {Checkbox} from "../../../forms";

export interface BasicTableProps {
  tcolumns: { Header: string; accessor: string; }[];
  tdata:any[];
  enableColumnOrdering?:boolean;
  enableColumnHiding?:boolean;
  enableRowSelection?:boolean;
  enableVirtualization?:boolean;
  virtualizationTableHeight:number;
  rowHeight:number;
  rowWidth:number;
}

export function BasicTable({
    tcolumns,
    tdata,
    enableColumnOrdering=false,
    enableColumnHiding=false,
    enableRowSelection=false,
    enableVirtualization=false,
    virtualizationTableHeight,
    rowHeight,
    rowWidth,
}: BasicTableProps) {

  const columns = useMemo<any>(()=> tcolumns, [])
  const data = useMemo<any>(()=> tdata, [])
  const defaultColumn = React.useMemo(
      () => ({
          width: rowWidth,
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
    totalColumnsWidth
  } = useTable({
        columns,
        data,
        defaultColumn
      },
      useColumnOrder,
      useBlockLayout,
      useRowSelect,
      (hooks)=>{
        hooks.visibleColumns.push((columns)=>{
          if(enableRowSelection){
            return [
              {
                id: 'selection',
                Header: ({getToggleAllRowsSelectedProps})=>(
                    <Checkbox {...getToggleAllRowsSelectedProps()}/>
                ),
                Cell: ({row})=>(
                    <Checkbox {...row.getToggleRowSelectedProps()}/>
                ),
                maxWidth:52
              },
              ...columns
            ]
          }
          return [...columns]
        })
      }
  )

  const changeOrder= (sIndex:number, dIndex:number) => {
    const colOrder = visibleColumns.map(o => o.id)
    const id=colOrder[sIndex];
    colOrder.splice(sIndex, 1);//remove from index
    colOrder.splice(dIndex, 0, id);//add to index
    setColumnOrder(colOrder);
  }

  const moveRight= (colId:string) => {
    const colOrder = visibleColumns.map(o => o.id)
    const index=colOrder.indexOf(colId)
    changeOrder(index, index+1)
  }

  const moveLeft= (colId:string) => {
    const colOrder = visibleColumns.map(o => o.id)
    const index=colOrder.indexOf(colId)
    changeOrder(index, index-1)
  }

  const moveLeftShouldBeDisabled=(colId:string)=>{
    const colOrder = visibleColumns.map(o => o.id)
    const index=colOrder.indexOf(colId)
    return enableRowSelection?index===1:index===0
  }

  const moveRightShouldBeDisabled=(colId:string)=>{
    const colOrder = visibleColumns.map(o => o.id)
    const index=colOrder.indexOf(colId)
    return index===colOrder.length-1
  }

  const RenderRow = React.useCallback(
      ({ index, style}) => {
        const row = rows[index];
        prepareRow(row);
        return (
            <tr
                {...row.getRowProps({style})}
            >
              {row.cells.map((cell) => {
                return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                );
              })}
            </tr>
        );
      },
      [prepareRow, rows.map(row => row.isSelected)]
  );


  return (
      <>
        {enableColumnHiding&&
          <div>
            <div>
              <Checkbox {...getToggleHideAllColumnsProps()} label={"Toggle All"}/>
            </div>
            {allColumns.map(column => (
                <div key={column.id}>
                  <label>
                    <Checkbox {...column.getToggleHiddenProps()} label={column.id}/>
                  </label>
                </div>
            ))}
          </div>}
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map((headerGroup)=>(
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column)=>(
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {enableColumnOrdering&&column.id!="selection"&&<><button disabled={moveLeftShouldBeDisabled(column.id)} onClick={()=>moveLeft(column.id)}>moveLeft</button>
                    <button disabled={moveRightShouldBeDisabled(column.id)} onClick={()=>moveRight(column.id)}>moveRight</button></>}
                  </th>
              ))}
            </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {!enableVirtualization?rows.map((row)=>(
              RenderRow({...row, style:{"height":rowHeight} })
          )):
          <FixedSizeList
              height={rowHeight*rows.length < virtualizationTableHeight? rowHeight*rows.length:virtualizationTableHeight}
              itemCount={rows.length}
              itemSize={rowHeight}
              width={totalColumnsWidth}
          >
              {RenderRow}
          </FixedSizeList>}
        </tbody>
      </table>
      </>
  );
}


//how can i give each column its own width
