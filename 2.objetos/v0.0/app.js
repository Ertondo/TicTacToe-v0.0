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
  let coordinates;

  const movement = isMovement(game);
  if (movement) {
    do {
      coordinates = readCoodinate("origen");
      if (isEmpty(game)) {
        console.writeln("No hay ficha en este lugar\n");
      }
    } while (isEmpty(game, coordinate));
  }

  do {
    coordinates = readCoodinate("destino");
    console.write(game.turn);
    if (!isEmpty(game)) {
      console.writeln("Elija una celda vacia\n");
    }
  } while (!isEmpty(game, coordinates));

  if (movement) {
    moveToken(game, coordinates);
  } else {
    putToken(game, coordinates);
  }
}

function readCoodinate(title) {
  return {
    row: read("fila", title),
    column: read("columna", title),
  };

  function read(coordinate, title) {
    do {
      num = console.readNumber(`\n${coordinate} ${title}: `);
    } while (!isValidNumber(num));
    return num - 1;
  }
}

function isValidNumber(number) {
  let error;
  if (number < 1 || number > 3) {
    console.write("Nro entre 1 y 3\n");
    return false;
  } else {
    return true;
  }
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

function putToken(game, coordinates) {
  game.tokens[coordinates.row][coordinates.column] = getToken(game);
}

function moveToken() {
  console.write("mover");
}

function isEmpty(game, coordinates) {
  return game.tokens[coordinate.row][coordinate.column] === game.TOKEN_EMPTY
    ? true
    : false;
}

function isResume() {
  let resume = console.readString("Desea continuar?(S/N)");
  return resume == "S" ? true : false;
}
