import React, {useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

export function CSVViewer({ headers, values, columnWidth=150 }: { headers: string[]; values: string[][], columnWidth?: number }) {
  // Convert the data into the format expected by AgGridReact
  const rowData = values.map((rowValues) => {
    const rowDataObj: Record<string, string> = {};
    headers.forEach((header, index) => {
      rowDataObj[header] = rowValues[index];
    });
    return rowDataObj;
  });

  // Define column definitions based on headers
  const columnDefs = [
    {
      headerName: '#', // Row number column header
      suppressMenu: true, // Hide the menu for the row number column
      valueGetter: 'node.rowIndex + 1',
      width: 50, // Set a fixed width for the row number column
      sortable: false
    },
    ...headers.map((header) => ({
      headerName: header,
      colId: header,
      field: header,
      filter: 'agTextColumnFilter',
      width: columnWidth,
      floatingFilter: true
    }))
  ];

  return (
    <div
      className={'ag-theme-quartz'}
      style={{ width: `${headers.length*columnWidth}px`, maxWidth:"100%", height: '100%', fontFamily: 'Inter!important' }}
    >
      <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
    </div>
  );
}
