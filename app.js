var scene;

function main() {
  var game = new Game(init, draw);
  game.start();
}


function init() {
  scene = new Scene();
}

function draw() {
  scene.draw(ctx);
}

main();
