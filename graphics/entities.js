var Entity = function(x, y, entity_info){
  var normalSprite = new Image();
  normalSprite.src = entity_info.normal_sprite;

  var specialSprite = new Image();
  specialSprite.src = entity_info.special_sprite;

  this.currentImage = normalSprite;
  var size = entity_info.size + 2 * (Math.random() - 0.5) * entity_info.size_std_dev;

  // compute center
  var gridSize = GAME_MASTER.game_board.grid_size;
  var sizeDiff = gridSize - size;
  x += sizeDiff / 2.0;
  y += sizeDiff / 2.0;

  this.draw = function(ctx){
    ctx.drawImage(this.currentImage, x, y, size, size); // TODO: randomize size
  };

  this.setSpecialActivation = function(activationFactor){
    if((1 - activationFactor) < entity_info.special_activation_rate){
      this.currentImage = specialSprite;
    } else {
      this.currentImage = normalSprite;
    }
  }
}

var Field = function() {
  // Create entities
  this.entities = [];
  var currentR = 0;
  var currentC = 0;
  for(var r = GAME_MASTER.game_board.x.min; r < GAME_MASTER.game_board.x.max; r += GAME_MASTER.game_board.grid_size){
    this.entities.push([]);
    for(var c = GAME_MASTER.game_board.y.min; c < GAME_MASTER.game_board.y.max; c += GAME_MASTER.game_board.grid_size){
      var spawnTypeFactor = Math.random();
      var entity;
      if(spawnTypeFactor < GAME_MASTER.entity_spawn_rate){
        var entityTypeFactor = Math.random();
        var entityTypes = GAME_MASTER.entities;
        var entityIndex = 0;
        var entityRateSum = entityTypes[entityIndex].spawn_rate;
        while(entityRateSum < entityTypeFactor){
          entityIndex++;
          entityRateSum += entityTypes[entityIndex].spawn_rate;
        }
        entity = new Entity(r, c, entityTypes[entityIndex]);
      } else {
        entity = undefined;
      }

      this.entities[currentR].push(entity);
      currentC++;
    }
    currentR++;
    currentC = 0;
  }


  this.draw = function(ctx) {
    ctx.fillStyle = 'black';
    var x = GAME_MASTER.game_board.x;
    var y = GAME_MASTER.game_board.y;
    ctx.fillRect(x.min, y.min, x.max - x.min, y.max - y.min);
    this.entities.map(function(row) {
      row.map(function(entity){
        if(entity != undefined){
          entity.draw(ctx);
        }
      });
    });
  };
};