import { Vec2D } from '../@types';
import { Paddle } from './Paddle';

export class Player extends Paddle {

   targetPosition: Vec2D;

   constructor(position: Vec2D, width: number, height: number) {

      //super construct a paddle
      super(position, width, height);

      this.targetPosition = { ...position };

   }

   move() {
      this.position.y += (this.targetPosition.y - this.position.y) * 0.25;
   }

}