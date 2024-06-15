function Gameboard() {
    const rows = 3;
    const column = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < column; j++) {
            board[i].push(Cell());
        }
    };

    const getBoard = () => board;

    const builtBoard = () => {
        const boardCelss = board.map(row => row.map(eachCell => eachCell.getValue()))
        console.log(boardCelss);
    }

    const makeMove = (mainArray, insieElement, move) => {
        board[mainArray][insieElement].addMove(move);
    }

    return {
        getBoard,
        builtBoard,
        makeMove
    }
}


function Cell() {
    let value = "*";

    const addMove = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addMove,
        getValue
    }
}

function gamePlay(
    playeOneName = "rohit",
    playeTwoName = "karan"
) {

    const board = Gameboard();

    const player = [
        {
            name: playeOneName,
            token: "x"
        },
        {
            name: playeTwoName,
            token: "o"
        }
    ]

    let activePlayer = player[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === player[0] ? player[1] : player[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.builtBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }

    let count = 0;
    const countMoves = () => {
        return () => ++count;
    }

    const playRound = (x,y) => {
        console.log(
            `${getActivePlayer().name} making a move with token ${getActivePlayer().token} in main Arr ${x} ${y} ...`
        );

        board.makeMove(x,y, getActivePlayer().token);
        
        switchPlayerTurn();

        /*
        here to add iffe function which will create evry possible row
        with then it will check wheter each element in row is same as user typed token and if that it will print winer or looser
        */

        /* prin new round will print the arrays in number which is * x y */
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const red = gamePlay();
red.playRound(0,1);
red.playRound(0,1);
red.playRound(0,1);
red.playRound(0,1);
red.playRound(0,1);
red.playRound(0,1);
red.playRound(0,1);
// let red = Cell();
// console.log(red);
// red.addToken("red");const 
// console.log(red.getValue());