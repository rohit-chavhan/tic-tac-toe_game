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
    board.map((row) => row.map((eachCell) => eachCell.getValue()));
  };

  const makeMove = (rowIndex, columnIndex, playerToken) => {
    board[rowIndex][columnIndex].addMove(playerToken);
  };

  const checkWinner = (playersToken) => {
    let allRows = board.map((row) =>
      row.map((eachCell) => eachCell.getValue()),
    );

    let allCoulumns = allRows.map((_, colIndex) =>
      allRows.map((row) => row[colIndex]),
    );

    let diagonalRowOne = allRows.map(
      (_, colIndex) => allRows[colIndex][colIndex],
    );

    let diagonalRowTwo = allRows.map(
      (_, colIndex) => allRows[colIndex][allRows.length - 1 - colIndex],
    );

    let threeInARow = [
      ...allRows,
      ...allCoulumns,
      diagonalRowOne,
      diagonalRowTwo,
    ];

    for (let eachRow of threeInARow) {
      if (eachRow.every((cell) => cell === playersToken)) {
        return 'won';
      }
    }

    return 'not won';
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
  };

  const moveCounter = checkers();

  const playRound = (row, column) => {
    const gameStatus = moveCounter.getGameStatus();

    if (gameStatus === 'won') {
      return;
    }
    moveCounter.incrementMoveCount();
    const gameCount = moveCounter.getMoveCount();

    if (gameCount <= 9 && gameStatus !== 'won') {
      board.makeMove(row, column, getActivePlayer().token);
      if (gameCount >= 5) {
        let gameResult = board.checkWinner(getActivePlayer().token);
        if (gameResult === 'won') {
          moveCounter.setGameStatusToWon();
          return 'won';
        } else if (gameCount === 9 && gameStatus !== 'won') {
          return 'tie';
        }
      }

      switchPlayerTurn();
      printNewRound();
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
    if (e.target.outerText !== '') {
      return;
    } else {
      const rowCell = Number(e.target.dataset.row);
      const columnCell = Number(e.target.dataset.column);
      let gameOutcomes = game.playRound(rowCell, columnCell);
      updateScreen();

      if (gameOutcomes === 'won') {
        handleGameOutcome(
          `${game.getActivePlayer().name} won the game, good job :)`,
        );
      } else if (gameOutcomes === 'tie') {
        handleGameOutcome(`Game got tie * * :)`);
      }
    }
  }

  function handleGameOutcome(message) {
    playerTurnDiv.textContent = message;
    boardDiv.removeEventListener('click', clickHandlerBoard);
  }

  boardDiv.addEventListener('click', clickHandlerBoard);
  restartBtn.addEventListener('click', () => location.reload());
  updateScreen();
}
ScreenController();
