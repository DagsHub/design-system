import React, {FunctionComponent} from 'react';
import '../../../styles/root.css';
import './search-results.css';

export interface SearchResultListProps{
    rows: Row[];
}

export interface Row{
    rowElements: FunctionComponent<any>[];
    elementsData: any[];
}

export default function SearchResultList(props:SearchResultListProps) {

    return (
        <div className="search-result-list">
            {props.rows?.map((row: Row) =>
                <div className="row">
                    {row.rowElements?.map((rowElement, elementIndex) =>
                        React.createElement(rowElement, row.elementsData[elementIndex])
                    )}
                </div>
            )}
        </div>
    )
}

//connect images
//add headers
//add styles
