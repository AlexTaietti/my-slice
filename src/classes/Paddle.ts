import { Vec2D } from "../@types";

export class Paddle {

   private readonly color = 'white';

   public readonly position: Vec2D;

   public height: number;
   public width: number;
   public score: number = 0;

   constructor(position: Vec2D, width: number, height: number) {

      this.position = position;
      this.width = width;
      this.height = height;

   }

   public scorePoint() { this.score++; }

   public setPosition(position: Vec2D) {
      this.position.x = position.x;
      this.position.y = position.y;
   }

   public setSize(width: number, height: number) {
      this.width = width;
      this.height = height;
   }

   public draw(context: CanvasRenderingContext2D) {
      context.save();
      context.fillStyle = this.color;
      context.translate(this.position.x, this.position.y);
      context.fillRect(0, 0, this.width, this.height);
      context.restore();
   }

}