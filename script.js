// self-contained module
// everything to do with my module is in my module
// no global variables
// if a module manages more than one thing is should be split up
// separation of concerns
// dry code: don't repeat yourself
// efficient DOM usage
// very few query selectors
// all events can be unbound


const Gameboard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }

    const getBoard = () => board;

    const updateSquare = (row, column, marker) => {
        if (board[row][column] === 0) {
            board[row][column] = marker;
            return true;
        }
        return false;
    }

    const printBoard = () => {
        console.log(board.map(row => row.join(" ")).join("\n"))
    }

    return { getBoard, updateSquare, printBoard }

})();

// Create players factory to hold information
const Player = (name, marker) => {
    let wins = 0;

    const getName = () => name;
    const getMarker = () => marker;
    const getWins = () => wins;

    const incrementWins = () => {
        wins++;
    };

    return { getName, getMarker, getWins, incrementWins }
}

// Game turn logic and flow
const Game = (() => {
    // Initialize players
    let player1, player2, currentPlayer;

    const startGame = (name1, name2) => {
        player1 = Player(name1, 1);
        player2 = Player(name2, 2);
        currentPlayer = player1;
    }
    
    const playTurn = (row, column) => {
        if (Gameboard.updateSquare(row, column, currentPlayer.getMarker())) {
            if (checkWinner(currentPlayer.getMarker())) {
                console.log(`${currentPlayer.getName()} wins!`);
                currentPlayer.incrementWins();
                return true;
            }
            if (checkTie()) {
                console.log('It is a tie.');
                return true;
            }
            switchTurn();
        } else {
            console.log('Choose different space.')
        }
        return false;
    }

    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`It is now ${currentPlayer.getName()}'s turn.`);
    }

    const checkWinner = (marker) => {

    }

    const checkTie = () => {
        const board = Gameboard.getBoard();
        return board.flat().every((space) => space !== 0);
    }

    return { startGame, playTurn }

})();

Gameboard.printBoard()

Game.startGame("Henry", "Peter")

Game.playTurn(1, 1);

Gameboard.printBoard()

Game.playTurn(0, 1);

Gameboard.printBoard()

Game.playTurn(0, 2)

Gameboard.printBoard()