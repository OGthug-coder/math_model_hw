const CANVAS = document.querySelector("#canvas");
const CTX = CANVAS.getContext("2d");
const PARTICLE_RADIUS = 1;
const PARTICLE_COLOR = "#FF0000";
const DEFAULT_COLOR = "#000000";
const SPRING_COLOR = DEFAULT_COLOR; 
const CENTER_MASS_COLOR = "#0000FF";
const VECTOR_COLOR = "#00FF00";
const WALL_COLOR = "#FF0000";
const DOT_RADIUS = 1;
const WIDTH = 700;
const HEIGHT = 700;
const dt = 0.01;

const NUMBER_OF_PARTICLES = 200;
const BALL_RADIUS = 100;
const PARTICLE_MASS = 1;
const SPRING_ELASTICITY = 10;
const PRESSURE_PARAMETER = 100;
const START_X = WIDTH / 2;
const START_Y = HEIGHT / 4;
const BALL_VELOCITY_X = -10;
const BALL_VELOCITY_Y = 5;
const WALL_X = 30;
const WALL_Y = 30;
const WALL_WIDTH = 10;
const WALL_HEIGHT = WIDTH - WALL_Y * 2;

const EPSILON = 1;
const SIGMA = 1;

let _max_vector_length = 0;

CANVAS.width = WIDTH;
CANVAS.height = HEIGHT;

function drawDot(ctx, dot, dot_color){
    let x = dot[0];
    let y = dot[1];

    ctx.fillStyle = dot_color;
    ctx.beginPath();
    ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = DEFAULT_COLOR;
}

function drawLine(ctx, x_0, y_0, x_1, y_1, color){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x_0, y_0);
    ctx.lineTo(x_1, y_1);
    ctx.stroke();
    ctx.strokeStyle = DEFAULT_COLOR;
}

function clearCanvas(ctx){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

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
    dt
);

const wall = new Wall(WALL_X, WALL_Y, WALL_WIDTH, WALL_HEIGHT, WALL_COLOR);

ball.init(WIDTH, HEIGHT);

let particle = ball.particles[0];
// particle.x += 10;
// particle.y -= 10;

function main(){
    clearCanvas(CTX);
    wall.draw(CTX);
    ball.draw(CTX);
    ball.recalculatePositions(CTX, WIDTH, HEIGHT, wall);
}

setInterval(main, 1);