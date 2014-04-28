(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-swarm');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
'use strict';
Phaser.Point.prototype.limit = function(high, low) {
  high = high || null;
  low = low || null;
  if(high && this.getMagnitude() > high) {
    this.setMagnitude(high);
  }
  if(low && this.getMagnitude() < low) {
    this.setMagnitude(low);
  }

  return this;
};

var Boid = function(game, x, y, group) {
  Phaser.Sprite.call(this, game, x, y, 'boid');
  this.anchor.setTo(0.5, 0.5);
  this.group = group;
  this.game.physics.arcade.enableBody(this);

  
  this.maxVelocity = 50.0;
  this.maxForce = 10.0;
  this.seekForce = 0.5;
  
  this.radius = Math.sqrt(this.height * this.height + this.width * this.width) / 2;

  this.desiredSeparation = 40.0;
  this.maxDistance = this.radius * 10.0;
  
};

Boid.prototype = Object.create(Phaser.Sprite.prototype);
Boid.prototype.constructor = Boid;

Boid.prototype.update = function() {
  this.body.acceleration.setTo(0,0);
  if(this.target && this.target.exists) {
    var seekAccel = Phaser.Point();
    if(this.target instanceof Phaser.Group) {
      seekAccel = this.seekGroup();
    } else {
      seekAccel = this.seek(this.target.body.position);
    }
    seekAccel.multiply(this.seekForce, this.seekForce);
    this.applyForce(seekAccel);
  }
  this.applyForce(this.separate());
  this.applyForce(this.align());
  this.cohesion();
  
  this.checkBorders();
  this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
};

Boid.prototype.applyForce = function(force) {
  this.body.acceleration = Phaser.Point.add(this.body.acceleration, force);
};

Boid.prototype.seekGroup = function() {
  var closest = null;
  var distance = Number.MAX_VALUE;
  var desired = new Phaser.Point();
  var steer = new Phaser.Point();

  this.target.forEachExists(function(target) {
    var d = this.body.position.distance(target.body.position);
    if(d < distance) {
      distance = d;
      closest = target;
    }
  }, this);

  return this.seek(closest.body.position);
};

Boid.prototype.seek = function(target) {
  var desired = Phaser.Point.subtract(target, this.body.position);

  desired.normalize();
  desired.multiply(this.maxVelocity, this.maxVelocity);

  var steer = Phaser.Point.subtract(desired, this.body.velocity);
  steer.limit(this.maxVelocity);
  return steer;
};

Boid.prototype.lookAtClosest = function() {
  var target = null;
  var dist = 0;
  this.group.forEach(function(boid) {
    if (boid.body.position !== this.body.position) {
      var distBetween = this.game.physics.arcade.distanceBetween(this, boid);
      if(!target ||  distBetween < dist) {
        dist = distBetween;
        target = boid;
      }
    }
  },this);

  if(!!target) {
    this.rotation = this.game.physics.arcade.angleBetween(this, target);
  }
};

Boid.prototype.separate = function() {
  var distance = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  this.group.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if((d > 0) && (d < this.desiredSeparation)) {
      var diff = Phaser.Point.subtract(this.body.position, boid.body.position);
      diff.normalize();
      diff.divide(d,d);
      steer.add(diff.x,diff.y);
      count++
    }
  }, this);

  if(count > 0) {
    steer.divide(count, count);
  }

  if(steer.getMagnitude() > 0) {
    steer.normalize();
    steer.multiply(this.maxVelocity, this.maxVelocity);
    steer.subtract(this.body.velocity.x, this.body.velocity.y);
    steer.limit(this.maxForce);
  }

  return steer;
};


Boid.prototype.cohesion = function() {
  
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  this.group.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(boid.body.position.x, boid.body.position.y);
      count++;
    }
  }, this);

  if (count > 0) {
    sum.divide(count, count);  
    return this.seek(sum);
  }
  return steer;
};


Boid.prototype.align = function() {
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;
  this.group.forEach(function(boid) {
    var d = this.body.position.distance(boid.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(boid.body.velocity.x, boid.body.velocity.y);
      count++;
    }
  }, this);

  if (count > 0) {
    sum.divide(count, count);  

    sum.normalize();
    sum.multiply(this.maxVelocity, this.maxVelocity);
    steer = Phaser.Point.subtract(sum, this.body.velocity);
    steer.limit(this.maxForce);
  }

  return steer;
};

Boid.prototype.checkBorders = function() {
  if(this.body.position.x < -this.radius ){
    this.body.position.x = this.game.width + this.radius;
  }
  if(this.body.position.y < -this.radius ){
    this.body.position.y = this.game.height + this.radius;
  }
  if(this.body.position.x > this.game.width + this.radius ){
    this.body.position.x = -this.radius;
  }
  if(this.body.position.y > this.game.height + this.radius ){
    this.body.position.y = -this.radius;
  }
};
module.exports = Boid;

},{}],3:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {

    this.titleText = this.game.add.bitmapText(200, 100, 'minecraftia','Game Over\n',64);
    
    this.congratsText = this.game.add.bitmapText(320, 200, 'minecraftia','You win!',32);

    this.instructionText = this.game.add.bitmapText(330, 300, 'minecraftia','Tap to play again!',12);
    
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {

    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);


    this.titleText = this.game.add.bitmapText(200, 250, 'minecraftia','\'Allo, \'Allo!',64);

    this.instructionsText = this.game.add.bitmapText(200, 400, 'minecraftia','Tap anywhere to play\n "Catch the Yeoman Logo"',24);
    this.instructionsText.align = 'center';
    
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],6:[function(require,module,exports){

  'use strict';
  var Boid = require('../prefabs/boid');

  function Play() {}
  Play.prototype = {
    create: function() {

      this.zombies = this.game.add.group();
      
      this.food = this.game.add.group();
      for(var j = 0; j < 5; j++) {
        var food = this.game.add.sprite(this.game.width / 2, this.game.height/2, this.game.cache.getBitmapData('food'));
        food.anchor.set(0.5, 0.5);
        this.game.physics.arcade.enableBody(food);
        this.food.add(food);
      }
      
      
      
      
      for(var i = 0; i < 350; i++) {
        this.zombies.add(new Boid(this.game, this.game.world.randomX, this.game.world.randomY, this.zombies));
      }

      this.zombies.setAll('target',this.food);
      this.zombies.setAll('scale.x',0.25);
      this.zombies.setAll('scale.y',0.25);
      
    },
    update: function() {
      this.game.physics.arcade.collide(this.food, this.zombies, this.foodHit, null, this);
    },
    foodHit: function(food, zombie) {
      food.kill();
      food.reset(this.game.world.randomX, this.game.world.randomY);
      food.revive();
    }
  };
  
  module.exports = Play;
},{"../prefabs/boid":2}],7:[function(require,module,exports){
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.game.width/2,this.game.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('yeoman', 'assets/yeoman-logo.png');
    this.load.image('boid', 'assets/boid.png');
    this.load.bitmapFont('minecraftia', 'assets/fonts/minecraftia.png', 'assets/fonts/minecraftia.xml');
    var bmd = this.game.add.bitmapData(8,8);
    bmd.ctx.fillStyle = '#b2dfb0';
    bmd.ctx.fillRect(0,0, 8,8);
    bmd.render();
    this.game.cache.addBitmapData('food', bmd);

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])