const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameState = {
    score: 0,
    lives: 3,
    speed: 1,
    isGameOver: false,
    frameCount: 0,
};

const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 100,
    width: 40,
    height: 60,
    speed: 3,
    dx: 0,
};

let obstacles = [];
let coins = [];

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        player.dx = -player.speed;
    }
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        player.dx = player.speed;
    }
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
    if (
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'a' ||
        e.key === 'A' ||
        e.key === 'd' ||
        e.key === 'D'
    ) {
        player.dx = 0;
    }
});

function drawPlayer() {
    ctx.fillStyle = '#ff6b6b';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = '#333';
    ctx.fillRect(player.x + 5, player.y + 10, 10, 15);
    ctx.fillRect(player.x + player.width - 15, player.y + 10, 10, 15);

    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(player.x + 10, player.y + 30, 20, 15);
}

function drawRoad() {
    ctx.fillStyle = '#555';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#ffeb3b';
    ctx.lineWidth = 3;
    ctx.setLineDash([20, 15]);
    ctx.lineDashOffset = (-gameState.frameCount * gameState.speed) % 35;

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);
}

function createObstacle() {
    const lanes = [50, 150, 250, 330];
    const lane = lanes[Math.floor(Math.random() * lanes.length)];

    obstacles.push({
        x: lane,
        y: -80,
        width: 40,
        height: 60,
        color: ['#e74c3c', '#9b59b6', '#3498db', '#f39c12'][
            Math.floor(Math.random() * 4)
        ],
    });
}

function createCoin() {
    const lanes = [50, 150, 250, 330];
    const lane = lanes[Math.floor(Math.random() * lanes.length)];

    coins.push({
        x: lane + 10,
        y: -30,
        radius: 15,
    });
}

function drawObstacles() {
    obstacles.forEach((obs) => {
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

        ctx.fillStyle = '#222';
        ctx.fillRect(obs.x + 5, obs.y + 10, 10, 12);
        ctx.fillRect(obs.x + obs.width - 15, obs.y + 10, 10, 12);
    });
}

function drawCoins() {
    coins.forEach((coin) => {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ff8c00';
        ctx.beginPath();
        ctx.arc(coin.x, coin.y, coin.radius - 5, 0, Math.PI * 2);
        ctx.fill();
    });
}

function update() {
    if (gameState.isGameOver) return;

    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    obstacles.forEach((obs, index) => {
        obs.y += gameState.speed;

        if (obs.y > canvas.height) {
            obstacles.splice(index, 1);
            gameState.score += 10;
            updateUI();
        }

        if (checkCollision(player, obs)) {
            gameState.lives--;
            obstacles.splice(index, 1);
            updateUI();

            if (gameState.lives <= 0) {
                endGame();
            }
        }
    });

    coins.forEach((coin, index) => {
        coin.y += gameState.speed;

        if (coin.y > canvas.height) {
            coins.splice(index, 1);
        }

        const dist = Math.hypot(
            player.x + player.width / 2 - coin.x,
            player.y + player.height / 2 - coin.y
        );
        if (dist < player.width / 2 + coin.radius) {
            coins.splice(index, 1);
            gameState.score += 50;
            updateUI();
        }
    });

    if (gameState.frameCount % 80 === 0) {
        createObstacle();
    }

    if (gameState.frameCount % 150 === 0) {
        createCoin();
    }

    gameState.frameCount++;
}

function checkCollision(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    );
}

function updateUI() {
    document.getElementById('score').textContent = gameState.score;

    const heartsArray = Array(gameState.lives).fill('❤️');
    document.getElementById('lives').textContent = heartsArray.join('');
}

function endGame() {
    gameState.isGameOver = true;
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('gameOver').classList.add('show');
}

function restartGame() {
    gameState = {
        score: 0,
        lives: 3,
        speed: 1,
        isGameOver: false,
        frameCount: 0,
    };

    obstacles = [];
    coins = [];
    player.x = canvas.width / 2 - 20;
    player.dx = 0;

    document.getElementById('gameOver').classList.remove('show');
    updateUI();
    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRoad();
    drawObstacles();
    drawCoins();
    drawPlayer();
    update();

    if (!gameState.isGameOver) {
        requestAnimationFrame(gameLoop);
    }
}

updateUI();
gameLoop();
