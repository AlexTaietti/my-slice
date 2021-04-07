import { PerlinParticles } from './PerlinParticles';
import { Vec2D } from '../@types';
import { createFittingCanvas, createReferenceCanvas, makeImageData } from '../helpers/utils';

export class PerlinText {

   text: string;
   fontSize: number;
   fontFamily: string;
   offset: Vec2D;
   container: HTMLDivElement;
   PerlinParticles: PerlinParticles;
   canvas: HTMLCanvasElement;
   context: CanvasRenderingContext2D;
   imageData: ImageData;
   referenceCanvas: HTMLCanvasElement;

   constructor(container: HTMLDivElement | null, text: string, fontSize: number, fontFamily: string = 'cursive', offset: Vec2D) {

      if (!container) throw new Error('PerlinText: Cannot initialise without a valid container');

      this.text = text;
      this.fontSize = fontSize;
      this.fontFamily = fontFamily;
      this.offset = offset;
      this.container = container;
      [this.canvas, this.context] = createFittingCanvas(container);
      this.referenceCanvas = createReferenceCanvas(this.canvas, fontSize, fontFamily);
      this.imageData = makeImageData(this.referenceCanvas, text, offset);
      this.PerlinParticles = new PerlinParticles(this.canvas.width, this.canvas.height);

   }

   materialiseText() { this.PerlinParticles.initFormation(this.imageData); }

   disperseParticles() { this.PerlinParticles.endFormation(); }

   resize() {

      this.disperseParticles();

      const pixelRatio = window.devicePixelRatio;

      const containerWidth = this.container.clientWidth;
      const containerHeight = this.container.clientHeight;

      this.context.canvas.width = containerWidth * pixelRatio;
      this.context.canvas.height = containerHeight * pixelRatio;

      this.canvas.style.width = `${containerWidth + "px"}`;
      this.canvas.style.height = `${containerHeight + "px"}`;

      this.referenceCanvas.width = this.canvas.width;
      this.referenceCanvas.height = this.canvas.height;

      const referenceContext = this.referenceCanvas.getContext('2d') as CanvasRenderingContext2D;

      referenceContext.font = `${this.fontSize}px ${this.fontFamily}`;
      referenceContext.textAlign = "left";
      referenceContext.textBaseline = "top";

      this.imageData = makeImageData(this.referenceCanvas, this.text, this.offset);

      this.PerlinParticles.updateBounds(containerWidth, containerHeight);

      this.materialiseText();

   }

   animate() {

      this.PerlinParticles.animateParticles(this.context);

      window.requestAnimationFrame(this.animate.bind(this));

   }


}