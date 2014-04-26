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

var Cell = function(game, x, y, group,enemy_faction) {
   var image = "virus";
   if( enemy_faction == FACTION.VIRUS){
      image  = "whitebloodcell_angry";
   }   
   
  Phaser.Sprite.call(this, game, x, y,image);
  this.anchor.setTo(0.5, 0.5);
  this.group = group;
  this.game.physics.arcade.enableBody(this);

  
  this.maxVelocity = 50.0;
  this.maxForce = 10.0;
  this.seekForce = 0.5;
  
  this.radius = Math.sqrt(this.height * this.height + this.width * this.width) / 2;

  //this.desiredSeparation = 40.0;
  this.desiredSeparation = 15.0;
  this.maxDistance = this.radius * 10.0;
  
};

Cell.prototype = Object.create(Phaser.Sprite.prototype);
Cell.prototype.constructor = Cell;

Cell.prototype.update = function() {
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

Cell.prototype.applyForce = function(force) {
  this.body.acceleration = Phaser.Point.add(this.body.acceleration, force);
};

Cell.prototype.seekGroup = function() {
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

Cell.prototype.seek = function(target) {
  var desired = Phaser.Point.subtract(target, this.body.position);

  desired.normalize();
  desired.multiply(this.maxVelocity, this.maxVelocity);

  var steer = Phaser.Point.subtract(desired, this.body.velocity);
  steer.limit(this.maxVelocity);
  return steer;
};

Cell.prototype.lookAtClosest = function() {
  var target = null;
  var dist = 0;
  this.group.forEach(function(Cell) {
    if (Cell.body.position !== this.body.position) {
      var distBetween = this.game.physics.arcade.distanceBetween(this, Cell);
      if(!target ||  distBetween < dist) {
        dist = distBetween;
        target = Cell;
      }
    }
  },this);

  if(!!target) {
    this.rotation = this.game.physics.arcade.angleBetween(this, target);
  }
};

Cell.prototype.separate = function() {
  var distance = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  this.group.forEach(function(Cell) {
    var d = this.body.position.distance(Cell.body.position);
    if((d > 0) && (d < this.desiredSeparation)) {
      var diff = Phaser.Point.subtract(this.body.position, Cell.body.position);
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


Cell.prototype.cohesion = function() {
  
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;

  this.group.forEach(function(Cell) {
    var d = this.body.position.distance(Cell.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(Cell.body.position.x, Cell.body.position.y);
      count++;
    }
  }, this);

  if (count > 0) {
    sum.divide(count, count);  
    return this.seek(sum);
  }
  return steer;
};


Cell.prototype.align = function() {
  var sum = new Phaser.Point();
  var steer = new Phaser.Point();
  var count = 0;
  this.group.forEach(function(Cell) {
    var d = this.body.position.distance(Cell.body.position);
    if ((d > 0) && d < this.maxDistance) {
      sum.add(Cell.body.velocity.x, Cell.body.velocity.y);
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

Cell.prototype.checkBorders = function() {
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