import { PerlinParticles } from './PerlinParticles';
import { createFittingCanvas } from '../helpers/utils';

export class SeekerParticles {

   private readonly container: HTMLElement;
   private readonly PerlinParticles: PerlinParticles;
   private readonly canvas: HTMLCanvasElement;
   private readonly context: CanvasRenderingContext2D;
   private readonly pixelRatio: number = window.devicePixelRatio;

   private frameID: number = 0;

   public idle: boolean = false;
   public unmount: () => void;

   constructor(container: HTMLElement | null) {

      if (!container) throw new Error('PerlinParticles: Cannot initialise without a valid container');

      this.container = container;
      [this.canvas, this.context] = createFittingCanvas(container);
      this.PerlinParticles = new PerlinParticles(this.context.canvas.width, this.context.canvas.height, this.pixelRatio);

      const updateMousePosition = (event: MouseEvent) => {

         this.PerlinParticles.setMousePosition({
            x: event.offsetX,
            y: event.offsetY
         });

      }

      const resetMousePosition = () => { this.PerlinParticles.setMousePosition({ x: -1, y: -1 }); }

      this.canvas.addEventListener('mousemove', updateMousePosition);
      this.canvas.addEventListener('mouseleave', resetMousePosition);

      this.unmount = () => {
         this.stop();
         this.canvas.removeEventListener('mousemove', updateMousePosition);
         this.canvas.removeEventListener('mouseleave', resetMousePosition);
      };

   }

   public resize() {

      const newWidth = this.pixelRatio * this.container.clientWidth;
      const newHeight = this.pixelRatio * this.container.clientHeight;

      if (newWidth === this.context.canvas.width && newHeight === this.context.canvas.height) return;

      this.context.canvas.width = newWidth;
      this.context.canvas.height = newHeight;

      this.canvas.style.width = `${this.container.clientWidth + "px"}`;
      this.canvas.style.height = `${this.container.clientHeight + "px"}`;

      this.PerlinParticles.updateBounds(this.context.canvas.width, this.context.canvas.height);

   }

   public stop() {

      window.cancelAnimationFrame(this.frameID);

      this.idle = true;

   }

   public resume() {

      this.frameID = window.requestAnimationFrame(this.animate.bind(this));

      this.idle = false;

   }

   public animate() {

      this.PerlinParticles.animateParticles(this.context);

      this.frameID = window.requestAnimationFrame(this.animate.bind(this));

   }


}