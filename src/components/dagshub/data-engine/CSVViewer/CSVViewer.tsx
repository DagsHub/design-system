import React, { useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { SizeColumnsToFitGridStrategy } from 'ag-grid-community/dist/lib/interfaces/autoSizeStrategy';

export function CSVViewer({ headers, values }: { headers: string[]; values: string[][] }) {
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
      floatingFilter: true,
      headerTooltip: header
    }))
  ];

  const autoSizeStrategy: SizeColumnsToFitGridStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100
  };

  return (
    <div
      className={'ag-theme-quartz'}
      style={{
        width: '100%',
        height: '100%',
        fontFamily: 'Inter!important'
      }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        autoSizeStrategy={autoSizeStrategy}
        tooltipShowDelay={400}
      ></AgGridReact>
    </div>
  );
}
