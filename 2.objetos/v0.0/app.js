const { Console } = require("../console");

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
  console.writeln("Gano");
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
  let coordinates = [];
  do {
    console.writeln(`Turno de las ${getToken(game)}`);
    coordinates[0] = console.readNumber("Fila: ");
    coordinates[1] = console.readNumber("Columna: ");
  } while (!placeIsFree(game, coordinates));
  console.writeln("turno siguiente");
  return game;
}

function isTicTacToe(game) {
  return false;
}

function isResume() {
  let resume = console.readString("Desea continuar?(S/N)");
  return resume === "S" ? true : false;
}

function getToken(game) {
  return game.turn === 0 ? game.TOKEN_X : game.TOKEN_Y;
}

function nextTurn(game) {
  game.turn = (game.turn + 1) % game.MAX_PLAYERS;
}

function placeIsFree(game, coordinates) {
  return game.tokens[coordinates[0]][coordinates[1]] === game.TOKEN_EMPTY
    ? true
    : false;
}
