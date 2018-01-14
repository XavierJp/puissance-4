import React from 'react';
import './player.css';


const Row = (props) => {
    return (
        <div className={"player "+(props.isPlaying ? "active" : "")}>
            <h2>{props.playerName}</h2>
            <h2>Score : {props.score}</h2>
        </div>
        )
}

export default Row;
