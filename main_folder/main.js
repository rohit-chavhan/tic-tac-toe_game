function Gameboard() {
  const rows = 3;
  const column = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < column; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const builtBoard = () => {
    const boardCelss = board.map((row) =>
      row.map((eachCell) => eachCell.getValue()),
    );
    console.log(boardCelss);
  };

  const makeMove = (rowIndex, columnIndex, playerToken) => {
    board[rowIndex][columnIndex].addMove(playerToken);
  };

  const checkWinner = () => {
    let threeInARow = [];
    let allRows = board.map((row) =>
      row.map((eachCell) => eachCell.getValue()),
    );

    let allCoulumns = allRows[0].map((_, colIndex) =>
      allRows.map((row) => row[colIndex]),
    );

    let diagonalRowOne = allRows[0].map(
      (_, colIndex) => allRows[colIndex][colIndex],
    );

    let rowReverse = allRows.reverse();
    let diagonalRowTwo = allRows[0].map(
      (_, colIndex) => rowReverse[colIndex][colIndex],
    );

    // pushing row and column arrays
    (function (...arrays) {
      arrays.forEach((el) => el.forEach((eachEl) => threeInARow.push(eachEl)));
    })(allCoulumns, allRows);

    // pushing diagonal arrays
    (function (...arrays) {
      arrays.forEach((el) => threeInARow.push(el));
    })(diagonalRowOne, diagonalRowTwo);

    return threeInARow;
  };

  return {
    getBoard,
    builtBoard,
    makeMove,
    checkWinner,
  };
}

function Cell() {
  let value = '_';

  const addMove = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMove,
    getValue,
  };
}

function gamePlay(playeOneName = 'rohit', playeTwoName = 'karan') {
  const board = Gameboard();

  const player = [
    {
      name: playeOneName,
      token: 'x',
    },
    {
      name: playeTwoName,
      token: 'o',
    },
  ];

  let activePlayer = player[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === player[0] ? player[1] : player[0];
  };

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.builtBoard();
    console.log(`${getActivePlayer().name}'s turn`);
  };

  let totalTurnsPlayed = 0;

  const playRound = (x, y) => {
    if (totalTurnsPlayed === 'won') {
      return;
    }

    board.makeMove(x, y, getActivePlayer().token);

    totalTurnsPlayed += 1;
    if (totalTurnsPlayed > 4) {
      (function () {
        let allRowsInGame = board.checkWinner();
        console.log(allRowsInGame, getActivePlayer().token);

        let getWinner = allRowsInGame.filter((row) =>
          row.every((cell) => cell === getActivePlayer().token),
        );

        if (getWinner.length) {
          totalTurnsPlayed = 'won';
          console.log(`${getActivePlayer().name} is a winner, game over`);
        }
      })();
    }

    if (totalTurnsPlayed === 'won') {
      return;
    }
    switchPlayerTurn();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}
