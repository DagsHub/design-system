import React, {useState} from 'react';
import {AgGridReact} from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

export function CSVViewer ({headers, values}:{headers: string[], values: string[][]}){
    // Convert the data into the format expected by AgGridReact
    const rowData = values.map((rowValues) => {
        const rowDataObj: Record<string, string> = {};
        headers.forEach((header, index) => {
            rowDataObj[header] = rowValues[index];
        });
        return rowDataObj;
    });

    // Define column definitions based on headers
    const columnDefs = [    {
        headerName: '#', // Row number column header
        suppressMenu: true, // Hide the menu for the row number column
        valueGetter: 'node.rowIndex + 1',
        width: 50, // Set a fixed width for the row number column
        sortable: false,
    }, ...headers.map((header) => ({
        headerName: header,
        field: header,
        filter: 'agTextColumnFilter',
        width: 150,
        floatingFilter: true
    }))];

    return (
        <div
            className={
                "ag-theme-quartz"
            }
            style={{width: '100%', height: '100%'}}
        >
            <AgGridReact rowData={rowData} columnDefs={columnDefs}
            />
        </div>
    )
}
