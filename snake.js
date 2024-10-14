const playerGrid = document.querySelector(".grid");
const pointsElement = document.querySelector(".points");
const highscoreElement = document.querySelector(".highscore");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let applesX, applesY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId; 
let points = 0;
let goldenApplesX, goldenApplesY;
let appleAmount = 0;

let highscore = localStorage.getItem("highscore") || 0;
highscoreElement.innerText = `high score: ${highscore}`;

const changeApplesPosition = () => {
    applesX = Math.floor(Math.random() * 30) + 1;
    applesY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId)
    alert("u lost | retry .");
    location.reload();
}

const changeDirection = (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
})

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="apples" style="grid-area: ${applesY} / ${applesX} "></div>`;

    if(snakeX === applesX && snakeY === applesY) {
        changeApplesPosition();
        snakeBody.push([applesX, applesY]);
        appleAmount++;
        points++;

        if (appleAmount % 4.4 == 0) {
            snakeBody.push([goldenApplesX, goldenApplesY]);
            points += 5
        }

        highscore = points >= highscore ? points : highscore;
        localStorage.setItem('highscore', highscore);
        pointsElement.innerText = `points: ${points}`;
        highscoreElement.innerText = `high score: ${highscore}`;
    }

    for (let i = snakeBody.length - 1; i > 0; i-- ) {
        snakeBody[i] = snakeBody[i - 1];

    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]} "></div>`;
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playerGrid.innerHTML = htmlMarkup;
}
changeApplesPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);