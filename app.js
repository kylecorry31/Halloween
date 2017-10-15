var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var WIDTH = document.body.offsetWidth;
var HEIGHT = document.body.offsetHeight;
canvas.height = HEIGHT;
canvas.width = WIDTH;
// Audio
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audio = new AudioContext();
var song;
var dataArray, analyser, bufferLength;

// The border pixels
var extraFOV = 5;

var stars, space, universe;
var SONGS = ["audio/ghostbusters.mp3"];
var SONG_INDEX = Math.floor(Math.random() * SONGS.length);
var SONG = SONGS[SONG_INDEX];

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

function main() {
  var game = new Game(init, draw);
  game.start();
}

function createStars(numStars) {
  var generator = new StarGenerator(new ValueRange(-extraFOV, WIDTH + extraFOV), new ValueRange(-extraFOV, HEIGHT + extraFOV), new ValueRange(15, 30));
  var starArray = [];
  for (var i = 0; i < numStars; i++) {
    starArray.push(generator.create());
  }
  return starArray;
}

function init() {
  stars = createStars(1024);
  space = new Space(new ValueRange(0, WIDTH), new ValueRange(0, HEIGHT), stars);
  song = new Audio(SONG, new NetworkManager());
  universe = new Universe(space, song);
}

function draw() {
  universe.draw(ctx);

}

main();
