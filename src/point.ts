export class Point {

    private readonly x: any;
    private readonly y: any;

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