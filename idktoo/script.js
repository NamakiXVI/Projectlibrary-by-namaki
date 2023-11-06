const canvas = document.getElementById("canvasstyle");
const ctx = canvas.getContext("2d");


const player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    color: "blue",
    speed: 30,
};

const bullets = [];
const enemies = [];

let isGameOver = false;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawGameOver() {
    ctx.fillStyle = "red";
    ctx.font = "128px Comic Sans MS";
    ctx.fillText("Game Over", canvas.width / 2 - 300, canvas.height / 2 - 15);
}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        ctx.save(); 
        ctx.translate(bullets[i].x, bullets[i].y); 
        ctx.rotate(bullets[i].angle); 
        ctx.fillStyle = "red";
        ctx.fillRect(-2.5, -10, 10, 5); 
        ctx.restore();
    }
}

function drawEnemies() {
    for (let i = 0; i < enemies.length; i++) {
        ctx.fillStyle = "green";
        ctx.fillRect(enemies[i].x, enemies[i].y, 30, 30);
    }
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isGameOver) {

    drawPlayer();
    drawBullets();
    drawEnemies();

    bullets.forEach((bullet, index) => {
        bullet.x += bullet.vx;
        bullet.y += bullet.vy;
        if (bullet.y < 0 || bullet.x < 0 || bullet.x > canvas.width) {
            bullets.splice(index, 1);
        }
    });

    enemies.forEach((enemy, eIndex) => {
        if (!isGameOver) {
            const angle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
            const velocity = 2;
            const velocityX = Math.cos(angle) * velocity;
            const velocityY = Math.sin(angle) * velocity;
            enemy.x += velocityX;
            enemy.y += velocityY;

            if (
                player.x + player.width >= enemy.x &&
                player.x <= enemy.x + 30 &&
                player.y + player.height >= enemy.y &&
                player.y <= enemy.y + 30
            ) {
                isGameOver = true;
            }

            bullets.forEach((bullet, bIndex) => {
                if (
                    bullet.x >= enemy.x &&
                    bullet.x <= enemy.x + 30 &&
                    bullet.y >= enemy.y &&
                    bullet.y <= enemy.y + 30
                ) {
                    bullets.splice(bIndex, 1);
                    enemies.splice(eIndex, 1);
                }
            });
        }
    });
    
    }

    if (!isGameOver) {
        if (player.health <= 0) {
            isGameOver = true;
        }
        requestAnimationFrame(update);
    } else {
        drawGameOver();
    }
}

function shoot(event) {

    if (isGameOver) {
        return;
    }

    const bulletX = player.x + player.width / 2 - 2.5;
    const bulletY = player.y;
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const angle = Math.atan2(mouseY - bulletY, mouseX - bulletX);

    const velocity = 50;

    const velocityX = Math.cos(angle) * velocity;
    const velocityY = Math.sin(angle) * velocity;

    bullets.push({ x: bulletX, y: bulletY, vx: velocityX, vy: velocityY, angle: angle });
}

function spawnEnemy() {
    const enemyX = Math.random() * (canvas.width - 30);
    const enemyY = 0;
    enemies.push({ x: enemyX, y: enemyY });
}

setInterval(spawnEnemy, 2000);

document.addEventListener("keydown", (event) => {
    if (isGameOver) {
        return;
    }

    if (event.key === "a" && player.x > 0) {
        player.x -= player.speed;
    }
    if (event.key === "d" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }

    if (event.key === "s" && player.y < canvas.height - player.height) {
        player.y += player.speed;
    }

    if (event.key === "w" && player.y > 0) {
        player.y -= player.speed;
    }
});

canvas.addEventListener("mousedown", (event) => {
    if (event.button === 0) 
    {
        shoot(event);
    }
});

update();