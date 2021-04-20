import { Square, Vec2D } from '../@types';
import { createFittingCanvas, pickRandom } from '../helpers/utils';
import { Ball } from './Ball';
import { Cpu } from './Cpu';
import { Player } from './Player';
import firstSound from '../assets/audio/pong-hit-first.mp3';
import secondSound from '../assets/audio/pong-hit-second.mp3';
import thirdSound from '../assets/audio/pong-hit-third.mp3';
import fourthSound from '../assets/audio/pong-hit-fourth.mp3';
import fifthSound from '../assets/audio/pong-hit-fifth.mp3';

export class PongGame {

   private readonly container: HTMLDivElement;
   private readonly canvas: HTMLCanvasElement;
   private readonly context: CanvasRenderingContext2D;
   private readonly background = 'hsl(0, 0.0%, 1%)';

   private ball: Ball;
   private player: Player;
   private cpu: Cpu;

   private frameID = 0;

   private instructions = true;
   private paused = false;
   private courtCenter: Vec2D;
   private courtBounds: Square;

   //dumb noises
   private readonly audioArray: Array<HTMLAudioElement> = [new Audio(firstSound), new Audio(secondSound), new Audio(thirdSound), new Audio(fourthSound), new Audio(fifthSound)];
   private audio = true;

   private playerStep = window.innerWidth < 1300 ? 10 : 20;
   private entityWidth = window.innerWidth < 1300 ? 10 : 20;
   private paddleHeight: number;
   private paddleMargin = window.innerWidth < 1300 ? 10 : 20;

   private controlsFlags: { arrowUp: boolean, arrowDown: boolean };
   private unmount?: () => void;

   public playing = false;

   constructor(container: HTMLDivElement | null) {

      if (!container) throw new Error('Pong: Cannot initialise without a valid container');

      this.container = container;

      [this.canvas, this.context] = createFittingCanvas(container);

      this.paddleHeight = this.canvas.height / 100 * 15;

      this.courtCenter = {
         x: this.canvas.width / 2,
         y: this.canvas.height / 2
      };

      this.courtBounds = {
         width: this.canvas.width,
         height: this.canvas.height
      };

      this.setFont();

      this.controlsFlags = { arrowUp: false, arrowDown: false };

      [this.player, this.cpu, this.ball] = this.initialiseEntities();

   }

