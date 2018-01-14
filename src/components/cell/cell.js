import React from 'react';
import './cell.css';

const Cell = (props) => {
    return (
        <div className="cell">
            <div className={"round color-"+props.cellValue} onClick={props.handleClick}></div>
        </div>
        )
}

export default Cell;
