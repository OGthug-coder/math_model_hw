import {Wall} from "./wall.js";
import {Ball} from "./ball.js";
import {clearCanvas} from "./render.js";
import {HEIGHT, WALL_COLOR, WIDTH} from "./constants.js";

const CANVAS: HTMLCanvasElement = document.querySelector("#canvas-main");
const CTX = CANVAS.getContext("2d");

const PRESSURE_INPUT: HTMLInputElement = document.querySelector("#pressure");
const ELASTICITY_INPUT: HTMLInputElement = document.querySelector("#elasticity");
const NUMBER_OF_PARTICLES_INPUT: HTMLInputElement = document.querySelector("#number_of_particles");
const PARTICLE_MASS_INPUT: HTMLInputElement = document.querySelector("#particle_mass");
const START_X_INPUT: HTMLInputElement = document.querySelector("#x_0");
const START_Y_INPUT: HTMLInputElement = document.querySelector("#y_0");
const START_V_X_INPUT: HTMLInputElement = document.querySelector("#v_x_0");
const START_V_Y_INPUT: HTMLInputElement = document.querySelector("#v_y_0");

const START_BUTTON: HTMLButtonElement = document.querySelector("#start");
const PAUSE_BUTTON: HTMLButtonElement = document.querySelector("#pause");
const STOP_BUTTON: HTMLButtonElement = document.querySelector("#stop");

let PRESSURE_PARAMETER: number = 1000;
let SPRING_ELASTICITY: number = 10;
let NUMBER_OF_PARTICLES: number = 100;
let PARTICLE_MASS: number = 1;
let START_X: number = 300;
let START_Y: number = 300;
let BALL_VELOCITY_X: number = -10;
let BALL_VELOCITY_Y: number = 5;

const BALL_RADIUS = 200;
const DT = Math.pow((PARTICLE_MASS / SPRING_ELASTICITY), 0.5) / (21 * 2 * Math.PI);
const WALL_X = 30;
const WALL_Y = 30;
const WALL_WIDTH = 10;
const WALL_HEIGHT = WIDTH - WALL_Y * 2;

CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;

let ball: Ball = null;

const wall = new Wall(WALL_X, WALL_Y, WALL_WIDTH, WALL_HEIGHT, WALL_COLOR);

function parseInputParameters(){
    PRESSURE_PARAMETER = Number(PRESSURE_INPUT.value);
    SPRING_ELASTICITY = Number(ELASTICITY_INPUT.value);
    NUMBER_OF_PARTICLES = Number(NUMBER_OF_PARTICLES_INPUT.value);
    PARTICLE_MASS = Number(PARTICLE_MASS_INPUT.value);
    START_X = Number(START_X_INPUT.value);
    START_Y = Number(START_Y_INPUT.value);
    BALL_VELOCITY_X = Number(START_V_X_INPUT.value);
    BALL_VELOCITY_Y = Number(START_V_Y_INPUT.value);
}

function main(){
    clearCanvas(CTX);
    wall.draw(CTX);
    ball.draw(CTX);
    ball.recalculatePositions(CTX, WIDTH, HEIGHT, wall);
}

let timerId = null;

START_BUTTON.addEventListener("click", () => {
    if (timerId == null){
        parseInputParameters();
        ball = new Ball(
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
        ball.init();
        timerId = setInterval(main, 1);
    } else {
        timerId = setInterval(main, 1);
    }
});

PAUSE_BUTTON.addEventListener("click", () => {
   if (timerId != null){
       clearInterval(timerId);
   }
});

STOP_BUTTON.addEventListener("click", () => {
   if (timerId != null){
       clearInterval(timerId);
       timerId = null;
       clearCanvas(CTX);
   }
});