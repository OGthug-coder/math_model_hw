import {Particle} from "./particle.js";
import {Spring} from "./spring.js";
import {EPSILON, HEIGHT, SIGMA, WIDTH} from "./constants.js";
import {Vector} from "./vector.js";
import {Point} from "./point.js";
import {Triangle} from "./triangle.js";
import {Pair} from "./pair.js";
import {Wall} from "./wall";

export class Ball {

    private readonly number_of_particles: number;
    private readonly r: number;
    private readonly particle_mass: number;
    private readonly spring_c: number;
    private readonly k: number;
    private readonly x: number;
    private readonly y: number;
    private readonly v_x: number;
    private readonly v_y: number;
    private readonly particles: Particle[];
    private readonly springs: Spring[];
    private readonly dt: number;
    private V_0: number;
    private V: number;

    constructor(
            number_of_particles: number,
            r: number,
            particle_mass: number,
            spring_c: number,
            k: number,
            x: number,
            y: number,
            v_x: number,
            v_y: number,
            dt: number
    ){
        this.number_of_particles = number_of_particles;
        this.r = r;
        this.particle_mass = particle_mass;
        this.spring_c = spring_c;
        this.k = k;
        this.x = x;
        this.y = y;
        this.v_x = v_x;
        this.v_y = v_y;
        this.particles = []
        this.springs = []
        this.dt = dt;
        this.V_0 = 0;
        this.V = 0;
    }

    init() : void {

        for (let phi: number = 0; phi < 2 * Math.PI; phi += 2 * Math.PI / this.number_of_particles){
            let coordinates = this.radiansToCoordinates(phi);
            let particle = new Particle(
                this.particle_mass,
                coordinates.GetX() + this.x,
                coordinates.GetY() + this.y,
                this.v_x,
                this.v_y
            );
            this.particles.push(particle);
        }

        for (let i = 0; i < this.number_of_particles - 1; i++){
            let left_particle = this.particles[i];
            let right_particle = this.particles[i + 1];
            let spring = new Spring(this.spring_c, left_particle, right_particle);
            this.springs.push(spring);
        }

        {
            let first_particle = this.particles[0];
            let last_particle = this.particles[this.number_of_particles - 1];
            let last_spring = new Spring(this.spring_c, last_particle, first_particle);
            this.springs.push(last_spring);
        }

        this.V_0 = this.calculateVolume(WIDTH, HEIGHT);
    }

    recalculatePositions(ctx: CanvasRenderingContext2D,
                         width: number,
                         height: number,
                         wall: Wall) : void {

        this.V = this.calculateVolume(width, height);

        for (let i = 0; i < this.springs.length; i++){
            let spring = this.springs[i];
            let pressure = this.calculatePressure();
            spring.calculateForce(pressure);
        }

        for (let i = 0; i < this.number_of_particles; i++){
            let particle = this.particles[i];
            particle.reaction_force_vector = this.calculateReactionForce(particle, wall);
            particle.recalculatePositions(this.dt);
        }
    }

    draw(ctx : CanvasRenderingContext2D) : void {
        const min_max_pair : Pair<number> = this.findMinMaxForceVectorsLength();
        const max_vector_length : number = min_max_pair.Second();

        for (let i = 0; i < this.springs.length; i++){
            let spring = this.springs[i];
            spring.draw(ctx, max_vector_length);
        }
    }

    calculateReactionForce(particle: Particle, wall: Wall) : Vector {
        let r = wall.distanceToRightEdge(particle);
        return new Vector(Ball.potential(r), 0);
    }

    static potential(r: number) : number {
        let fraction = SIGMA / r;
        return 4 * EPSILON * ((fraction) ** 12 - (fraction) ** 6);
    }

    calculatePressure() : number {
        return this.k * (this.V_0 / this.V - 1);
    }

    private radiansToCoordinates(phi : number) : Point {
        let x = this.r * Math.cos(phi);
        let y = this.r * Math.sin(phi);

        return new Point(x, y);
    }

    calculateVolume(width: number, height: number) : number {
        let center_point : Point = this.findPointInTheBall(width, height);
        let V = 0;

        for (let i = 0; i < this.springs.length; i++){
            let spring : Spring = this.springs[i];

            let left : Particle = spring.left_particle;
            let left_point : Point = new Point(left.x, left.y);

            let right : Particle = spring.right_particle;
            let right_point : Point = new Point(right.x, right.y);

            let triangle : Triangle = new Triangle(center_point, left_point, right_point);
            V += triangle.calculateVolume();
        }
        
        return V;
    }

    randomPoint(width, height) : Point {
        let x = Math.random() * width;
        let y = Math.random() * height;
        return new Point(x, y);
    }

    findPointInTheBall(width: number, height: number) : Point {
        let result = false;
        let point = null;
        while (!result){
            point = this.randomPoint(width, height);
            result = this.isPointInTheBall(point);
        }

        return point;
    }

    isPointInTheBall(point: Point) : boolean{
        let result = false;
        let size = this.number_of_particles;
        let p = this.particles;
        let j = size - 1;
        for (let i = 0; i < size; i++){
            if ((p[i].y < point.y && p[j].y >= point.y || p[j].y < point.y && p[i].y >= point.y) &&
                (p[i].x + (point.y - p[i].y) / (p[j].y - p[i].y) * (p[j].x - p[i].x) < point.x)){
                    result = !result;
                }
            j = i;
        }

        return result;
    }

    findMinMaxForceVectorsLength() : Pair<number> {
        let max = -1;
        let min = 1e10;
        this.particles.forEach(x => {
            if (x.total_force_vector != null){
                let length = x.total_force_vector.length();

                if (length > max){
                    max = length;
                }

                if (length < min){
                    min = length;
                }
            }
        })

        return new Pair<number>(min, max);
    }
}