export class Point {

    readonly x: any;
    readonly y: any;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    public GetX(){
        return this.x;
    }

    public GetY(){
        return this.y;
    }
}