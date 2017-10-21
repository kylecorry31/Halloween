var Game = function(initFunction, drawFunction) {
  this.start = function() {
    initFunction();
    var loop = function() {
      drawFunction();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
};