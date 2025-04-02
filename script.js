const Gameboard = (function () {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => [...board];

    const update = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
        render();
    };

    const render = () => {
        const cells = document.querySelectorAll(".cell");
        getBoard().forEach((mark, index) => {
            cells[index].textContent = mark;
            cells[index].dataset.index=index;
            if (mark) {
                cells[index].classList.add("taken");
            } else {
                cells[index].classList.remove("taken");
            }
        });
    };

    return { getBoard, update, resetBoard, render };
})();

const Game = (function () {
    let currentPlayer = "X";

    const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const move = (event) => {
        let index = event.target.dataset.index;
        if (Gameboard.update(index, currentPlayer)) {
            Gameboard.render();
            if (checkWinner(currentPlayer)) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                Gameboard.resetBoard();
            } else if (Gameboard.getBoard().every(cell => cell !== "")) {
                setTimeout(() => alert(`It's a tie!`), 100);
                Gameboard.resetBoard();
            } else {
                switchPlayer();
            }
        }
    };

    const checkWinner = (player) => {
        const winningCombo = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        return winningCombo.some(combination =>
            combination.every(index => Gameboard.getBoard()[index] === player)
        );
    };

    return { move };
})();

// Attach event listeners once
document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", Game.move);
});

// Initial render
Gameboard.render();
