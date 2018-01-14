import React, { Component } from 'react';
import './App.css';
import gameFactory from './gameCore';

import Row from './components/row/row.js';
import Player from './components/player/player.js';
import InitGame from './components/initGame/initGame.js';

class App extends Component {
    constructor() {
        super();

        this.game = gameFactory(10,10,'player1', 'player2');

        this.state = {
            board : [],
            player1:undefined,
            player2:undefined,
            winner:0,
        };

        this.playMove = this.playMove.bind(this);
        this.init = this.init.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    init(player1, player2) {
        if (player1 === '')
            player1 = 'Player 1';
        if (player2 === '')
            player2 = 'Player 2';

        this.game = gameFactory(10,10,player1, player2);
        this.updateState();
    }

    updateState() {
        this.setState({
            board : this.game.res,
            player1 : this.game.getPlayer(1),
            player2 : this.game.getPlayer(2),
            winner:this.game.getWinner(),
        });
    }

    playMove(column) {
        this.game.play(column);
        this.updateState();
    }

    resetGame() {
        this.game.reset();
        this.updateState();
    }

    render() {
        return (
            <div className="App">
                { this.state.winner > 0 &&
                    <div id="victory" onClick={this.resetGame}>
                        {this.game.getPlayer(this.state.winner).name} won ! click to rematch !
                    </div>
                }
                { this.state.board.length === 0 &&
                    <InitGame initGame={this.init}/>
                }
                { this.state.board.length > 0 &&
                    <GameBoard
                        board={this.state.board}
                        player1={this.state.player1}
                        player2={this.state.player2}
                        playMove={this.playMove}/>
                }
            </div>
            );
    }
}

const GameBoard = (props) => {
    return (
        <div id="game-board">
            <Player
                playerName={props.player1.name}
                score={props.player1.score}
                isPlaying={props.player1.isPlaying}/>
            <div>
                {
                    props.board.map((row,rowIndex)=> {
                        return(<Row key={rowIndex} rowValues={row} handleClick={props.playMove}/>);
                    })
                }
            </div>
            <Player
                playerName={props.player2.name}
                score={props.player2.score}
                isPlaying={props.player2.isPlaying}/>
        </div>
        )
}

export default App;
