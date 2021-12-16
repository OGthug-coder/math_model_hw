import {DEFAULT_COLOR, DOT_RADIUS, HEIGHT, WIDTH} from "./constants.js";

export function drawDot(ctx, dot, dot_color){
    let x = dot[0];
    let y = dot[1];

    ctx.fillStyle = dot_color;
    ctx.beginPath();
    ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = DEFAULT_COLOR;
}

export function drawLine(ctx, x_0, y_0, x_1, y_1, color){
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x_0, y_0);
    ctx.lineTo(x_1, y_1);
    ctx.stroke();
    ctx.strokeStyle = DEFAULT_COLOR;
}

export function clearCanvas(ctx){
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}