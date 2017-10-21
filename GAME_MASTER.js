var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var WIDTH = document.body.offsetWidth;
var HEIGHT = document.body.offsetHeight;
canvas.height = HEIGHT;
canvas.width = WIDTH;

var extraFOV = 5;


var GAME_MASTER = {
    game_board: {
        x: new ValueRange(-extraFOV, WIDTH + extraFOV),
        y: new ValueRange(-extraFOV, HEIGHT + extraFOV),
        grid_size: 32
    },
    entity_spawn_rate: 0.5,
    song: "audio/ghostbusters.mp3",
    entities: [{
        name: "PUMPKIN",
        spawn_rate: 0.25,
        size: 20,
        size_std_dev: 8,
        special_activation_rate: 0,
        normal_sprite: "sprites/pumpkin.png",
        special_sprite: "sprites/pumpkin.png"
    }, {
        name: "JACK O'LANTERN",
        spawn_rate: 0.6,
        size: 20,
        size_std_dev: 8,
        special_activation_rate: 0.5,
        normal_sprite: "sprites/jackolantern-off.png",
        special_sprite: "sprites/jackolantern-on.png"
    }, {
        name: "GHOST",
        spawn_rate: 0.15,
        size: 22,
        size_std_dev: 4,
        special_activation_rate: 0.4,
        normal_sprite: "sprites/gravestone.png",
        special_sprite: "sprites/ghost.png"
    }]
};