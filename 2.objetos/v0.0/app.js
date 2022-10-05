const { Console } = require("../../console");

const console = new Console();

playTateti();

function playTateti() {
  do {
    playGame();
  } while (isResume());
}

function playGame() {
  let game = initGame();
  let winner;

  do {
    showBoard(game);
    placeToken(game);
    winner = isTicTacToe(game);
    if (!winner) nextTurn(game);
  } while (!winner);

  console.writeln(`Gano el token ${getToken(game)}`);
  isResume();
}

function initGame() {
  let game = {
    turn: 0,
    MAX_PLAYERS: 2,
    MAX_TOKENS: 3,
    TOKEN_X: "X",
    TOKEN_Y: "Y",
    TOKEN_EMPTY: " ",
    tokens: [],
  };

  for (i = 0; i < game.MAX_TOKENS; i++) {
    game.tokens[i] = [];
    for (j = 0; j < game.MAX_TOKENS; j++) {
      game.tokens[i][j] = game.TOKEN_EMPTY;
    }
  }
  return game;
}

function showBoard(game) {
  const SEPARATE_LINE = "-------------\n";
  let msg = "";

  console.writeln("\n  TicTacToe");
  msg += SEPARATE_LINE;

  for (i = 0; i <= game.MAX_PLAYERS; i++) {
    msg += "|";
    for (j = 0; j <= game.MAX_PLAYERS; j++) {
      msg += ` ${game.tokens[i][j]} |`;
    }
    msg += `\n${SEPARATE_LINE}`;
  }

  console.writeln(msg);
}

function placeToken(game) {
  console.writeln(`Turno de las ${getToken(game)}`);

  let origin;
  let error;
  const movement = isMovement(game);
  if (movement) {
    do {
      origin = readCoodinate("origen", game.MAX_TOKENS);
      error = isEmpty(game, origin, getToken(game));
    } while (error);
  }

  do {
    target = readCoodinate("destino", game.MAX_TOKENS);
    error = !isEmpty(game, target, getToken(game));
  } while (error);

  if (movement) {
    putEmptyToken(game, origin);
  }

  putToken(game, target, getToken(game));
}

function readCoodinate(title, max) {
  return {
    row: read(`Fila ${title}`, max),
    column: read(`columna ${title}`, max),
  };
}

function read(title, max) {
  do {
    position = console.readNumber(`\n${title}: `);
    error = position < 1 || position > max;
    if (error) {
      console.writeln(`Solo numeros entre 1 y ${max}`);
    }
  } while (error);
  return position - 1;
}

function isMovement(game) {
  let empties = 0;

  for (i = 0; i < game.MAX_TOKENS; i++) {
    for (j = 0; j < game.MAX_TOKENS; j++) {
      if (game.tokens[i][j] === game.TOKEN_EMPTY) {
        empties++;
      }
    }
  }
  return empties < game.MAX_TOKENS ? true : false;
}

function isTicTacToe(game) {
  return game.tokens[0][0] + game.tokens[1][1] + game.tokens[2][2] === "XXX"
    ? true
    : false;
}

function getToken(game) {
  return game.turn === 0 ? game.TOKEN_X : game.TOKEN_Y;
}

function nextTurn(game) {
  game.turn = (game.turn + 1) % game.MAX_PLAYERS;
}

function putToken(game, { row, column }, token) {
  game.tokens[row][column] = token;
}

function isEmpty(game, { row, column }) {
  return (game.tokens[row][column] = game.TOKEN_EMPTY);
}

function moveToken() {
  console.write("mover");
}

function isResume() {
  let resume = console.readString("Desea continuar?(S/N)");
  return resume == "S" ? true : false;
}
