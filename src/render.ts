import {DEFAULT_COLOR, HEIGHT, WIDTH} from "./constants.js";

export function drawLine(ctx : CanvasRenderingContext2D,
                         x_0 : number,
                         y_0 : number,
                         x_1 : number,
                         y_1 : number,
                         color: string) : void {
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(x_0, y_0);
    ctx.lineTo(x_1, y_1);
    ctx.stroke();
    ctx.strokeStyle = DEFAULT_COLOR;
}

export function clearCanvas(ctx : CanvasRenderingContext2D) : void {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}