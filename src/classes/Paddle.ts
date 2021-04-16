import { Vec2D } from "../@types";

export class Paddle {

   position: Vec2D;
   margin: number = 10;
   height: number;
   width: number;
   color: string;
   score: number = 0;

   constructor(position: Vec2D, width: number, height: number, color: string = 'white') {

      this.position = position;
      this.width = width;
      this.height = height;
      this.color = color;

   }

   scorePoint() { this.score++; }

   setPosition(position: Vec2D) {
      this.position.x = position.x;
      this.position.y = position.y;
   }

   setSize(width: number, height: number) {
      this.width = width;
      this.height = height;
   }

   draw(context: CanvasRenderingContext2D) {

      context.save();

      context.fillStyle = this.color;

      context.translate(this.position.x, this.position.y);

      context.fillRect(0, 0, this.width, this.height);

      context.restore();

   }

}