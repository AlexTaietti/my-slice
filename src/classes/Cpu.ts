import { Vec2D } from '../@types';
import { Ball } from './Ball';
import { Paddle } from './Paddle';

export class Cpu extends Paddle {

   constructor(position: Vec2D, width: number, height: number) {

      //super construct a paddle
      super(position, width, height);

   }

   move(target: Ball, worldEdge: number) {

      let adjustedTarget = target.position.y - this.height / 2 + target.side / 2; //this way the cpu aims at hitting the ball smack in the middle

      if (adjustedTarget <= 0) { adjustedTarget = 0; }

      if (adjustedTarget + this.height >= worldEdge) { adjustedTarget = worldEdge - this.height; }

      this.position.y += (adjustedTarget - this.position.y) * 0.17;

   }

}