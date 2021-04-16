import { Vec2D } from '../@types';
import { Paddle } from './Paddle';

export class Player extends Paddle {

   targetPosition: number;

   constructor(position: Vec2D, width: number, height: number) {

      //super construct a paddle
      super(position, width, height);

      this.targetPosition = position.y;

   }

   moveTarget(value: number) { this.targetPosition += value; }

   move() { this.position.y += (this.targetPosition - this.position.y) * 0.25; }

}