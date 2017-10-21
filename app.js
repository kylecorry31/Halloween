var pumpkinPatch;

function main() {
  var game = new Game(init, draw);
  game.start();
}


function init() {
  pumpkinPatch = new PumpkinPatch();
}

function draw() {
  pumpkinPatch.draw(ctx);
}

main();
