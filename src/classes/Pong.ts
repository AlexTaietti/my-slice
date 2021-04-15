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
   background = 'hsl(0, 0.0%, 1%)';
   playing = true;
   unmount: () => void;

   constructor(container: HTMLDivElement | null) {

      if (!container) throw new Error('Pong: Cannot initialise without a valid container');

      this.container = container;
      [this.canvas, this.context] = createFittingCanvas(container);

      const canvasCenter = {
         x: this.canvas.width / 2,
         y: this.canvas.height / 2
      };

      this.ball = new Ball({ x: canvasCenter.x - 10, y: canvasCenter.y - 10 }, 20);

      this.player = new Player({ x: 20, y: canvasCenter.y - 50 }, 20, 100);

      this.cpu = new Cpu({ x: canvasCenter.x * 2 - 40, y: canvasCenter.y - 50 }, 20, 100);

      this.context.font = "30px sans-serif";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";

      const handleKeys = (event: KeyboardEvent) => {

         if (this.playing) event.preventDefault();

         switch (event.key) {
            case 'ArrowUp':
               this.player.targetPosition.y -= 20;
               break;
            case 'ArrowDown':
               this.player.targetPosition.y += 20;
               break;
            default:
               console.warn('you can only move up or down');
         }

      };

      window.addEventListener('keydown', handleKeys);

      this.unmount = () => window.removeEventListener('keydown', handleKeys);

   }

   drawScore() {

      this.context.save();

      this.context.fillStyle = 'white';

      this.context.fillText(this.player.score.toString(), this.canvas.width / 2 - 50, 30);
      this.context.fillText(this.cpu.score.toString(), this.canvas.width / 2 + 50, 30);

      this.context.restore();

   }

   drawCourt() {

      this.context.save();

      this.context.fillStyle = this.background;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.context.strokeStyle = 'white';
      this.context.lineWidth = 5;
      this.context.setLineDash([5, 10]);

      this.context.beginPath();
      this.context.moveTo(this.canvas.width / 2, 0);
      this.context.lineTo(this.canvas.width / 2, this.canvas.height);
      this.context.closePath();
      this.context.stroke();

      this.context.restore();

   }

   update() {

      this.ball.move(this.canvas.width, this.canvas.height);
      this.player.move();
      this.cpu.move(this.ball.position);

      if (this.ball.checkCollision(this.player)) console.log('player collision!');

      if (this.ball.checkCollision(this.cpu)) console.log('cpu collision!');

   }

   draw() {

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.drawCourt();

      this.drawScore();

      this.ball.draw(this.context);
      this.player.draw(this.context);
      this.cpu.draw(this.context);

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

      this.context.font = "30px sans-serif";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";

   }

}