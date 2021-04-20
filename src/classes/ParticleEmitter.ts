import { Vec2D } from "../@types";
import { Particle } from "./Particle";

export class ParticleEmitter {

   private particles: Array<Particle>;
   private position: Vec2D;
   private readonly color = '#ff006f';
   private readonly particleNumber: number;

   constructor(particleNumber: number, position: Vec2D) {

      this.position = position;
      this.particles = [];
      this.particleNumber = particleNumber;

   }

   public setPosition(position: Vec2D) {
      this.position.x = position.x;
      this.position.y = position.y;
   }

   public updatePosition(newPosition: Vec2D) { this.position = newPosition; }

   public update() {

      if (this.particles.length < this.particleNumber) { this.particles.push(new Particle({ ...this.position })); }

      if (this.particles.length) {

         for (let i = 0; i < this.particles.length; i++) {

            const particlePulse = this.particles[i].update();

            if (!particlePulse) { this.particles[i].reset({ ...this.position }); }

         }

      }

   }

   public draw(context: CanvasRenderingContext2D) {

      context.save();
      context.fillStyle = this.color;

      for (let i = 0; i < this.particles.length; i++) { this.particles[i].draw(context); }

      context.restore();

   }

}