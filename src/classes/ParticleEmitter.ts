import { Vec2D } from "../@types";
import { Particle } from "./Particle";

export class ParticleEmitter {

   particles: Array<Particle>;
   position: Vec2D;
   color = '#ff006f';
   particleNumber: number;

   constructor(particleNumber: number, position: Vec2D) {

      this.position = position;
      this.particles = [];
      this.particleNumber = particleNumber;

   }

   setPosition(position: Vec2D) {
      this.position.x = position.x;
      this.position.y = position.y;
   }

   updatePosition(newPosition: Vec2D) { this.position = newPosition; }

   update() {

      if (this.particles.length < this.particleNumber) { this.particles.push(new Particle({ ...this.position })); }

      if (this.particles.length) {

         for (let i = 0; i < this.particles.length; i++) {

            const particlePulse = this.particles[i].update();

            if (!particlePulse) { this.particles[i].reset({ ...this.position }); }

         }

      }

   }

   draw(context: CanvasRenderingContext2D) {

      context.save();

      context.fillStyle = this.color;

      for (let i = 0; i < this.particles.length; i++) { this.particles[i].draw(context); }

      context.restore();

   }

}