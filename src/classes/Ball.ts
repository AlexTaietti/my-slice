import { Vec2D } from "../@types";
import { Paddle } from "./Paddle";
import { mapToRange } from '../helpers/utils';
import { ParticleEmitter } from "./ParticleEmitter";

export class Ball {

   private readonly color = '#ff006f';
   private readonly impactCorrection = 0.6;
   private readonly particles: ParticleEmitter;
   private readonly numberOfParticles = 300

   private readonly velocity: Vec2D = { x: 0, y: 0 };
   private angle: number = 0;
   private speed: number = window.innerWidth < 1400 ? 12 : 30;

   readonly side: number;
   readonly position: Vec2D;

   constructor(position: Vec2D, side: number) {

      this.position = position;
      this.side = side;

      this.particles = new ParticleEmitter(this.numberOfParticles, {
         x: this.position.x + this.side / 2,
         y: this.position.y + this.side / 2
      });

      this.velocity = {
         x: this.speed * Math.cos(this.angle),
         y: this.speed * Math.sin(this.angle)
      };

   }

   private checkCollision(paddle: Paddle) {

      if (this.position.x + this.side >= paddle.position.x
         && paddle.position.x + paddle.width >= this.position.x
         && this.position.y + this.side >= paddle.position.y
         && paddle.position.y + paddle.height >= this.position.y) return true;

      return false;

   }

   private updateVelocity() {
      this.velocity.x = Math.cos(this.angle) * this.speed;
      this.velocity.y = Math.sin(this.angle) * this.speed;
   }

   private setDirection(angle: number) {
      this.angle = angle;
      this.updateVelocity();
   }

   public setSpeed(value: number) {
      this.speed = value;
      this.updateVelocity();
   }

   public setPosition(position: Vec2D) {
      this.position.x = position.x;
      this.position.y = position.y;
   }

   public handleCollision(player: Paddle, cpu: Paddle) {

      if (this.checkCollision(player)) {

         const relativeImpactY = (this.position.y + this.side / 2) - player.position.y;

         const newAngle = mapToRange(relativeImpactY, 0, player.height, (-Math.PI) / 2 + this.impactCorrection, Math.PI / 2 - this.impactCorrection);

         this.setDirection(newAngle);

         return true;

      }

      if (this.checkCollision(cpu)) {

         const relativeImpactY = (this.position.y + this.side / 2) - cpu.position.y;

         const newAngle = mapToRange(relativeImpactY, 0, player.height, Math.PI * 1.5 - this.impactCorrection, Math.PI / 2 + this.impactCorrection);

         this.setDirection(newAngle);

         return true;

      }

      return false;

   }

   private reset(boundsX: number, boundsY: number) {

      const courtCenter = {
         x: boundsX / 2,
         y: boundsY / 2
      };

      this.setPosition({ x: courtCenter.x - this.side / 2, y: courtCenter.y - this.side / 2 });

   }


   public move(boundsX: number, boundsY: number, player: Paddle, cpu: Paddle) {

      if (this.position.x <= 0) {
         cpu.scorePoint();
         this.setDirection(Math.PI);
         this.reset(boundsX, boundsY);
         return true;
      }

      if (this.position.x + this.side >= boundsX) {
         player.scorePoint();
         this.setDirection(0);
         this.reset(boundsX, boundsY);
         return true;
      }

      if (this.position.y + this.side >= boundsY || this.position.y <= 0) { this.velocity.y = -this.velocity.y; }

      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.particles.updatePosition({
         x: this.position.x + this.side / 2,
         y: this.position.y + this.side / 2
      });

      this.particles.update();

      return false;

   }

   public draw(context: CanvasRenderingContext2D) {
      context.save();
      context.fillStyle = this.color;
      context.fillRect(this.position.x, this.position.y, this.side, this.side);
      context.restore();
      this.particles.draw(context);
   }

}