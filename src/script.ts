import {Wall} from "./wall.js";
import {Ball} from "./ball.js";
import {clearCanvas} from "./render.js";
import {HEIGHT, WALL_COLOR, WIDTH} from "./constants.js";

const CANVAS: HTMLCanvasElement = document.querySelector("#canvas-main");
const CTX = CANVAS.getContext("2d");

const NUMBER_OF_PARTICLES = 100;
const BALL_RADIUS = 200;
const PARTICLE_MASS = 1;
const SPRING_ELASTICITY = 10;
const DT = Math.pow((PARTICLE_MASS / SPRING_ELASTICITY), 0.5) / (21 * 2 * Math.PI);
const PRESSURE_PARAMETER = 1000;
const START_X = 300;
const START_Y = 300;
const BALL_VELOCITY_X = -10;
const BALL_VELOCITY_Y = 5;
const WALL_X = 30;
const WALL_Y = 30;
const WALL_WIDTH = 10;
const WALL_HEIGHT = WIDTH - WALL_Y * 2;

CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;

const ball = new Ball(
    NUMBER_OF_PARTICLES,
    BALL_RADIUS, 
    PARTICLE_MASS, 
    SPRING_ELASTICITY, 
    PRESSURE_PARAMETER, 
    START_X, 
    START_Y, 
    BALL_VELOCITY_X, 
    BALL_VELOCITY_Y,
    DT
);

const wall = new Wall(WALL_X, WALL_Y, WALL_WIDTH, WALL_HEIGHT, WALL_COLOR);

ball.init();

function main(){
    clearCanvas(CTX);
    wall.draw(CTX);
    ball.draw(CTX);
    ball.recalculatePositions(CTX, WIDTH, HEIGHT, wall);
}

setInterval(main, 1);