// Setup canvas
const canvas = document.getElementById('footballField');
const ctx = canvas.getContext('2d');

// Game variables
let playerX = 100, playerY = 300, playerSpeed = 5;
let ballX = 400, ballY = 300, ballRadius = 10, ballSpeedX = 0, ballSpeedY = 0;
let goalX = 750, goalWidth = 50, goalHeight = 200;
let score = 0;

// Event listener for player controls
document.addEventListener('keydown', movePlayer);

function movePlayer(event) {
    if (event.key === "ArrowUp") playerY -= playerSpeed;
    if (event.key === "ArrowDown") playerY += playerSpeed;
    if (event.key === "ArrowLeft") playerX -= playerSpeed;
    if (event.key === "ArrowRight") playerX += playerSpeed;
}

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw football field
    ctx.fillStyle = '#4CAF50'; // Green field
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw player (circle)
    ctx.beginPath();
    ctx.arc(playerX, playerY, 20, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();

    // Draw goal area
    ctx.fillStyle = 'blue';
    ctx.fillRect(goalX, 200, goalWidth, goalHeight);

    // Ball movement
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with walls
    if (ballX <= 0 || ballX >= canvas.width) ballSpeedX = -ballSpeedX;
    if (ballY <= 0 || ballY >= canvas.height) ballSpeedY = -ballSpeedY;

    // Ball and player collision
    if (Math.abs(ballX - playerX) < 20 && Math.abs(ballY - playerY) < 20) {
        ballSpeedX = (ballX - playerX) / 5;
        ballSpeedY = (ballY - playerY) / 5;
    }

    // Goal detection
    if (ballX >= goalX && ballX <= goalX + goalWidth && ballY >= 200 && ballY <= 400) {
        score++;
        resetBall();
    }

    // Display score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 30);

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Reset the ball position
function resetBall() {
    ballX = 400;
    ballY = 300;
    ballSpeedX = 0;
    ballSpeedY = 0;
}

// Start the game loop
gameLoop();
