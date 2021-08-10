let inputDir = { x: 0, y: 0 };  // starting position of snake 
const eat_food = new Audio('music/food.mp3');
const change_dir = new Audio('music/move.mp3');
const back_ground = new Audio('music/music.mp3');
const game_over = new Audio('music/gameover.mp3');
let speed = 6;
let lastPainTime = 0;
let score = 0;
let snakeArr = [
    { x: 13, y: 15 }
];
food = { x: 3, y: 5 }

// Game function
function main(ctime) {
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if ((ctime - lastPainTime) / 1000 < 1 / speed) {
        return;
    }
    lastPainTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // if you bump to into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}

function gameEngine() {
    // Part 1: updating the snake array 
    if (isCollide(snakeArr)) {
        game_over.play();
        back_ground.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game over press any key to plsy sgsin.");
        snakeArr = [{ x: 13, y: 15 }];
        back_ground.play();
        score = 0
    }

    // if the snake etten the food , then increament the score and regenret the food 
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        eat_food.play()
        // scor 
        score += 1;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Moving the snake 
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }; // ...snakeArr to avoid reference problem
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2 : rander the snake and snake
    // Displaying the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        // The first node is for snake mouth :-
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            // snake body heads
            snakeElement.classList.add('snake')
        }

        board.appendChild(snakeElement);
    });
    // Displaying the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

}
//for high score 
//Exicution starting
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else {
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
// game logic 
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } // start the game when you press key on key board
    change_dir.play();// play sound when u press the key
    back_ground.play();

    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
})