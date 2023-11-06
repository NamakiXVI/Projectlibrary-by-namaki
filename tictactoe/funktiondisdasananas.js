let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  let currentPlayer = 'X';
  let isGameOver = false;

  function checkWinner(player) {

    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      ) {
        return true;
      }
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      ) {
        return true;
      }
    }

    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    ) {
      return true;
    }

    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    ) {
      return true;
    }

    return false;
  }

  function checkDraw() {

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === '') {
          return false;
        }
      }
    }
    return true;
  }

  function botMove() {
    if (!isGameOver) {
      setTimeout(() => {
        let availableMoves = [];

        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            if (board[row][col] === '') {
              availableMoves.push({ row, col });
            }
          }
        }

        if (availableMoves.length > 0) {
          let bestMove;
          let bestScore = -Infinity;

          for (let i = 0; i < availableMoves.length; i++) {
            let { row, col } = availableMoves[i];
            board[row][col] = currentPlayer;

            let score;
            if (checkWinner(currentPlayer)) {
              score = currentPlayer === 'X' ? -1 : 1;
            } else {
              score = minimax(board, 0, false);
            }

            board[row][col] = '';

            if (score > bestScore) {
              bestScore = score;
              bestMove = { row, col };
            }
          }

          let { row, col } = bestMove;
          board[row][col] = currentPlayer;
          document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;

          if (checkWinner(currentPlayer)) {
            document.getElementById('message').innerText = currentPlayer + ' wins!';
            isGameOver = true;
          } else if (checkDraw()) {
            document.getElementById('message').innerText = 'It\'s a draw!';
            isGameOver = true;
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          }
        }
      }, 500);
    }
  }

  function minimax(board, depth, isMaximizing) {
    let scores = {
      X: -1,
      O: 1,
      draw: 0
    };

    if (checkWinner('X')) {
      return scores.X;
    }

    if (checkWinner('O')) {
      return scores.O;
    }

    if (checkDraw()) {
      return scores.draw;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === '') {
            board[row][col] = 'O';
            let score = minimax(board, depth + 1, false);
            board[row][col] = '';
            bestScore = Math.max(bestScore, score);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === '') {
            board[row][col] = 'X';
            let score = minimax(board, depth + 1, true);
            board[row][col] = '';
            bestScore = Math.min(bestScore, score);
          }
        }
      }
      return bestScore;
    }
  }

  function handleClick(row, col) {
    if (board[row][col] === '' && !isGameOver) {
      board[row][col] = currentPlayer;
      document.getElementById('board').children[row * 3 + col].innerText = currentPlayer;

      if (checkWinner(currentPlayer)) {
        document.getElementById('message').innerText = currentPlayer + ' wins!';
        isGameOver = true;
      } else if (checkDraw()) {
        document.getElementById('message').innerText = 'It\'s a draw!';
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        botMove();
      }
    }
  }

  function restartGame() {
    board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    currentPlayer = 'X';
    isGameOver = false;
    document.getElementById('message').innerText = '';
    let cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
    }
  }