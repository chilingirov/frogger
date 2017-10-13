// Create enemy object
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random() * (400 - 100) + 100;
};

// Update the enemy's position, multiply the position with dt
Enemy.prototype.update = function(dt) {
    var speed = this.speed * dt;
    this.x += speed;
    if (this.x > 500) {
        this.x = Math.random() - 600;
    }

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Create new enemy objects
var enemy1 = new Enemy(-170, 60);
var enemy2 = new Enemy(-150, 140);
var enemy3 = new Enemy(-600, 140);
var enemy4 = new Enemy(-210, 140);
var enemy5 = new Enemy(-700, 230);
var enemy6 = new Enemy(-300, 230);
var enemy7 = new Enemy(-1000, 230);
// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

//Create Player class

var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.score = 0;
};
//Create a function to display the score on the screen
Player.prototype.displayScore = function() {
    document.getElementById("score").innerHTML = this.score;
};

//Update the player - reset his position if there is a collision or if he reach the water
Player.prototype.update = function() {
    if (this.y < 40) {
        this.x = 200;
        this.y = 400;
        this.score++;
        this.displayScore();
    } else {
        this.checkCollision();
    }

};

//Check for collision with the enemies
Player.prototype.checkCollision = function() {
    var numberEnemies = allEnemies.length;
    for (var i = 0; i < numberEnemies; i++) {
        var enemy = allEnemies[i];
        if (this.x < enemy.x + 50 && this.x + 50 > enemy.x && this.y < enemy.y + 50 && 50 + this.y > enemy.y) {
            this.x = 200;
            this.y = 400;
            this.score = 0;
            this.displayScore();
        }
    }
};

//Render the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Instantiate new Player object called player
var player = new Player();
//Move the player up, right, bootm and left
Player.prototype.handleInput = function(key) {
    if (key === "right" && this.x < 400) {
        this.x += 100;
    }

    if (key === "left" && this.x > 10) {
        this.x -= 100;
    }

    if (key === "up" && this.y > 10) {
        this.y -= 83;
    }

    if (key === "down" && this.y < 300) {
        this.y += 83;
    }

};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function(e) {
    var allowedKeys = {
        37: "left",
        38: "up",
        39: "right",
        40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
});