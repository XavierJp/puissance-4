import React from 'react';
import './row.css';
import Cell from '../cell/cell.js'


const Row = (props) => {
    return (
        <div className="row">
            {
                props.rowValues.map((value,columnIndex)=> {
                    return(<Cell key={columnIndex} cellValue={value} handleClick={()=>props.handleClick(columnIndex)}/>);
                })
            }
        </div>
        )
}

export default Row;
