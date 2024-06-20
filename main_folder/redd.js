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
    console.log('from makeMove func', rowIndex, columnIndex, playerToken);
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
  let value = ' ';

  const addMove = (player) => {
    console.log(player);
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

    if (gameCount <= 9 && moveCounter.getGameStatus() !== 'won') {
      board.makeMove(row, column, getActivePlayer().token);
      if (gameCount >= 5) {
        let gameResult = board.checkWinner(getActivePlayer().token);
        if (gameResult === 'won') {
          moveCounter.setGameStatusToWon();
          return 'won';
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
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = gamePlay();

  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const restartBtn = document.querySelector('.restart');

  const updateScreen = () => {
    boardDiv.textContent = '';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn with ${activePlayer.token}`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const cellButton = document.createElement('button');
        cellButton.classList.add('cell');
        cellButton.dataset.row = `${rowIndex}`;
        cellButton.dataset.column = `${cellIndex}`;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      });
    });
  };

  function clickHandlerBoard(e) {
    const rowCell = Number(e.target.dataset.row);
    const columnCell = Number(e.target.dataset.column);
    let gameOutcomes = game.playRound(rowCell, columnCell);
    updateScreen();
    if (gameOutcomes === 'won') {
      playerTurnDiv.textContent = `${game.getActivePlayer().name} won the game, good job :)`;
      boardDiv.removeEventListener('click', clickHandlerBoard);
    }
  }

  boardDiv.addEventListener('click', clickHandlerBoard);
  restartBtn.addEventListener('click', ScreenController);
  updateScreen();
}
ScreenController();
