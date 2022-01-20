import {Point} from "./point";

export class Edge {

    private readonly a: Point;
    private readonly b: Point;

    constructor(a: Point, b: Point){
        this.a = a;
        this.b = b;
    }

    length() : number {
        let dx = Math.pow((this.a.x - this.b.x), 2);
        let dy = Math.pow((this.a.y - this.b.y), 2);
        return Math.pow(dx + dy, 0.5);
    }
}