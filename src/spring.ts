import {drawLine} from "./render.js";
import {Vector} from "./vector.js";
import {SPRING_COLOR} from "./constants.js";
import {Particle} from "./particle.js";
import {Pair} from "./pair";

export class Spring{

    private readonly c: number;
    readonly left_particle: Particle;
    readonly right_particle: Particle;

    constructor(c: number, left_particle: Particle, right_particle: Particle){
        this.c = c;
        this.left_particle = left_particle;
        this.right_particle = right_particle;
    }

    calculateForce(pressure : number) : void {
        let distanceTuple: Pair<number> = this.distanceBetweenParticles();
        let distance_x = distanceTuple.First();
        let distance_y = distanceTuple.Second();
        let F_x = this.c * distance_x;
        let F_y = this.c * distance_y;
        
        let left_spring_particle_vector = new Vector(-F_x, -F_y);
        let right_spring_particle_vector = new Vector(F_x, F_y);

        let spring_vector = new Vector(
            this.left_particle.x - this.right_particle.x,
            this.left_particle.y - this.right_particle.y);
        spring_vector = spring_vector.multiplyVector(1 / spring_vector.length());

        let pressure_vector = spring_vector.rotateVector(Math.PI / 2);
        pressure_vector = pressure_vector.multiplyVector(pressure);

        this.left_particle.left_spring_force_vector = left_spring_particle_vector;
        this.right_particle.right_spring_force_vector = right_spring_particle_vector;

        this.left_particle.left_spring_pressure_force_vector = pressure_vector;
        this.right_particle.right_spring_pressure_force_vector = pressure_vector;
    }

    draw(ctx : CanvasRenderingContext2D, max_vector_length: number) : void {

        drawLine(
            ctx,
            this.left_particle.x, 
            this.left_particle.y, 
            this.right_particle.x, 
            this.right_particle.y, 
            SPRING_COLOR
            );

        this.left_particle.draw(ctx, max_vector_length);
        this.right_particle.draw(ctx, max_vector_length);
    }

    private distanceBetweenParticles() : Pair<number> {
        let distance_x = this.left_particle.x - this.right_particle.x;
        let distance_y = this.left_particle.y - this.right_particle.y;
        return new Pair<number>(distance_x, distance_y);
    }
}