   public start() {

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

   public end() {
      if (this.unmount) this.unmount();
      window.cancelAnimationFrame(this.frameID);
   }

   private initialiseEntities(): [Player, Cpu, Ball] {

      const entityWidth = this.entityWidth;
      const PaddleHeight = this.paddleHeight;
      const paddleMargin = this.paddleMargin;

      const ball = new Ball({ x: this.courtCenter.x - entityWidth / 2, y: this.courtCenter.y - entityWidth / 2 }, entityWidth);
      const player = new Player({ x: paddleMargin, y: this.courtCenter.y - PaddleHeight / 2 }, entityWidth, PaddleHeight);
      const cpu = new Cpu({ x: this.courtBounds.width - paddleMargin * 2, y: this.courtCenter.y - PaddleHeight / 2 }, entityWidth, PaddleHeight);

      const entities: [Player, Cpu, Ball] = [player, cpu, ball];

      return entities;

   }

   private initialiseHandlers() {

      const handleMuteToggle = (event: KeyboardEvent) => { if (event.key === 'm') { this.audio = this.audio ? false : true; } }

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

      window.addEventListener('keypress', handleMuteToggle);
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('keyup', handleKeyRelease);

      this.unmount = () => {
         window.removeEventListener('keypress', handleMuteToggle);
         window.removeEventListener('keydown', handleKeyPress);
         window.removeEventListener('keyup', handleKeyRelease);
      }

   }

   private resetEntities() {

      this.playerStep = window.innerWidth < 1300 ? 10 : 20;
      this.entityWidth = window.innerWidth < 1300 ? 10 : 20;
      this.paddleHeight = this.canvas.height / 100 * 15;
      this.paddleMargin = window.innerWidth < 1300 ? 10 : 20;

      const newBallPosition = { x: this.courtCenter.x - this.entityWidth / 2, y: this.courtCenter.y - this.entityWidth / 2 };
      const newPlayerPosition = { x: this.paddleMargin, y: this.courtCenter.y - this.paddleHeight / 2 };
      const newCpuPosition = { x: this.courtBounds.width - this.paddleMargin * 2, y: this.courtCenter.y - this.paddleHeight / 2 };

      this.ball.setPosition(newBallPosition);
      this.player.setPosition(newPlayerPosition);
      this.cpu.setPosition(newCpuPosition);

      this.cpu.resetSmoothingFactor(this.courtBounds.width);

   }

   private repositionPaddles() {

      const newPlayerPosition = { x: this.paddleMargin, y: this.courtCenter.y - this.paddleHeight / 2 };
      const newCpuPosition = { x: this.courtBounds.width - this.paddleMargin * 2, y: this.courtCenter.y - this.paddleHeight / 2 };

      this.player.targetPosition = newPlayerPosition.y;

      this.player.setPosition(newPlayerPosition);
      this.cpu.setPosition(newCpuPosition);

   }

   private setFont() {

      this.context.font = "30px Pacifico";
      this.context.textAlign = "center";
      this.context.textBaseline = "middle";

   }

   private drawScore() {

      this.context.save();

      this.context.fillStyle = 'white';

      this.context.fillText(this.player.score.toString(), this.courtCenter.x - 50, 30);
      this.context.fillText(this.cpu.score.toString(), this.courtCenter.x + 50, 30);

      this.context.restore();

   }

   private drawBackground = () => {

      this.context.fillStyle = this.background;
      this.context.fillRect(0, 0, this.courtBounds.width, this.courtBounds.height);

   }

   private drawCourt() {

      this.context.save();

      this.drawBackground();

      this.context.strokeStyle = 'white';
      this.context.lineWidth = 3;
      this.context.setLineDash([10, 10]);

      this.context.beginPath();
      this.context.moveTo(this.courtCenter.x, 0);
      this.context.lineTo(this.courtCenter.x, this.courtBounds.height);
      this.context.closePath();
      this.context.stroke();

      if (!this.audio) {
         this.context.font = "35px Pacifico";
         this.context.textAlign = 'left';
         this.context.textBaseline = 'top';
         this.context.fillText('🤐', 30, 30);
      }

      this.context.restore();

   }

   private drawInstructions() {

      this.context.save();

      this.context.fillStyle = 'white';
      this.context.font = '60px Pacifico';

      this.context.fillText('YOU', (this.courtCenter.x / 2), this.courtCenter.y);
      this.context.fillText('CPU', ((this.courtCenter.x / 2) * 3), this.courtCenter.y);

      this.context.font = '20px Oswald';

      this.context.textAlign = 'right';
      this.context.fillText('Space = pause', this.courtCenter.x - 100, 70);

      this.context.textAlign = 'center';
      this.context.fillText('Enter = play', this.courtCenter.x, 70);

      this.context.textAlign = 'left';
      this.context.fillText('m = mute', this.courtCenter.x + 100, 70);

      this.context.restore();

   }

   private update() {

      if (this.controlsFlags.arrowUp) {

         if (this.player.targetPosition <= 0) {

            this.player.targetPosition = 0;

         } else this.player.moveTarget(-this.playerStep);

      } else if (this.controlsFlags.arrowDown) {

         if (this.player.targetPosition + this.player.height >= this.courtBounds.height) {

            this.player.targetPosition = this.courtBounds.height - this.player.height;

         } else this.player.moveTarget(this.playerStep);

      }

      this.player.move();
      this.cpu.move(this.ball, this.courtBounds.height);

      const impact = this.ball.handleCollision(this.player, this.cpu);
      const pointScored = this.ball.move(this.courtBounds.width, this.courtBounds.height, this.player, this.cpu);

      if (this.audio && impact) pickRandom(this.audioArray).play();
      if (pointScored) this.repositionPaddles();

   }

   private draw() {

      this.context.clearRect(0, 0, this.courtBounds.width, this.courtBounds.height);

      this.drawCourt();

      this.drawScore();

      this.ball.draw(this.context);
      this.player.draw(this.context);
      this.cpu.draw(this.context);

      if (this.paused) {

         this.context.save();

         this.context.fillStyle = '#ff006f';
         this.context.font = '80px Oswald';

         this.context.fillText('Paused', this.courtCenter.x, this.courtCenter.y);

         this.context.restore();

      }

   }

   public pause() {

      window.cancelAnimationFrame(this.frameID);

      this.playing = false;
      this.paused = true;

      this.draw();

   }

   public resume() {

      this.paused = false;
      this.playing = true;

      this.animate();

   }

   public animate() {

      this.update();
      this.draw();

      this.frameID = window.requestAnimationFrame(this.animate.bind(this));

   }

   public resize() {

      const pixelRatio = window.devicePixelRatio;

      const newWidth = pixelRatio * this.container.clientWidth;
      const newHeight = pixelRatio * this.container.clientHeight;

      if (newWidth === this.context.canvas.width && newHeight === this.context.canvas.height) return;

      this.context.canvas.width = newWidth;
      this.context.canvas.height = newHeight;

      this.courtCenter = {
         x: this.canvas.width / 2,
         y: this.canvas.height / 2
      };

      this.courtBounds = {
         width: this.canvas.width,
         height: this.canvas.height
      };

      this.canvas.style.width = `${this.container.clientWidth + "px"}`;
      this.canvas.style.height = `${this.container.clientHeight + "px"}`;

      this.setFont();

      this.resetEntities();

      if (!this.playing) this.draw();

      if (this.instructions) this.drawInstructions();

   }

}