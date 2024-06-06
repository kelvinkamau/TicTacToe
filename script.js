$(document).ready(function () {

    var sq1 = $('#square1');
    var sq2 = $('#square2');
    var sq3 = $('#square3');
    var sq4 = $('#square4');
    var sq5 = $('#square5');
    var sq6 = $('#square6');
    var sq7 = $('#square7');
    var sq8 = $('#square8');
    var sq9 = $('#square9');

    var scorex = 0;
    var scoreo = 0;
    var playValid = false;
    var win = false;

    function validatePlay(squareplayed) {
        if ($(squareplayed).hasClass('free')) {
            playValid = true;
        } else {
            playValid = false;
        }
    }

    function clearBoard() {
        $('.tile').removeClass('played O-play X-play');
        $('.tile').html('');
        $('.tile').addClass('free');
        win = false;
    }

    function updateScoreDisplay() {
        $('#score-display').text("[ You: " + scorex + " / Computer: " + scoreo + " ]");
    }

    function winAlert(player) {
        win = true;
        if (player == "X") {
            scorex++;
            alert("Yay, you beat the computer! Your score is " + scorex + " Computer score is " + scoreo);
        } else {
            scoreo++;
            alert("You lost! Computer score is " + scoreo + " Your score is " + scorex);
        }
        updateScoreDisplay();
        clearBoard();
    }

    function checkWin() {
        var winConditions = [
            [sq1, sq2, sq3],
            [sq4, sq5, sq6],
            [sq7, sq8, sq9],
            [sq1, sq4, sq7],
            [sq2, sq5, sq8],
            [sq3, sq6, sq9],
            [sq1, sq5, sq9],
            [sq3, sq5, sq7]
        ];

        for (var i = 0; i < winConditions.length; i++) {
            if (winConditions[i][0].hasClass('X-play') && winConditions[i][1].hasClass('X-play') && winConditions[i][2].hasClass('X-play')) {
                winAlert("X");
                return true;
            } else if (winConditions[i][0].hasClass('O-play') && winConditions[i][1].hasClass('O-play') && winConditions[i][2].hasClass('O-play')) {
                winAlert("O");
                return true;
            }
        }
        return false;
    }

    function checkDraw() {
        if (!$('.tile').hasClass('free') && !win) {
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
                square.removeClass('free').addClass('played O-play').html("O");
                if (checkWin()) return;
                if (checkDraw()) return;
                return true;
            }
            return false;
        }

        function Orandomplay() {
            for (var i = 0; i < 10; i++) {
                var randomNumber = Math.floor((Math.random() * 9) + 1);
                var randomSquare = $('#square' + randomNumber);
                if (Oplaying(randomSquare)) {
                    return true;
                }
            }
            return false;
        }

        var winConditions = [
            [[sq1, sq2, sq3], sq3, sq2, sq1],
            [[sq4, sq5, sq6], sq6, sq5, sq4],
            [[sq7, sq8, sq9], sq9, sq8, sq7],
            [[sq1, sq4, sq7], sq7, sq4, sq1],
            [[sq2, sq5, sq8], sq8, sq2, sq5],
            [[sq3, sq6, sq9], sq9, sq6, sq3],
            [[sq1, sq5, sq9], sq9, sq5, sq1],
            [[sq3, sq5, sq7], sq7, sq5, sq3]
        ];

        for (var i = 0; i < winConditions.length; i++) {
            if ((winConditions[i][0][0].hasClass('X-play') && winConditions[i][0][1].hasClass('X-play') && !winConditions[i][1].hasClass('played')) ||
                (winConditions[i][0][0].hasClass('O-play') && winConditions[i][0][1].hasClass('O-play') && !winConditions[i][1].hasClass('played'))) {
                if (Oplaying(winConditions[i][1])) return;
            } else if ((winConditions[i][0][0].hasClass('X-play') && winConditions[i][0][2].hasClass('X-play') && !winConditions[i][2].hasClass('played')) ||
                (winConditions[i][0][0].hasClass('O-play') && winConditions[i][0][2].hasClass('O-play') && !winConditions[i][2].hasClass('played'))) {
                if (Oplaying(winConditions[i][2])) return;
            } else if ((winConditions[i][0][1].hasClass('X-play') && winConditions[i][0][2].hasClass('X-play') && !winConditions[i][3].hasClass('played')) ||
                (winConditions[i][0][1].hasClass('O-play') && winConditions[i][0][2].hasClass('O-play') && !winConditions[i][3].hasClass('played'))) {
                if (Oplaying(winConditions[i][3])) return;
            }
        }

        Orandomplay();
        checkWin();
        checkDraw();
    }

    $('.tile').on('click', function () {
        validatePlay(this);
        if (playValid) {
            $(this).removeClass('free').addClass('played X-play').html("X");
            if (!checkWin() && !checkDraw()) {
                Oplay();
            }
        } else {
            alert("Square has already been played. Please select another square");
        }
    });

    $('#reset-button').on('click', function () {
        clearBoard();
    });

    // Initial display of scores
    updateScoreDisplay();

});
