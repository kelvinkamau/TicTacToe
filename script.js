document.addEventListener('DOMContentLoaded', function () {
    const sq1 = document.getElementById('square1');
    const sq2 = document.getElementById('square2');
    const sq3 = document.getElementById('square3');
    const sq4 = document.getElementById('square4');
    const sq5 = document.getElementById('square5');
    const sq6 = document.getElementById('square6');
    const sq7 = document.getElementById('square7');
    const sq8 = document.getElementById('square8');
    const sq9 = document.getElementById('square9');

    let scorex = 0;
    let scoreo = 0;
    let playValid = false;
    let win = false;

    function validatePlay(squareplayed) {
        if (squareplayed.classList.contains('free')) {
            playValid = true;
        } else {
            playValid = false;
        }
    }

    function clearBoard() {
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => {
            tile.classList.remove('played', 'O-play', 'X-play');
            tile.textContent = '';
            tile.classList.add('free');
        });
        win = false;
    }

    function updateScoreDisplay() {
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = `[ You: ${scorex} / Computer: ${scoreo} ]`;
    }

    function winAlert(player) {
        win = true;
        if (player === "X") {
            scorex++;
            alert(`Yay, you beat the computer! Your score is ${scorex} Computer score is ${scoreo}`);
        } else {
            scoreo++;
            alert(`You lost! Computer score is ${scoreo} Your score is ${scorex}`);
        }
        updateScoreDisplay();
        clearBoard();
    }

    function checkWin() {
        const winConditions = [
            [sq1, sq2, sq3],
            [sq4, sq5, sq6],
            [sq7, sq8, sq9],
            [sq1, sq4, sq7],
            [sq2, sq5, sq8],
            [sq3, sq6, sq9],
            [sq1, sq5, sq9],
            [sq3, sq5, sq7]
        ];

        for (let i = 0; i < winConditions.length; i++) {
            if (
                winConditions[i][0].classList.contains('X-play') &&
                winConditions[i][1].classList.contains('X-play') &&
                winConditions[i][2].classList.contains('X-play')
            ) {
                winAlert("X");
                return true;
            } else if (
                winConditions[i][0].classList.contains('O-play') &&
                winConditions[i][1].classList.contains('O-play') &&
                winConditions[i][2].classList.contains('O-play')
            ) {
                winAlert("O");
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        const freeSquares = document.querySelectorAll('.tile.free');
        if (freeSquares.length === 0 && !win) {
            alert("Draw! Try playing again!");
            clearBoard();
            return true;
        }
        return false;
    }

    function Oplay() {
        function Oplaying(square) {
            validatePlay(square);
            if (playValid) {
                square.classList.remove('free');
                square.classList.add('played', 'O-play');
                square.textContent = "O";
                if (checkWin()) return;
                if (checkDraw()) return;
                return true;
            }
            return false;
        }

        function Orandomplay() {
            for (let i = 0; i < 10; i++) {
                const randomNumber = Math.floor(Math.random() * 9) + 1;
                const randomSquare = document.getElementById(`square${randomNumber}`);
                if (Oplaying(randomSquare)) {
                    return true;
                }
            }
            return false;
        }

        const winConditions = [
            [[sq1, sq2, sq3], sq3, sq2, sq1],
            [[sq4, sq5, sq6], sq6, sq5, sq4],
            [[sq7, sq8, sq9], sq9, sq8, sq7],
            [[sq1, sq4, sq7], sq7, sq4, sq1],
            [[sq2, sq5, sq8], sq8, sq2, sq5],
            [[sq3, sq6, sq9], sq9, sq6, sq3],
            [[sq1, sq5, sq9], sq9, sq5, sq1],
            [[sq3, sq5, sq7], sq7, sq5, sq3]
        ];

        for (let i = 0; i < winConditions.length; i++) {
            if (
                (winConditions[i][0][0].classList.contains('X-play') &&
                    winConditions[i][0][1].classList.contains('X-play') &&
                    !winConditions[i][1].classList.contains('played')) ||
                (winConditions[i][0][0].classList.contains('O-play') &&
                    winConditions[i][0][1].classList.contains('O-play') &&
                    !winConditions[i][1].classList.contains('played'))
            ) {
                if (Oplaying(winConditions[i][1])) return;
            } else if (
                (winConditions[i][0][0].classList.contains('X-play') &&
                    winConditions[i][0][2].classList.contains('X-play') &&
                    !winConditions[i][2].classList.contains('played')) ||
                (winConditions[i][0][0].classList.contains('O-play') &&
                    winConditions[i][0][2].classList.contains('O-play') &&
                    !winConditions[i][2].classList.contains('played'))
            ) {
                if (Oplaying(winConditions[i][2])) return;
            } else if (
                (winConditions[i][0][1].classList.contains('X-play') &&
                    winConditions[i][0][2].classList.contains('X-play') &&
                    !winConditions[i][3].classList.contains('played')) ||
                (winConditions[i][0][1].classList.contains('O-play') &&
                    winConditions[i][0][2].classList.contains('O-play') &&
                    !winConditions[i][3].classList.contains('played'))
            ) {
                if (Oplaying(winConditions[i][3])) return;
            }
        }

        Orandomplay();
        checkWin();
        checkDraw();
    }

    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => {
        tile.addEventListener('click', function () {
            validatePlay(this);
            if (playValid) {
                this.classList.remove('free');
                this.classList.add('played', 'X-play');
                this.textContent = "X";
                if (!checkWin() && !checkDraw()) {
                    Oplay();
                }
            } else {
                alert("Square has already been played. Please select another square");
            }
        });
    });

    const resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', function () {
        clearBoard();
    });

    updateScoreDisplay();
});