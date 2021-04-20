import { Vec2D } from '../@types';
import { Ball } from './Ball';
import { Paddle } from './Paddle';

export class Cpu extends Paddle {

   private readonly minSmoothing = .128;
   private readonly maxSmoothing = .14;

   private smoothingFactor: number;

   constructor(position: Vec2D, width: number, height: number) {

      //super construct a paddle
      super(position, width, height);

      this.smoothingFactor = window.innerWidth < 1400 ? this.maxSmoothing : this.minSmoothing;

   }

   public resetSmoothingFactor(courtWidth: number) { this.smoothingFactor = courtWidth < 1300 ? this.maxSmoothing : this.minSmoothing; }

   public move(target: Ball, worldEdge: number) {

      let adjustedTarget = target.position.y - this.height / 2 + target.side / 2; //this way the cpu aims at hitting the ball smack in the middle

      if (adjustedTarget <= 0) { adjustedTarget = 0; }

      if (adjustedTarget + this.height >= worldEdge) { adjustedTarget = worldEdge - this.height; }

      this.position.y += (adjustedTarget - this.position.y) * this.smoothingFactor;

   }

}