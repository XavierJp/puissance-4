// factory that expose a function matrix (0, 1, 2) 1 and 2 is player. 0 is empty

const gameFactory = (width, height, player1Name, player2Name) => {
    const game = [];

    const state = {
        currentPlayer : 1,
        winnerPlayer : 0,
        players: [
            {
                name:player1Name,
                score: 0,
            },
            {
                name : player2Name,
                score : 0,
            }
        ]
    }

    const self = {
        res : game,
        reset : () => {
            while(game.length > 0) {
                game.pop();
            };
            for (let i=0; i<height; i++) {
                const row = []
                for (let i=0; i<height; i++) {
                    row.push(0);
                }
                game.push(row);
            }
            state.currentPlayer = 1;
            state.winnerPlayer  = 0;
        },
        getWinner : ()=>state.winnerPlayer,
        play : (column) => {
            let lastOccupiedRow = height;
            for (let row = height-1; row >= 0; row--) {
                const cellValue =game[row][column];
                if (cellValue === 0)
                    continue;
                else
                    lastOccupiedRow = row;

                // ideally interface should have a feedback - no time yet
                if (lastOccupiedRow===height)
                    return; // do nothing as we are already on top
            }
            game[lastOccupiedRow-1][column] = state.currentPlayer;
            state.currentPlayer = state.currentPlayer === 1 ? 2 : 1;

            const victoryCells = checkVictory(game, width, height);

            if (victoryCells.length>0) {
                state.winnerPlayer = game[victoryCells[0][0]][victoryCells[0][1]];
                for (let i = 0; i<victoryCells.length; i++) {
                    game[victoryCells[i][0]][victoryCells[i][1]] = 1000;
                }
                state.players[state.winnerPlayer-1].score +=1;
            }
        },
        getPlayer : (playerId) => {
            const player = state.players[playerId-1];
            return Object.assign({}, player, {isPlaying : state.currentPlayer === playerId})
        }
    }

    self.reset();
    return self;
};


// CHECK FOR VICTORY =====
// parse every case and check for eventual victory
const checkVictory = (game, width, height) => {
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        for (let columnIndex = 0; columnIndex < width; columnIndex++) {
            const victoryCells = checkCellVictory(game, rowIndex, columnIndex, width, height);
            if (victoryCells.length > 0)
            {
                return victoryCells;
            }
        }
    }
    return [];
}

// Victory case checker - naive but easy to debug
const checkCellVictory = (game, rowIdx, columnIdx, width, height) => {
    const check = checker(game);

    if (rowIdx - 3 >= 0) {
        // vers le haut
        let toTest = [[rowIdx, columnIdx], [rowIdx-1, columnIdx],[rowIdx-2, columnIdx],[rowIdx-3, columnIdx]];
        if (check(toTest))
            return toTest;
    }

    if(rowIdx - 3 >= 0 && columnIdx + 3 <= width-1) {
        //diag haute droite
        let toTest = [[rowIdx, columnIdx], [rowIdx-1, columnIdx+1],[rowIdx-2, columnIdx+2],[rowIdx-3, columnIdx+3]];
        if (check(toTest))
            return toTest;
    }

    if(columnIdx + 3 <= width-1) {
        // droite toute
        let toTest = [[rowIdx, columnIdx], [rowIdx, columnIdx+1],[rowIdx, columnIdx+2],[rowIdx, columnIdx+3]];
        if (check(toTest))
            return toTest;
    }

    if(columnIdx + 3 <= width-1 && rowIdx + 3 <= height-1) {
        // diag droite bas
        let toTest = [[rowIdx, columnIdx], [rowIdx+1, columnIdx+1],[rowIdx+2, columnIdx+2],[rowIdx+3, columnIdx+3]];
        if (check(toTest))
            return toTest;
    }

    if(rowIdx + 3 <= height-1) {
        // bas toute
        let toTest = [[rowIdx, columnIdx], [rowIdx+1, columnIdx],[rowIdx+2, columnIdx],[rowIdx+3, columnIdx]];
        if (check(toTest))
            return toTest;
    }

    if(columnIdx - 3 >= 0  && rowIdx + 3 <= height-1) {
        // diag gauche bas
        let toTest = [[rowIdx, columnIdx], [rowIdx+1, columnIdx-1],[rowIdx+2, columnIdx-2],[rowIdx+3, columnIdx-3]];
        if (check(toTest))
            return toTest;
    }

    if(columnIdx - 3 >= 0) {
        // gauche toute
        let toTest = [[rowIdx, columnIdx], [rowIdx, columnIdx-1],[rowIdx, columnIdx-2],[rowIdx, columnIdx-3]];
        if (check(toTest))
            return toTest;
    }

    if(columnIdx - 3 >= 0 && rowIdx - 3 >= 0) {
        // diag gauche haute
        let toTest = [[rowIdx, columnIdx], [rowIdx-1, columnIdx-1],[rowIdx-2, columnIdx-2],[rowIdx-3, columnIdx-3]];
        if (check(toTest))
            return toTest;
    }
    return [];
}

const checker = (game) => {
    return (toTest)=>{
        if (toTest.length===0)
            return false;

        const initial = game[toTest[0][0]][toTest[0][1]];
        if (initial===0)
            return false;

        for(var i = 1; i < toTest.length; ++ i)
        {
            if (game[toTest[i][0]][toTest[i][1]] !== initial)
                return false;
        }
        return true;
    }
}

export default gameFactory;
