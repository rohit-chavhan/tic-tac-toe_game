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

  const checkWinner = (playersToken) => {
    let threeInARow = [];
    let result;
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

    (function (array) {
      let getWinner = array.filter((row) =>
        row.every((cell) => cell === playersToken),
      );
      console.log(getWinner, array);
      result = getWinner.length ? 'won' : 'not won';
      console.log(result);
    })(threeInARow);

    return result;
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

function checkers() {
  let movesMade = 0;
  let gameStatus = 'not won';

  const incrementMoveCount = () => {
    movesMade += 1;
  };

  const getMoveCount = () => movesMade;

  const getGameStatus = () => gameStatus;

  const setGameStatusToWon = () => {
    gameStatus = 'won';
  };

  return {
    incrementMoveCount,
    getMoveCount,
    getGameStatus,
    setGameStatusToWon,
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
    console.log(
      `${getActivePlayer().name}'s turn with ${getActivePlayer().token}`,
    );
  };

  const moveCounter = checkers();

  const playRound = (row, column) => {
    if (moveCounter.getGameStatus() === 'won') {
      return 'game over';
    }
    moveCounter.incrementMoveCount();
    const gameCount = moveCounter.getMoveCount();
    console.log(gameCount);

    if (gameCount <= 8 && moveCounter.getGameStatus() !== 'won') {
      board.makeMove(row, column, getActivePlayer().token);
      if (gameCount >= 5) {
        let gameResult = board.checkWinner(getActivePlayer().token);
        if (gameResult === 'won') {
          moveCounter.setGameStatusToWon();
        } else {
          switchPlayerTurn();
          printNewRound();
        }
      } else {
        switchPlayerTurn();
        printNewRound();
      }
    } else {
      return 'game over';
    }
  };

  printNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

let play = gamePlay();
