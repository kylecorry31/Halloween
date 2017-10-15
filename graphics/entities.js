  var unlitImage = new Image();
  unlitImage.src = "sprites/jackolantern-off.png";

  var litImage = new Image();
  litImage.src = "sprites/jackolantern-on.png";

var Star = function(x, y, r) {
  return {
    x: x,
    y: y,
    r: r,
    currentImage: unlitImage,
    brightness: 255,
    draw: function(ctx) {
      // ctx.fillStyle = "rgb(" + this.brightness + ", " + this.brightness + ", " + this.brightness + ")";
      // ctx.font = this.r + "px Arial";
      // ctx.fillText(".", this.x, this.y);
      ctx.drawImage(this.currentImage, this.x, this.y, r, r);
    },
    setBrightness: function(value) {
      this.brightness = value;
      if (this.brightness >= 255 / 2.0) {
        this.currentImage = litImage;
      } else {
        this.currentImage = unlitImage;
      }
    }
  };
};

var Space = function(xRange, yRange, stars) {
  this.stars = stars;
  this.draw = function(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(xRange.min, yRange.min, xRange.max, yRange.max);
    this.stars.map(function(star) {
      star.draw(ctx);
    });
  };
};

var StarGenerator = function(xRange, yRange, rRange) {
  return {
    create: function() {
      return new Star(toRange(Math.random(), 0, 1, xRange.min, xRange.max),
        toRange(Math.random(), 0, 1, yRange.min, yRange.max),
        toRange(Math.random(), 0, 1, rRange.min, rRange.max));
    }
  };
};
