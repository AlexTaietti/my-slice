import { PerlinParticles } from './PerlinParticles';
import { createFittingCanvas, makeImageData, cloneCanvas } from '../helpers/utils';
import webfontloader from 'webfontloader';

export class PerlinText {

   text: string;
   fontSize: number;
   fontFamily: string;
   container: HTMLDivElement;
   PerlinParticles: PerlinParticles;
   canvas: HTMLCanvasElement;
   context: CanvasRenderingContext2D;
   imageData: ImageData | undefined;
   referenceCanvas: HTMLCanvasElement;
   defaultFont: string = 'sans-serif';
   frameID: number = 0;
   idle: boolean = false;
   unmount: () => void;

   constructor(container: HTMLDivElement | null, text: string, fontSize: number, fontFamily: string) {

      if (!container) throw new Error('PerlinText: Cannot initialise without a valid container');

      this.text = text;
      this.fontSize = fontSize;
      this.fontFamily = fontFamily;
      this.container = container;
      [this.canvas, this.context] = createFittingCanvas(container);
      this.referenceCanvas = cloneCanvas(this.canvas);
      this.imageData = undefined;
      this.PerlinParticles = new PerlinParticles(this.context.canvas.width, this.context.canvas.height);

      webfontloader.load({

         google: {
            families: [fontFamily]
         },

         fontactive: (loadedFont) => this.initialiseParticleText(loadedFont),

         inactive: () => this.initialiseParticleText(this.defaultFont)

      });

      const updateMousePosition = (event: MouseEvent) => {
         this.PerlinParticles.mousePosition.x = event.offsetX;
         this.PerlinParticles.mousePosition.y = event.offsetY;
      }

      const resetMousePosition = () => {
         this.PerlinParticles.mousePosition.x = -1;
         this.PerlinParticles.mousePosition.y = -1;
      }

      this.canvas.addEventListener('mousemove', updateMousePosition);
      this.canvas.addEventListener('mouseleave', resetMousePosition);

      this.unmount = () => {
         this.canvas.removeEventListener('mousemove', updateMousePosition);
         this.canvas.removeEventListener('mouseleave', resetMousePosition);
      };

   }

   setFont(font: string) {

      this.fontFamily = font;

      const referenceContext = this.referenceCanvas.getContext('2d');

      if (!referenceContext) throw new Error(`2d context not supported );`);

      referenceContext.font = `${this.fontSize}px ${this.fontFamily}`;
      referenceContext.textAlign = "center";
      referenceContext.textBaseline = "middle";

   }

   initialiseParticleText(font: string) {
      this.setFont(font);
      this.imageData = makeImageData(this.referenceCanvas, this.text);
      this.PerlinParticles.initFormation(this.imageData);
   }

   materialiseText() { this.PerlinParticles.initFormation(this.imageData); }

   disperseParticles() { this.PerlinParticles.endFormation(); }

   resize() {

      const pixelRatio = window.devicePixelRatio;

      const newWidth = pixelRatio * this.container.clientWidth;
      const newHeight = pixelRatio * this.container.clientHeight;

      if (newWidth === this.context.canvas.width && newHeight === this.context.canvas.height) return;

      this.disperseParticles();

      this.context.canvas.width = newWidth;
      this.context.canvas.height = newHeight;

      this.canvas.style.width = `${this.container.clientWidth + "px"}`;
      this.canvas.style.height = `${this.container.clientHeight + "px"}`;

      const referenceContext = this.referenceCanvas.getContext('2d') as CanvasRenderingContext2D;

      referenceContext.canvas.width = this.context.canvas.width;
      referenceContext.canvas.height = this.context.canvas.height;

      referenceContext.font = `${this.fontSize}px ${this.fontFamily}`;
      referenceContext.textAlign = "center";
      referenceContext.textBaseline = "middle";

      this.imageData = makeImageData(this.referenceCanvas, this.text);

      this.PerlinParticles.updateBounds(this.context.canvas.width, this.context.canvas.height);

      this.materialiseText();

   }

   stop() {

      window.cancelAnimationFrame(this.frameID);

      this.idle = true;

   }

   resume() {

      this.frameID = window.requestAnimationFrame(this.animate.bind(this));

      this.idle = false;

   }

   animate() {

      this.PerlinParticles.animateParticles(this.context);

      this.frameID = window.requestAnimationFrame(this.animate.bind(this));

   }


}