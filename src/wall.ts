import {DEFAULT_COLOR} from "./constants.js";

export class Wall {

    private readonly x: number;
    private readonly y: number;
    private readonly width: number;
    private readonly height: number;
    private readonly color: string;

    constructor(x: number, y: number, width: number, height: number, color: string){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = DEFAULT_COLOR;
    }
    
    distanceToRightEdge(point){
        return point.x - this.x - this.width;
    }
}