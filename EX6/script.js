var ball = document.getElementById("ball");

var posX = 0;
var posY = 0;
ball.style.left = posX + "px";
ball.style.top = posY + "px";

var maxX = 450; 
var maxY = 250; 

var speedX = 2;
var speedY = 2;

function moveBall() {
    posX += speedX;
    posY += speedY;

    ball.style.left = posX + "px";
    ball.style.top = posY + "px";

    if (posX < 0 || posY < 0 || posX > maxX || posY > maxY) {
        alert("Out of play");
        clearInterval(animation); 
    }
}

var animation = setInterval(moveBall, 20);

