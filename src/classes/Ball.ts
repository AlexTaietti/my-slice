import { Vec2D } from "../@types";
import { Paddle } from "./Paddle";

export class Ball {

   position: Vec2D;
   velocity: Vec2D = { x: 0, y: 0 };
   side: number;
   color: string;

   constructor(position: Vec2D, side: number, color: string = 'white') {

      this.position = position;
      this.side = side;
      this.color = color;

      this.velocity = {
         x: Math.random() * 5,
         y: Math.random() * 5
      };

   }

   checkCollision(paddle: Paddle) {

      if (this.position.x + this.side >= paddle.position.x
         && paddle.position.x + paddle.width >= this.position.x
         && this.position.y + this.side >= paddle.position.y
         && paddle.position.y + paddle.height >= this.position.y) return true;

      return false;

   }

   setPosition(position: Vec2D) {
      this.position.x = position.x;
      this.position.y = position.y;
   }

   update(player: Paddle, cpu: Paddle) {

      if (this.checkCollision(player)) {
         this.velocity.x = -this.velocity.x;
         console.log('Awesome hit!');
      }

      if (this.checkCollision(cpu)) {
         this.velocity.x = -this.velocity.x;
         console.log('Booooo!');
      }

   }


   move(boundsX: number, boundsY: number, player: Paddle, cpu: Paddle) {

      if (this.position.x + this.side >= boundsX || this.position.x <= 0) { this.velocity.x = -this.velocity.x; }

      if (this.position.y + this.side >= boundsY || this.position.y <= 0) { this.velocity.y = -this.velocity.y; }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      if (this.position.x + this.side >= boundsX) player.scorePoint();
      if (this.position.x <= 0) cpu.scorePoint();

   }

   draw(context: CanvasRenderingContext2D) {

      context.save();

      context.fillStyle = this.color;

      context.translate(this.position.x, this.position.y);
      context.fillRect(0, 0, this.side, this.side);

      context.restore();

   }

}