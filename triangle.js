class Triangle
{
    constructor(a, b, c){
        this.a = a;
        this.b = b;
        this.c = c;
    }

    calculateVolume(){
        let AB = (new Edge(this.a, this.b)).length();
        let BC = (new Edge(this.b, this.c)).length();
        let AC = (new Edge(this.a, this.c)).length();
        let perimeter = AB + BC + AC;
        let p = perimeter / 2;
        let S = Math.pow(p * (p - AB) * (p - BC) * (p - AC), 0.5);
        return S;
    }

    draw(ctx){
        let randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        ctx.fillStyle = randomColor;
        ctx.beginPath();
        ctx.moveTo(this.a.x, this.a.y);
        ctx.lineTo(this.b.x, this.b.y);
        ctx.lineTo(this.c.x, this.c.y);
        ctx.fill();

        ctx.fillStyle = DEFAULT_COLOR;
    }
}