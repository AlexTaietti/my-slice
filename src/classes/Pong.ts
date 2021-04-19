import { createFittingCanvas } from '../helpers/utils';
import { Ball } from './Ball';
import { Cpu } from './Cpu';
import { Player } from './Player';

export class PongGame {

   container: HTMLDivElement;
   canvas: HTMLCanvasElement;
   ball: Ball;
   player: Player;
   cpu: Cpu;
   context: CanvasRenderingContext2D;
   frameID = 0;
   playing = false;
   instructions = true;
   paused = false;
   background = 'hsl(0, 0.0%, 1%)';
   controlsFlags: { arrowUp: boolean, arrowDown: boolean };
   unmount?: () => void;

   constructor(container: HTMLDivElement | null) {

      if (!container) throw new Error('Pong: Cannot initialise without a valid container');

      this.container = container;

      [this.canvas, this.context] = createFittingCanvas(container);

      this.setFont();

      this.controlsFlags = { arrowUp: false, arrowDown: false };

      [this.player, this.cpu, this.ball] = this.initialiseEntities();

   }

   start() {

      this.draw();

      this.drawInstructions();

      const startGame = (event: KeyboardEvent) => {

         if (event.key === 'Enter') {
            this.instructions = false;
            this.playing = true;
            this.initialiseHandlers();
            this.animate();
         }

         window.removeEventListener('keypress', startGame);

      };

      window.addEventListener('keypress', startGame);

   }

   end() {
      if (this.unmount) this.unmount();
      window.cancelAnimationFrame(this.frameID);
   }

   initialiseEntities(): [Player, Cpu, Ball] {

      //initialise entities
      const canvasCenter = {
         x: this.canvas.width / 2,
         y: this.canvas.height / 2
      };

      const entityWidth = 10;
      const PaddleHeight = this.canvas.height / 100 * 15;
      const paddleMargin = 10;

      const ball = new Ball({ x: canvasCenter.x - entityWidth / 2, y: canvasCenter.y - entityWidth / 2 }, entityWidth);
      const player = new Player({ x: paddleMargin, y: canvasCenter.y - PaddleHeight / 2 }, entityWidth, PaddleHeight);
      const cpu = new Cpu({ x: canvasCenter.x * 2 - paddleMargin * 2, y: canvasCenter.y - PaddleHeight / 2 }, entityWidth, PaddleHeight);

      const entities: [Player, Cpu, Ball] = [player, cpu, ball];

      return entities;

   }

   initialiseHandlers() {

      //attach event handlers responsible for the player's movement
      const handleKeyPress = (event: KeyboardEvent) => {

         if (event.key === ' ' && this.playing) { this.pause(); }

         if (event.key === 'Enter' && !this.playing) { this.resume(); }

         if (this.playing && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) event.preventDefault();

         switch (event.key) {
            case 'ArrowUp':
               this.controlsFlags.arrowUp = true;
               break;
            case 'ArrowDown':
               this.controlsFlags.arrowDown = true;
               break;
            default:
               console.warn('you can only move up or down');
         }

      };

      const handleKeyRelease = (event: KeyboardEvent) => {

         if (this.playing && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) event.preventDefault();

         switch (event.key) {
            case 'ArrowUp':
               this.controlsFlags.arrowUp = false;
               break;
            case 'ArrowDown':
               this.controlsFlags.arrowDown = false;
               break;
            default:
               console.warn('you can only move up or down');
         }

      };

      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('keyup', handleKeyRelease);

      this.unmount = () => {
         window.removeEventListener('keydown', handleKeyPress);
         window.removeEventListener('keyup', handleKeyRelease);
      }

   }

   resetEntities() {

      const canvasCenter = {
         x: this.canvas.width / 2,
         y: this.canvas.height / 2
      };

      const entityWidth = 10;
      const PaddleHeight = this.canvas.height / 100 * 15;
      const paddleMargin = 10;

      const newBallPosition = { x: canvasCenter.x - entityWidth / 2, y: canvasCenter.y - entityWidth / 2 };
      const newPlayerPosition = { x: paddleMargin, y: canvasCenter.y - PaddleHeight / 2 };
      const newCpuPosition = { x: canvasCenter.x * 2 - paddleMargin * 2, y: canvasCenter.y - PaddleHeight / 2 };

      this.ball.setPosition(newBallPosition);
      this.player.setPosition(newPlayerPosition);
      this.cpu.setPosition(newCpuPosition);

   }

