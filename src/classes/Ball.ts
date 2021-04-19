import { Vec2D } from "../@types";
import { Paddle } from "./Paddle";
import { mapToRange } from '../helpers/utils';

export class Ball {

   position: Vec2D;
   velocity: Vec2D = { x: 0, y: 0 };
   angle: number = 0;
   speed: number = window.innerWidth / 100;
   side: number;
   color: string;
   impactCorrection = 0.6;

   constructor(position: Vec2D, side: number, color: string = 'white') {

      this.position = position;
      this.side = side;
      this.color = color;

      this.velocity = {
         x: this.speed * Math.cos(this.angle),
         y: this.speed * Math.sin(this.angle)
      };

   }

   checkCollision(paddle: Paddle) {

      if (this.position.x + this.side >= paddle.position.x
         && paddle.position.x + paddle.width >= this.position.x
         && this.position.y + this.side >= paddle.position.y
         && paddle.position.y + paddle.height >= this.position.y) return true;

      return false;

   }

   setDirection(angle: number) {

      this.angle = angle;

      this.velocity.x = Math.cos(this.angle) * this.speed;
      this.velocity.y = Math.sin(this.angle) * this.speed;

   }

   setSpeed(value: number) {

      this.speed = value;

      this.velocity.x = Math.cos(this.angle) * this.speed;
      this.velocity.y = Math.sin(this.angle) * this.speed;

   }

   setPosition(position: Vec2D) {
      this.position.x = position.x;
      this.position.y = position.y;
   }

   update(player: Paddle, cpu: Paddle) {

      if (this.checkCollision(player)) {

         const relativeImpactY = (this.position.y + this.side / 2) - player.position.y;

         const newAngle = mapToRange(relativeImpactY, 0, player.height, (-Math.PI) / 2 + this.impactCorrection, Math.PI / 2 - this.impactCorrection);

         this.setDirection(newAngle);

         console.log('Awesome hit!');

      }

      if (this.checkCollision(cpu)) {

         const relativeImpactY = (this.position.y + this.side / 2) - cpu.position.y;

         const newAngle = mapToRange(relativeImpactY, 0, player.height, Math.PI * 1.5 - this.impactCorrection, Math.PI / 2 + this.impactCorrection);

         this.setDirection(newAngle);

         console.log('Booooo!');

      }

   }

   reset(boundsX: number, boundsY: number) {

      const courtCenter = {
         x: boundsX / 2,
         y: boundsY / 2
      };

      this.setPosition({ x: courtCenter.x - this.side / 2, y: courtCenter.y - this.side / 2 });

   }


   move(boundsX: number, boundsY: number, player: Paddle, cpu: Paddle) {

      if (this.position.x <= 0) {
         cpu.scorePoint();
         this.setDirection(Math.PI);
         this.reset(boundsX, boundsY);
         return;
      }

      if (this.position.x + this.side >= boundsX) {
         player.scorePoint();
         this.setDirection(0);
         this.reset(boundsX, boundsY);
         return;
      }

      if (this.position.y + this.side >= boundsY || this.position.y <= 0) { this.velocity.y = -this.velocity.y; }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

   }

   draw(context: CanvasRenderingContext2D) {

      context.save();

      context.fillStyle = this.color;

      context.translate(this.position.x, this.position.y);
      context.fillRect(0, 0, this.side, this.side);

      context.restore();

   }

}