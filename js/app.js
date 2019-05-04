// Enemies our player must avoid

var Enemy = function(yPosition) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.xPosition = 0;
    this.yPosition = yPosition;
    this.speed = Math.floor(Math.random() * 500) + 200;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.xPosition = this.xPosition + (this.speed * dt);
    if(this.xPosition > 505){
      this.xPosition = -80;
      this.speed = Math.floor(Math.random() * 500) + 200;
    }

    if( player.xPosition >= this.xPosition -50 && player.xPosition <=this.xPosition + 50
      && player.yPosition >= this.yPosition -50 && player.yPosition <=  this.yPosition+50){
            player.xPosition = 200;
            player.yPosition = 400;
            player.lives--;
            if (player.lives === 0) {
              swal({
                title: "Try again",
                icon: "error",
                button: "Play again!!",
              }).then((value) => {
                resetgame()
              });
            }
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);
};


// Now write your own player class
// This class requires an update(), render()
var Player = function(){
  this.xPosition = 200;
  this.yPosition = 390;
  this.sprite = 'images/char-horn-girl.png';
  this.lives = 3;

}

Player.prototype.update = function(){

  if(this.yPosition > 0){
    switch(this.key){
      case 'left':
        if(this.xPosition > 0)
          this.xPosition -= 101;
        break;
      case 'up':
        if(this.yPosition > 0)
          this.yPosition -= 83;
        break;
      case 'down':
        if(this.yPosition < 390)
          this.yPosition += 83;
        break;
      case 'right':
        if(this.xPosition < 400)
          this.xPosition += 101;
        break;
    }

   if(gem.xPosition >= this.xPosition -30 && gem.xPosition <=this.xPosition +30
    && gem.yPosition >= this.yPosition - 30 && gem.yPosition <=  this.yPosition + 30){
        gem.randomizePos();

      }
    this.key = null;
  } else {
    this.yPosition = 390;
    this.xPosition = 200;
    swal({
      title: "Good job!!",
      icon: "success",
      button: "Play again!!",
    }).then((value) => {
      resetgame()
    });
  }


};

Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition);

};

// a handleInput() method.
Player.prototype.handleInput = function(key){
  this.key = key;
}

var Gem = function(){
  // this.xPosition = Math.floor(Math.random() * 400);
  this.randomizePos();
  this.sprite = 'images/Gem Orange.png';
  this.value = 10;
}

Gem.prototype.randomizePos = function(){
  this.xPosition = 23+Math.floor(Math.random() *3)*101;
  this.yPosition = 22+83+14+Math.floor(Math.random() *3)*83;
}

Gem.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.xPosition, this.yPosition,50,80);
}

Gem.prototype.update = function(){

}

var gem = new Gem();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
allEnemies[0] = new Enemy(60);
allEnemies[1] = new Enemy(140);
allEnemies[2] = new Enemy(225);

// Place the player object in a variable called player
var player = new Player();

function resetgame(){
  player.xPosition = 200;
  player.yPosition = 400;
  player.lives = 3;
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
