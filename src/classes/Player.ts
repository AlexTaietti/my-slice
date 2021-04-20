import { Vec2D } from '../@types';
import { Paddle } from './Paddle';

export class Player extends Paddle {

   public targetPosition: number;

   constructor(position: Vec2D, width: number, height: number) {

      //super construct a paddle
      super(position, width, height, 'You Win!');

      this.targetPosition = position.y;

   }

   public moveTarget(value: number) { this.targetPosition += value; }

   public move() { this.position.y += (this.targetPosition - this.position.y) * 0.25; }

}