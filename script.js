// Start Game
function start() {
    $("#start").hide();

    $("#bgGame").append("<div id='player' class='animation-1'></div>");
    $("#bgGame").append("<div id='enemy-1' class='animation-2'></div>");
    $("#bgGame").append("<div id='enemy-2'></div>");
    $("#bgGame").append("<div id='friend' class='animation-3'></div>");

    //Principais variáveis do Game
    let game = {};
    let velocity = 5;
    let positionY = parseInt(Math.random() * 334);
    let KEYS = {
        W: 87,
        S: 83,
        D: 68
    };
    game.pressed = [];

    //Verifica se o usuário pressionou alguma tecla	
    $(document).keydown(function (e) {
        game.pressed[e.which] = true;
    });
    $(document).keyup(function (e) {
        game.pressed[e.which] = false;
    });

    //Game Loop
    game.timer = setInterval(loop, 30);

    function loop() {
        moveBackground();
        movePlayer();
        moveEnemy1();
        moveEnemy2();
        moveFriend();
    }

    //Função que movimenta o fundo do jogo
    function moveBackground() {
        left = parseInt($("#bgGame").css("background-position"));
        $("#bgGame").css("background-position", left - 1);
    }

    // Move Player
    function movePlayer() {
        if (game.pressed[KEYS.W]) {
            let top = parseInt($("#player").css("top"));
            $("#player").css("top", top - 10);
            if (top <= 0) {
                $("#player").css("top", top + 10);
            }
        }

        if (game.pressed[KEYS.S]) {
            var top = parseInt($("#player").css("top"));
            $("#player").css("top", top + 10);
            if (top >= 434) {
                $("#player").css("top", top - 10);
            }
        }

        if (game.pressed[KEYS.D]) {
            //Chama fun��o Disparo	
        }
    }

    // Move inimigo 1
    function moveEnemy1() {
        positionX = parseInt($("#enemy-1").css("left"));
        $("#enemy-1").css("left", positionX - velocity);
        $("#enemy-1").css("top", positionY);

        if (positionX <= 0) {
            positionY = parseInt(Math.random() * 334);
            $("#enemy-1").css("left", 694);
            $("#enemy-1").css("top", positionY);
        }
    }

    // Move inimigo 2
    function moveEnemy2() {
        positionX = parseInt($("#enemy-2").css("left"));
        $("#enemy-2").css("left", positionX - 3);

        if (positionX <= 0) {
            $("#enemy-2").css("left", 775);
        }
    }

    // Move friend
    function moveFriend() {
        positionX = parseInt($("#friend").css("left"));
        $("#friend").css("left", positionX + 1);

        if (positionX > 906) {
            $("#friend").css("left", 0);
        }
    }

}

