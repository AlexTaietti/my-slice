import { Vec2D } from "../@types";

export const cloneCanvas = (canvas: HTMLCanvasElement) => {

   const clone = document.createElement('canvas');
   const cloneContext = clone.getContext('2d');

   const originalContext = canvas.getContext('2d');

   if (!cloneContext || !originalContext) throw new Error(`2d context not supported );`);

   cloneContext.canvas.width = originalContext.canvas.width;
   cloneContext.canvas.height = originalContext.canvas.height;

   return clone;

};

export const createReferenceCanvas = (canvas: HTMLCanvasElement, fontSize: number, fontFamily: string) => {

   const clonedCanvas = cloneCanvas(canvas);
   const clonedContext = clonedCanvas.getContext('2d');

   if (!clonedContext) throw new Error(`2d context not supported );`);

   clonedContext.font = `${fontSize}px ${fontFamily}`;
   clonedContext.textAlign = "left";
   clonedContext.textBaseline = "top";

   return clonedCanvas;

};

export const createFittingCanvas = (container: HTMLDivElement): [HTMLCanvasElement, CanvasRenderingContext2D] => {

   const canvas = document.createElement('canvas');
   const context = canvas.getContext('2d');

   if (!context) throw new Error(`2d context not supported );`);

   const pixelRatio = window.devicePixelRatio;

   const containerWidth = container.clientWidth;
   const containerHeight = container.clientHeight;

   canvas.style.width = `${containerWidth + "px"}`;
   canvas.style.height = `${containerHeight + "px"}`;

   context.canvas.width = containerWidth * pixelRatio;
   context.canvas.height = containerHeight * pixelRatio;

   container.append(canvas);

   return [canvas, context];

};

export const makeImageData = (canvas: HTMLCanvasElement, text: string, offset: Vec2D) => {

   const context = canvas.getContext('2d');

   if (!context) throw new Error(`2d context not supported );`);

   const fromLeft = offset.x * context.canvas.width / 100;
   const fromTop = offset.y * context.canvas.height / 100;

   context.fillText(text, fromLeft, fromTop);

   const data = context.getImageData(0, 0, canvas.width, canvas.height);

   return data;

};