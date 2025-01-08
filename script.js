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

    // Add method to clear board/restart game
    const clearBoard = () => {
        board.forEach(
            (row) => row.forEach(
                (_, index) => row[index] = 0));
        console.log('Gameboard was cleared.');
        console.log(Gameboard.printBoard());
    }

    // Make methods available
    return { getBoard, updateSquare, printBoard, clearBoard }

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
    let message = '';

    // Add method to start game and set player 1 as current player and assign marker
    const startGame = (name1, name2) => {
        player1 = Player(name1, 'X');
        player2 = Player(name2, 'O');
        currentPlayer = player1;
        Gameboard.clearBoard();
        console.log(`Game started with ${player1.getName()} and ${player2.getName()}`);
    }
    
    // Add method to take a turn passing in the row and column where the player picks
    const playTurn = (row, column) => {
        if (Gameboard.updateSquare(row, column, currentPlayer.getMarker())) {
            // Validate turn by checking for a winner first
            if (checkWinner(currentPlayer.getMarker())) {
                console.log(`${currentPlayer.getName()} wins!`);
                message = `${currentPlayer.getName()} wins! Restart game.`;
                currentPlayer.incrementWins();
                return true;
            }
            // Validate turn by checking for a tie
            if (checkTie()) {
                console.log('It is a tie.');
                message = 'It is a tie. Restart game.';
                return true;
            }
            console.log(`${currentPlayer.getName()} took a turn.`)
            Gameboard.printBoard();
            switchTurn();
        } else {
            console.log('Choose different space.')
            message = 'Choose different space.';
        }
        return false;
    }

    // Add method to switch players turn
    const switchTurn = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        console.log(`It is now ${currentPlayer.getName()}'s turn.`);
        message = `It is now ${currentPlayer.getName()}'s turn.`;
    }

    // Add method to get current player
    const getCurrentPlayer = () => currentPlayer;

    const getMessage = () => message;

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

    // Add method to restart game
    const restartGame = () => {
        Gameboard.clearBoard();
        currentPlayer = player1;
        console.log('Game restarted.');
    }

    // Make methods available 
    return { startGame, playTurn, restartGame, getCurrentPlayer, getMessage };

})();

const DisplayController = (() => {
    const gameboardElement = document.getElementById('gameboard');

    const renderBoard = (board) => {
        gameboardElement.innerHTML = '';
        board.forEach((row, rowIndex) => {
            row.forEach((square, colIndex) => {
                const squareElement = document.createElement('div');
                squareElement.classList.add('square');
                squareElement.textContent = square === 0 ? '' : square === 'X' ? 'X' : 'O';
                squareElement.addEventListener('click', () => {
                    handleSquareClick(rowIndex, colIndex);
                });
                gameboardElement.appendChild(squareElement);
            })
        })
    }

    const updateStatus = (message) => {
        const statusElement = document.getElementById('status');
        statusElement.textContent = message;
    }

    const handleSquareClick = (row, column) => {
        Game.playTurn(row, column); // Play the turn
        renderBoard(Gameboard.getBoard()); // Update the board visually
        updateStatus(Game.getMessage()); // Use the message from Game
    }

    // Make methods available
    return { renderBoard, updateStatus };

})();

// Add event listeners for the start game button
document.getElementById('start-game').addEventListener('click', () => {
    const player1Name = document.getElementById('player1-name').value || 'Player 1';
    const player2Name = document.getElementById('player2-name').value || 'Player 2';
    Game.startGame(player1Name, player2Name);
    DisplayController.updateStatus(`${player1Name}'s turn.`);
    DisplayController.renderBoard(Gameboard.getBoard());
})

// Add event listeners for the reset game button
document.getElementById('restart-game').addEventListener('click', () => {
    // Game.startGame(player1Name, player2Name);
    Game.restartGame();
    DisplayController.updateStatus('Game restarted.');
    DisplayController.renderBoard(Gameboard.getBoard());
})
