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

Gameboard.printBoard()