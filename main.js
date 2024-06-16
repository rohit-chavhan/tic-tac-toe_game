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
        return boardCelss;
    }

    const makeMove = (mainArray, insieElement, move) => {
        board[mainArray][insieElement].addMove(move);
    }

    const checkWinner = () => {
        let mainArr = [];
        let threeRow = board.map(row => row.map(eachCell => eachCell.getValue()));

        let columnArr = threeRow[0].map((_, colIndex) => threeRow.map(row => row[colIndex]));

        let diagonalOne = threeRow[0].map((_, index) => threeRow[index][index]);
        mainArr.push(diagonalOne);

        let ray = [threeRow, columnArr];

        const mainArray = ray.forEach(el => el.forEach(eachEl => mainArr.push(eachEl)));

        ;(function(){
            let mainRay = [];
            for(let j = 0;j < threeRow.length; j++ ){
                let oneIndex = threeRow.length - 1;
                mainRay.push(threeRow[oneIndex][j]);
            };
            mainArr.push(mainRay);
        })();

        return mainArr;
    }

    return {
        getBoard,
        builtBoard,
        makeMove,
        checkWinner
    }
}


function Cell() {
    let value = "_";

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

    const playRound = (x,y) => {
        if(count === 'over') {
            return;
        }

        console.log(
            `${getActivePlayer().name} making a move with token ${getActivePlayer().token} in main Arr ${x} ${y} ...`
        );

        board.makeMove(x,y, getActivePlayer().token);

        count += 1; 
        if(count > 4) {
            ;(function (){
               let allMatchPatterns =  board.checkWinner();
               console.log(allMatchPatterns, getActivePlayer().token)

               let a = allMatchPatterns.filter(el => el.every(eachEl => eachEl === getActivePlayer().token));
               console.log(a);
               count = "over";

                if(a.length) {
                    console.log(`${getActivePlayer().name} is a winner, game over`);
                    return;
                }
            })();
        }

        if(count === 'over') {
            return
        }
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return {
        playRound,
        getActivePlayer
    };
}

const red = gamePlay();
red.playRound(0,0);
red.playRound(1,0);
red.playRound(0,1);
red.playRound(1,1);
red.playRound(0,2);
red.playRound(0,2);

