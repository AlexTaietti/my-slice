import { PerlinParticles } from './PerlinParticles';
import { Vec2D } from '../@types';
import { createFittingCanvas, makeImageData, cloneCanvas } from '../helpers/utils';
import webfontloader from 'webfontloader';

export class PerlinText {

   text: string;
   fontSize: number;
   fontFamily: string;
   offset: Vec2D;
   container: HTMLDivElement;
   PerlinParticles: PerlinParticles;
   canvas: HTMLCanvasElement;
   context: CanvasRenderingContext2D;
   imageData: ImageData | undefined;
   referenceCanvas: HTMLCanvasElement;
   defaultFont: string = 'sans-serif';

   constructor(container: HTMLDivElement | null, text: string, fontSize: number, fontFamily: string, offset: Vec2D) {

      if (!container) throw new Error('PerlinText: Cannot initialise without a valid container');

      this.text = text;
      this.fontSize = fontSize;
      this.fontFamily = fontFamily;
      this.offset = offset;
      this.container = container;
      [this.canvas, this.context] = createFittingCanvas(container);
      this.referenceCanvas = cloneCanvas(this.canvas);
      this.imageData = undefined;
      this.PerlinParticles = new PerlinParticles(this.canvas.width, this.canvas.height);

      webfontloader.load({

         google: {
            families: [fontFamily]
         },

         fontactive: (loadedFont) => this.initialiseParticleText(loadedFont),

         inactive: () => this.initialiseParticleText(this.defaultFont)

      });

   }

   setFont(font: string) {

      this.fontFamily = font;

      const referenceContext = this.referenceCanvas.getContext('2d');

      if (!referenceContext) throw new Error(`2d context not supported );`);

      referenceContext.font = `${this.fontSize}px ${this.fontFamily}`;
      referenceContext.textAlign = "left";
      referenceContext.textBaseline = "top";

   }

   initialiseParticleText(font: string) {
      this.setFont(font);
      this.imageData = makeImageData(this.referenceCanvas, this.text, this.offset);
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

      this.context.canvas.width = newWidth * pixelRatio;
      this.context.canvas.height = newHeight * pixelRatio;

      this.canvas.style.width = `${newWidth + "px"}`;
      this.canvas.style.height = `${newHeight + "px"}`;

      const referenceContext = this.referenceCanvas.getContext('2d') as CanvasRenderingContext2D;

      referenceContext.canvas.width = this.canvas.width;
      referenceContext.canvas.height = this.canvas.height;

      referenceContext.font = `${this.fontSize}px ${this.fontFamily}`;
      referenceContext.textAlign = "left";
      referenceContext.textBaseline = "top";

      this.imageData = makeImageData(this.referenceCanvas, this.text, this.offset);

      this.PerlinParticles.updateBounds(this.context.canvas.width, this.context.canvas.height);

      this.materialiseText();

   }

   animate() {

      this.PerlinParticles.animateParticles(this.context);

      window.requestAnimationFrame(this.animate.bind(this));

   }


}