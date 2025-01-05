// Create gameboard using module pattern 
const Gameboard = (function() {
    // Define gameboard size
    const rows = 3;
    const columns = 3;
    const board = [];

    // Use nested for loop to create a 2D array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }

    // Add method to get board when requested
    const getBoard = () => board;

    // Add method to update square when user picks a square
    const updateSquare = (row, column, marker) => {
        if (board[row][column] === 0) {
            board[row][column] = marker;
            return true;
        }
        return false;
    }

    // Add method to print board to console
    const printBoard = () => {
        console.log(board.map(row => row.join(" ")).join("\n"))
    }

    // Make methods available
    return { getBoard, updateSquare, printBoard }

})();

// Create players factory to hold information
const Player = (name, marker) => {
    // Initialize wins to keep track of players win total
    let wins = 0;

    // Add methods to get players name, marker, and win total
    const getName = () => name;
    const getMarker = () => marker;
    const getWins = () => wins;

    // Add method to increase win total
    const incrementWins = () => {
        wins++;
    };

    // Make methods available
    return { getName, getMarker, getWins, incrementWins }
}

// Game turn logic and flow
const Game = (() => {
    // Initialize players
    let player1, player2, currentPlayer;

    // Add method to start game and set player 1 as current player and assign marker
    const startGame = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
        console.log(`Game started with ${player1.getName()} and ${player2.getName()}`);
    }
    
    // Add method to take a turn passing in the row and column where the player picks
    const playTurn = (row, column) => {
        if (Gameboard.updateSquare(row, column, currentPlayer.getMarker())) {
            // Validate turn by checking for a winner first
            if (checkWinner(currentPlayer.getMarker())) {
                console.log(`${currentPlayer.getName()} wins!`);
                currentPlayer.incrementWins();
                return true;
            }
            // Validate turn by checking for a tie
            if (checkTie()) {
                console.log('It is a tie.');
                return true;
            }
            console.log(`${currentPlayer.getName()} took a turn.`)
            Gameboard.printBoard();
            switchTurn();
        } else {
            console.log('Choose different space.')
        }
        return false;
    }

    // Add method to switch players turn
    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`It is now ${currentPlayer.getName()}'s turn.`);
    }

    // Add method to check winner
    const checkWinner = (marker) => {
        const board = Gameboard.getBoard();

        // Check win in rows
        for (const row of board) {
            if (row.every((space) => space === marker)) {
                return true;
            }
        }

        // Check win in columns
        for (let column = 0; column < board[0].length; column++) {
            if (board.every((row) => row[column] === marker)) {
                return true;
            }
        }

        // Check win diagonals
        if (board.every((_, index) => board[index][index] === marker)) {
            return true;
        }

        if (board.every((_, index) => board[index][board.length - 1 - index] === marker )) {
            return true;
        }

        return false;

    }

    // Add method to check for a tie
    const checkTie = () => {
        const board = Gameboard.getBoard();
        return board.flat().every((space) => space !== 0);
    }

    // Make methods available 
    return { startGame, playTurn }

})();

