const { Console } = require("../console");

const console = new Console();

const TOKEN_X = "X";
const TOKEN_O = "O";

TicTacToe();

function TicTacToe() {
  console.writeln("Aqui comienza el juego");
  let cell = 0;
  let colorToken = "";

  let gameBoard = Board();
  let gamePlayer = Player();
  //let gameTurn = Turn();
  let gameAction = Action();

  gameBoard.initNewBoard();
  //colorToken = gameTurn.getFirstTurn();
  console.writeln(`Turno de ${colorToken}`);

  do {
    do {
      cell = console.readNumber(`Ingrese nro de celda para ${colorToken}: `);
    } while (gameBoard.cellItsFree(cell));

    gameBoard.saveActionInBoard(colorToken, cell);

    if (colorToken == TOKEN_X) {
      colorToken = TOKEN_O;
    } else {
      colorToken = TOKEN_X;
    }

    gameBoard.getActualBoard();
  } while (gameBoard.isTicTacToe());
}

function Board() {
  let boardSquare = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return {
    initNewBoard: () => {
      console.writeln("pone a cero el tablero");
    },
    getActualBoard: () => {
      console.writeln(
        `|${boardSquare[0]}|${boardSquare[1]}|${boardSquare[2]}|`
      );
      console.writeln(
        `|${boardSquare[3]}|${boardSquare[4]}|${boardSquare[5]}|`
      );
      console.writeln(
        `|${boardSquare[6]}|${boardSquare[7]}|${boardSquare[8]}|`
      );
    },
    cellItsFree: (cell) => {
      return boardSquare[cell - 1] == cell ? false : true;
    },
    saveActionInBoard: (colorToken, cell) => {
      boardSquare[cell - 1] = colorToken;
    },
    isTicTacToe: () => {
      let mainDiagonal = boardSquare[0] + boardSquare[4] + boardSquare[8];
      let invDiagonal = boardSquare[3] + boardSquare[4] + boardSquare[6];
      let row = boardSquare[0] + boardSquare[1] + boardSquare[2];
      let column = boardSquare[0] + boardSquare[4] + boardSquare[7];

      if (
        mainDiagonal == "XXX" ||
        mainDiagonal == "OOO" ||
        row == "XXX" ||
        row == "OOO"
      ) {
        return false;
      } else {
        return true;
      }
    },
  };
}

function Player() {
  let namePlayers = [];

  return {
    throwPlayer: (colorToken) => {},
    getNamePlayer: () => {
      return namePlayers;
    },
  };
}

function Turn() {
  return Math.round(Math.random()) === 0 ? TOKEN_X : TOKEN_O;
}

function Action() {
  return {
    putToken: () => {
      console.writeln("pongo maximo 3 fichas");
    },
    moveToken: () => {
      console.writeln("muevo una ficha");
    },
  };
}
