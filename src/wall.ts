import {DEFAULT_COLOR} from "./constants.js";

export class Wall {

    private readonly _x: number;
    private readonly _y: number;
    private readonly _width: number;
    private readonly _height: number;
    private readonly _color: string;

    constructor(x: number, y: number, width: number, height: number, color: string){
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this._color = color;
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = this._color;
        ctx.fillRect(this._x, this._y, this._width, this._height);
        ctx.fillStyle = DEFAULT_COLOR;
    }
    
    distanceToRightEdge(point){
        return point.x - this._x - this._width;
    }
}