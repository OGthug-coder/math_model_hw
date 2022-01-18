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

let ball = null;

const wall = new Wall(WALL_X, WALL_Y, WALL_WIDTH, WALL_HEIGHT, WALL_COLOR);

function main(){
    ball.init();
    clearCanvas(CTX);
    wall.draw(CTX);
    ball.draw(CTX);
    ball.recalculatePositions(CTX, WIDTH, HEIGHT, wall);
}

let timerId = null;

START_BUTTON.addEventListener("click", () => {
    console.log("alo")
    if (timerId == null){
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
        timerId = setInterval(main, 1);
    }
});

PAUSE_BUTTON.addEventListener("click", () => {
   if (timerId != null){
       clearInterval(timerId);
       timerId = null;
   }
});

STOP_BUTTON.addEventListener("click", () => {
   if (timerId != null){
       clearInterval(timerId);
   }
});