import { Vec2D } from '../@types';
import { Paddle } from './Paddle';

export class Cpu extends Paddle {

   constructor(position: Vec2D, width: number, height: number) {

      //super construct a paddle
      super(position, width, height);

   }

   move(target: Vec2D) {

      this.position.y += (target.y - this.position.y) * 0.1;

   }

}