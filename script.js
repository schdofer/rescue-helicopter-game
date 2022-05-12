// Start Game
function start() {
    $("#start").hide();

    $("#bgGame").append("<div id='player' class='animation-1'></div>");
    $("#bgGame").append("<div id='enemy-1' class='animation-2'></div>");
    $("#bgGame").append("<div id='enemy-2'></div>");
    $("#bgGame").append("<div id='friend' class='animation-3'></div>");

    //Principais variáveis do Game
    let game = {};
    let gameOver = false;
    let velocity = 5;
    let positionY = parseInt(Math.random() * 334);
    let canShoot = true;
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
        collision();
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
            shoot();
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

    function shoot() {
        if (canShoot == true) {
            canShoot = false;
            let top = parseInt($("#player").css("top"))
            positionX = parseInt($("#player").css("left"))
            shootX = positionX + 190;
            topShoot = top + 37;
            $("#bgGame").append("<div id='shoot'></div");
            $("#shoot").css("top", topShoot);
            $("#shoot").css("left", shootX);

            var timeShoot = window.setInterval(runShoot, 30);
        }

        function runShoot() {
            positionX = parseInt($("#shoot").css("left"));
            $("#shoot").css("left", positionX + 15);

            if (positionX > 900) {
                window.clearInterval(timeShoot);
                timeShoot = null;
                $("#shoot").remove();
                canShoot = true;
            }
        }
    }

    // Função que verifica colisões
    function collision() {
        let collision1 = ($("#player").collision($("#enemy-1")));
        var collision2 = ($("#player").collision($("#enemy-2")));
        var collision3 = ($("#shoot").collision($("#enemy-1")));
        var collision4 = ($("#shoot").collision($("#enemy-2")));
        var collision5 = ($("#player").collision($("#friend")));
        var collision6 = ($("#enemy-2").collision($("#friend")));

        // Colisao do helicóptero com inimigo 1
        if (collision1.length > 0) {
            enemy1X = parseInt($("#enemy-1").css("left"));
            enemy1Y = parseInt($("#enemy-1").css("top"));
            explosion1(enemy1X, enemy1Y);

            positionY = parseInt(Math.random() * 334);
            $("#enemy-1").css("left", 694);
            $("#enemy-1").css("top", positionY);
        }

        // Colisao do helicóptero com inimigo 2
        if (collision2.length > 0) {
            enemy2X = parseInt($("#enemy-2").css("left"));
            enemy2Y = parseInt($("#enemy-2").css("top"));
            explosion1(enemy2X, enemy2Y);

            $("#enemy-2").remove();
            repositionEnemy2();
        }

        // Colisao do tiro com inimigo 1
        if (collision3.length > 0) {
            enemy1X = parseInt($("#enemy-1").css("left"));
            enemy1Y = parseInt($("#enemy-1").css("top"));

            explosion1(enemy1X, enemy1Y);
            $("#shoot").css("left", 950);

            positionY = parseInt(Math.random() * 334);
            $("#enemy-1").css("left", 694);
            $("#enemy-1").css("top", positionY);
        }

        // Colisao do tiro com inimigo 2
        if (collision4.length > 0) {
            enemy2X = parseInt($("#enemy-2").css("left"));
            enemy2Y = parseInt($("#enemy-2").css("top"));
            $("#enemy-2").remove();

            explosion2(enemy2X, enemy2Y);
            $("#shoot").css("left", 950);

            repositionEnemy2();
        }

        // Colisão player com friend
        if (collision5.length > 0) {
            repositionFriend();
            $("#friend").remove();
        }

        // Colisão do amigo com inimigo 2
        if (collision6.length > 0) {
            friendX = parseInt($("#friend").css("left"));
            friendY = parseInt($("#friend").css("top"));
            explosion3(friendX, friendY);
            $("#friend").remove();

            repositionFriend();
        }
    }

    // Função que realiza explosão
    function explosion1(enemy1X, enemy1Y) {
        $("#bgGame").append("<div id='explosion-1'></div");
        $("#explosion-1").css("background-image", "url(assets/images/explosion.png)");
        let div = $("#explosion-1");
        div.css("top", enemy1Y);
        div.css("left", enemy1X);
        div.animate({ width: 200, opacity: 0 }, "slow");

        var explosionTime = window.setInterval(removeExplosion, 800);

        function removeExplosion() {
            div.remove();
            window.clearInterval(explosionTime);
            explosionTime = null;
        }
    }

    // Explosão 2
    function explosion2(enemy2X, enemy2Y) {
        $("#bgGame").append("<div id='explosion-2'></div>");
        $("#explosion-2").css("background-image", "url(assets/images/explosion.png)");
        let div2 = $("#explosion-2");
        div2.css("top", enemy2Y);
        div2.css("left", enemy2X);
        div2.animate({ width: 200, opacity: 0 }, "slow");

        var explosionTime2 = window.setInterval(removeExplosion2, 1000);

        function removeExplosion2() {
            div2.remove();
            window.clearInterval(explosionTime2);
            explosionTime2 = null;
        }
    }

    // Explosão 3
    function explosion3(friendX, friendY) {
        $("#bgGame").append("<div id='explosion-3' class='animation-4'></div>");
        $("#explosion-3").css("top", friendY);
        $("#explosion-3").css("left", friendX);
        let explosionTime3 = window.setInterval(reseteExplosion3, 1000);

        function reseteExplosion3() {
            $("#explosion-3").remove();
            window.clearInterval(explosionTime3);
            explosionTime3 = null;
        }
    }

    // Função para reposicionar inimigo 2
    function repositionEnemy2() {
        let collisionTime4 = window.setInterval(reposition4, 5000);

        function reposition4() {
            window.clearInterval(collisionTime4);
            collisionTime4 = null;

            if (gameOver == false) {
                $("#bgGame").append("<div id=enemy-2></div>");
            }
        }
    }

    // Função para reposicionar amigo
    function repositionFriend() {
        var friendTime = window.setInterval(reposition6, 6000);

        function reposition6() {
            window.clearInterval(friendTime);
            friendTime = null;

            if (gameOver == false) {
                $("#bgGame").append("<div id='friend' class='animation-3'></div>");
            }
        }

    }

}