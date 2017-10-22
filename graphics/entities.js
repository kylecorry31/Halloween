var BouncingEntity = function(x, y, entity_info) {
    this.entity = new Entity(x, y, entity_info);
    this.x_speed = 0;
    this.y_speed = 0;

    this.draw = function(ctx) {
        this.entity.x += this.x_speed;
        this.entity.y += this.y_speed;
        this._bounce();
        this.entity.draw(ctx);
    };

    this.setSpecialActivation = function(activationFactor) {
        var motionX = toRange(Math.random(), 0, 1, 0.2, 1) * (Math.random() > 0.5 ? 1 : -1) * toRange(activationFactor, 0, 1, -1, 1) * this.entity.size;
        var motionY = toRange(Math.random(), 0, 1, 0.2, 1) * (Math.random() > 0.5 ? 1 : -1) * toRange(activationFactor, 0, 1, -1, 1) * this.entity.size;

        if(motionX < 0){
          motionX *= entity_info.x_left_movement_modifier;
        } else {
          motionX *= entity_info.x_right_movement_modifier;
        }

        if(motionY < 0){
          motionY *= entity_info.y_up_movement_modifier;
        } else {
          motionY *= entity_info.y_down_movement_modifier;
        }

        this.x_speed += (motionX - this.x_speed) / entity_info.movement_smoothing;
        this.y_speed += (motionY - this.y_speed) / entity_info.movement_smoothing;
        this.entity.setSpecialActivation(activationFactor);
    };

    this._bounce = function() {
        var x = GAME_MASTER.game_board.x;
        var y = GAME_MASTER.game_board.y;
        if (this.entity.x < x.min) {
            this.entity.x = x.min;
            this.x_speed *= -1;
        } else if (this.entity.x > x.max) {
            this.entity.x = x.max;
            this.x_speed *= -1;
        }

        if (this.entity.y < y.min) {
            this.entity.y = y.min;
            this.y_speed *= -1;
        } else if (this.entity.y > y.max) {
            this.entity.y = y.max;
            this.y_speed *= -1;
        }
    }

}

var WrappingEntity = function(x, y, entity_info) {
    this.entity = new Entity(x, y, entity_info);
    this.x_speed = 0;
    this.y_speed = 0;

    this.draw = function(ctx) {
        this.entity.x += this.x_speed;
        this.entity.y += this.y_speed;
        this._wrap();
        this.entity.draw(ctx);
    };

    this.setSpecialActivation = function(activationFactor) {
        var motionX = toRange(Math.random(), 0, 1, 0.2, 1) * (Math.random() > 0.5 ? 1 : -1) * toRange(activationFactor, 0, 1, -1, 1) * this.entity.size;
        var motionY = toRange(Math.random(), 0, 1, 0.2, 1) * (Math.random() > 0.5 ? 1 : -1) * toRange(activationFactor, 0, 1, -1, 1) * this.entity.size;

        if(motionX < 0){
          motionX *= entity_info.x_left_movement_modifier;
        } else {
          motionX *= entity_info.x_right_movement_modifier;
        }

        if(motionY < 0){
          motionY *= entity_info.y_up_movement_modifier;
        } else {
          motionY *= entity_info.y_down_movement_modifier;
        }

        this.x_speed += (motionX - this.x_speed) / entity_info.movement_smoothing;
        this.y_speed += (motionY - this.y_speed) / entity_info.movement_smoothing;
        this.entity.setSpecialActivation(activationFactor);
    };

    this._wrap = function() {
        var x = GAME_MASTER.game_board.x;
        var y = GAME_MASTER.game_board.y;
        if (this.entity.x < x.min) {
            this.entity.x = x.max;
        } else if (this.entity.x > x.max) {
            this.entity.x = x.min;
        }

        if (this.entity.y < y.min) {
            this.entity.y = y.max;
        } else if (this.entity.y > y.max) {
            this.entity.y = y.min;
        }
    }

}

var Entity = function(x, y, entity_info) {
    var normalSprite = new Image();
    normalSprite.src = entity_info.normal_sprite;

    var specialSprite = new Image();
    specialSprite.src = entity_info.special_sprite;

    this.currentImage = normalSprite;
    this.size = entity_info.size + 2 * (Math.random() - 0.5) * entity_info.size_std_dev;

    this.x = x;
    this.y = y;

    // compute center
    var gridSize = GAME_MASTER.game_board.grid_size;
    var sizeDiff = gridSize - this.size;
    this.x += sizeDiff / 2.0;
    this.y += sizeDiff / 2.0;



    this.draw = function(ctx) {
        ctx.drawImage(this.currentImage, this.x, this.y, this.size, this.size);
    };

    this.setSpecialActivation = function(activationFactor) {
        if ((1 - activationFactor) < entity_info.special_activation_rate) {
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
    for (var r = GAME_MASTER.game_board.x.min; r < GAME_MASTER.game_board.x.max; r += GAME_MASTER.game_board.grid_size) {
        this.entities.push([]);
        for (var c = GAME_MASTER.game_board.y.min; c < GAME_MASTER.game_board.y.max; c += GAME_MASTER.game_board.grid_size) {
            var spawnTypeFactor = Math.random();
            var entity;
            if (spawnTypeFactor < GAME_MASTER.entity_spawn_rate) {
                var entityTypeFactor = Math.random();
                var entityTypes = GAME_MASTER.entities;
                var entityIndex = 0;
                var entityRateSum = entityTypes[entityIndex].spawn_rate;
                while (entityRateSum < entityTypeFactor) {
                    entityIndex++;
                    entityRateSum += entityTypes[entityIndex].spawn_rate;
                }
                var movement_type = entityTypes[entityIndex].movement_type;

                if (movement_type == MOVEMENT_STATIONARY) {
                    entity = new Entity(r, c, entityTypes[entityIndex]);
                } else if (movement_type == MOVEMENT_BOUNCE) {
                    entity = new BouncingEntity(r, c, entityTypes[entityIndex]);
                } else if (movement_type == MOVEMENT_WRAP) {
                    entity = new WrappingEntity(r, c, entityTypes[entityIndex]);
                }
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
        ctx.fillStyle = GAME_MASTER.game_board.background_color;
        var x = GAME_MASTER.game_board.x;
        var y = GAME_MASTER.game_board.y;
        ctx.fillRect(x.min, y.min, x.max - x.min, y.max - y.min);

        if (GAME_MASTER.background_text != undefined) {
            ctx.fillStyle = GAME_MASTER.background_text.color;
            ctx.textAlign = "center";
            ctx.font = GAME_MASTER.background_text.font;
            ctx.fillText(GAME_MASTER.background_text.text, (x.max - x.min) / 2.0, (y.max - y.min) / 2.0);
        }

        this.entities.map(function(row) {
            row.map(function(entity) {
                if (entity != undefined) {
                    entity.draw(ctx);
                }
            });
        });
    };
};