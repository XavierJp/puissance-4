import React, { Component } from 'react';
import './initGame.css';

class InitGame extends Component {
    constructor() {
        super();

        this.player1 = '';
        this.player2 = '';
    }

    render() {
        const { initGame } = this.props;
        return (
            <div id="init-game">
                <h3> Start Game </h3>
                <input
                    ref={(input) => this.player1 = input }
                    type="text"
                    placeholder="First Player"/>
                <input
                    ref={(input) => this.player2 = input }
                    type="text"
                    placeholder="Second Player"/>
                <div id="launch-game" onClick={()=>initGame(this.player1.value, this.player1.value)}>Start Game</div>
            </div>
        )
    }
}

export default InitGame;
