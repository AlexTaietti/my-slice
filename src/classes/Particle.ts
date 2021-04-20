import { Vec2D } from "../@types";
import { randomInRange } from "../helpers/utils";

export class Particle {

   position: Vec2D;
   maxLife = 50;
   velocity: Vec2D = { x: Math.random() * randomInRange(-2, 2), y: Math.random() * randomInRange(-2, 2) };
   life = Math.random() * this.maxLife;

   constructor(position: Vec2D) { this.position = position; }

   reset(position: Vec2D) {
      this.velocity = { x: Math.random() * randomInRange(-2, 2), y: Math.random() * randomInRange(-2, 2) };;
      this.position = position;
      this.life = Math.random() * this.maxLife;
   }

   update() {

      if (this.life > 0) {

         this.position.x += this.velocity.x;
         this.position.y += this.velocity.y;
         this.life -= 0.5;
         return true;

      } else { return false }

   }

   draw(context: CanvasRenderingContext2D) {

      context.fillRect(this.position.x, this.position.y, 1, 1);

   }

}