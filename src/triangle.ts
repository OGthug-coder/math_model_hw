import {Edge} from "./edge.js";
import {Point} from "./point";

export class Triangle
{
    private readonly a: Point;
    private readonly b: Point;
    private readonly c: Point;

    constructor(a: Point, b: Point, c: Point){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    calculateVolume() : number {
        let AB = (new Edge(this.a, this.b)).length();
        let BC = (new Edge(this.b, this.c)).length();
        let AC = (new Edge(this.a, this.c)).length();
        let perimeter = AB + BC + AC;
        let p = perimeter / 2;
        return Math.pow(p * (p - AB) * (p - BC) * (p - AC), 0.5);
    }
}