   setFont() {

      this.context.font = "30px Pacifico";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";

   }

   drawScore() {

      this.context.save();

      this.context.fillStyle = 'white';

      this.context.fillText(this.player.score.toString(), this.canvas.width / 2 - 50, 30);
      this.context.fillText(this.cpu.score.toString(), this.canvas.width / 2 + 50, 30);

      this.context.restore();

   }

   drawBackground = () => {

      this.context.fillStyle = this.background;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

   }

   drawCourt() {

      this.context.save();

      this.drawBackground();

      this.context.strokeStyle = 'white';
      this.context.lineWidth = 3;
      this.context.setLineDash([10, 10]);

      this.context.beginPath();
      this.context.moveTo(this.canvas.width / 2, 0);
      this.context.lineTo(this.canvas.width / 2, this.canvas.height);
      this.context.closePath();
      this.context.stroke();

      this.context.restore();

   }

   drawInstructions() {

      this.context.save();

      this.context.fillStyle = 'white';
      this.context.font = '60px Pacifico';

      this.context.fillText('YOU', (this.canvas.width / 4), this.canvas.height / 2);
      this.context.fillText('CPU', ((this.canvas.width / 4) * 3), this.canvas.height / 2);

      this.context.font = '20px Oswald';

      this.context.textAlign = 'right';
      this.context.fillText('Space = pause', this.canvas.width / 2 - 30, 70);

      this.context.textAlign = 'left';
      this.context.fillText('Enter = play', this.canvas.width / 2 + 30, 70);

      this.context.restore();

   }

   update() {

      if (this.controlsFlags.arrowUp) {

         if (this.player.targetPosition <= 0) {

            this.player.targetPosition = 0;

         } else this.player.moveTarget(-10);

      } else if (this.controlsFlags.arrowDown) {

         if (this.player.targetPosition + this.player.height >= this.canvas.height) {

            this.player.targetPosition = this.canvas.height - this.player.height;

         } else this.player.moveTarget(10);

      }

      this.player.move();
      this.cpu.move(this.ball, this.canvas.height);

      this.ball.move(this.canvas.width, this.canvas.height, this.player, this.cpu);
      this.ball.update(this.player, this.cpu);

   }

   draw() {

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawCourt();

      this.drawScore();

      this.ball.draw(this.context);
      this.player.draw(this.context);
      this.cpu.draw(this.context);

      if (this.paused) {

         this.context.save();

         this.context.fillStyle = 'white';
         this.context.font = '80px Oswald';

         this.context.fillText('Paused', this.canvas.width / 2, this.canvas.height / 2);

         this.context.restore();

      }

   }

   pause() {

      window.cancelAnimationFrame(this.frameID);

      this.playing = false;
      this.paused = true;

      this.draw();

   }

   resume() {

      this.paused = false;
      this.playing = true;

      this.animate();

   }

   animate() {

      this.update();
      this.draw();

      this.frameID = window.requestAnimationFrame(this.animate.bind(this));

   }

   resize() {

      const pixelRatio = window.devicePixelRatio;

      const newWidth = pixelRatio * this.container.clientWidth;
      const newHeight = pixelRatio * this.container.clientHeight;

      if (newWidth === this.context.canvas.width && newHeight === this.context.canvas.height) return;

      this.context.canvas.width = newWidth;
      this.context.canvas.height = newHeight;

      this.canvas.style.width = `${this.container.clientWidth + "px"}`;
      this.canvas.style.height = `${this.container.clientHeight + "px"}`;

      this.setFont();

      this.resetEntities();

      this.ball.setSpeed(window.innerWidth / 100);

      if (!this.playing) this.draw();

      if (this.instructions) this.drawInstructions();

   }

}