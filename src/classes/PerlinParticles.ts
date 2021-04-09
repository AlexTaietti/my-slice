import { Perlin3D } from '../helpers/Perlin3D';
import { Square } from '../@types';

//cheeky shortcuts
const random = Math.random;
const PI2 = Math.PI * 2;
const SIN = Math.sin;
const COS = Math.cos;
const NOW = Date.now;


export class PerlinParticles {

   bounds: Square; //will have to be calculated on initialisation

   //these two props are temporary coordinate holders for every particle's update cycle (all particles are sharing them), used to avoid allocating memory needlessly on every individual particle's update cycle...particle, particle...particle, particle, particle...you get the gist
   x = -1;
   y = -1;

   inFormation = false;
   hue = Math.random() * (Math.PI * 2);
   RAINBOW = false;

   //build a home for our particles <3
   particleDensity = 6;
   particleFields = 6; // number of properties used to identify each particle, 4 regarding it's location and speed and two regarding any target it might be moving towards
   particlesNumber = 11000;
   particleArrayTotalSize = this.particlesNumber * this.particleFields;
   particles = new Float32Array(this.particleArrayTotalSize); //takes particle array total size on initialisation

   //all of these props determine the final feel of the swarm
   speedMultiplier = 0.953;
   gridShrinkFactor = 190;
   zComponentShrink = 4000;
   formationHampering = 0.0095;
   shapeSharpness = 19.8;
   formationNoiseIntensity = 0.6;
   noiseIntensity = 0.8;
   perlin = Perlin3D;

   constructor(worldWidth: number, worldHeight: number, rainbowMode?: boolean) {

      this.bounds = {
         width: worldWidth,
         height: worldHeight
      };

      for (let i = 0; i < this.particleArrayTotalSize; i += this.particleFields) {
         this.particles[i] = random() * this.bounds.width;
         this.particles[i + 1] = random() * this.bounds.height;
         this.particles[i + 2] = 0;
         this.particles[i + 3] = 0;
         this.particles[i + 4] = -1;
         this.particles[i + 5] = -1;
      }

      if (rainbowMode) this.RAINBOW = rainbowMode;

   }

   updateBounds(worldWidth: number, worldHeight: number) {
      this.bounds.width = worldWidth;
      this.bounds.height = worldHeight;
   }


   initFormation(imageData: ImageData | undefined) {

      if (!imageData) {
         console.warn('Particle text could not get into formation because of undefined image data');
         return;
      }

      const data = imageData.data;

      for (let i = -1, particleArrayPointer = ~~(random() * this.particlesNumber), pixelIndex = undefined; i < data.length; i += 4) {
         if (data[i] > 0 && Math.random() > 0.854) {
            pixelIndex = (i - 3) / 4;
            this.particles[this.particleFields * (particleArrayPointer % this.particlesNumber) + 4] = pixelIndex % imageData.width;
            this.particles[this.particleFields * ((particleArrayPointer++) % this.particlesNumber) + 5] = pixelIndex / imageData.width;
         }
      }

      this.inFormation = true;

   }

   endFormation() {

      for (let i = 0; i < this.particleArrayTotalSize; i += this.particleFields) {
         this.particles[i + 4] = -1;
         this.particles[i + 5] = -1;
      }

      this.inFormation = false;

   }

   areInFormation() { return this.inFormation; }

   animateParticles(context: CanvasRenderingContext2D) {

      //draw background
      context.fillStyle = `hsl(0, 0.0%, 1%)`;
      context.fillRect(0, 0, this.bounds.width, this.bounds.height);

      context.fillStyle = this.RAINBOW ? `hsl(${this.hue += .4}, 100%, 50%)` : `hsl(213, 94%, 50%)`;

      for (let i = 0, noiseX, noiseY; i < this.particleArrayTotalSize; i += this.particleFields) {

         noiseX = this.perlin(this.particles[i] / this.gridShrinkFactor, this.particles[i + 1] / this.gridShrinkFactor, -NOW() / this.zComponentShrink);
         noiseY = this.perlin(this.particles[i] / this.gridShrinkFactor, this.particles[i + 1] / this.gridShrinkFactor, NOW() / this.zComponentShrink);

         //approach coordinates of target pixel if one has been assigned to this specific particle
         if (this.particles[i + 4] > 0 && this.particles[i + 5] > 0) {
            this.particles[i + 2] += ((this.particles[i + 4] - this.particles[i]) * this.formationHampering) + ((random() / this.shapeSharpness) * COS(random() * (PI2)) + noiseX * this.formationNoiseIntensity);
            this.particles[i + 3] += ((this.particles[i + 5] - this.particles[i + 1]) * this.formationHampering) + ((random() / this.shapeSharpness) * SIN(random() * (PI2)) + noiseY * this.formationNoiseIntensity);
         } else { //simply change velocity components based on noise
            this.particles[i + 2] += ((random() / 4) * COS(random() * (PI2)) + noiseX * this.noiseIntensity);
            this.particles[i + 3] += ((random() / 4) * SIN(random() * (PI2)) + noiseY * this.noiseIntensity);
         }

         //slow the current particle and move it around
         this.x = this.particles[i] += (this.particles[i + 2] *= this.speedMultiplier);
         this.y = this.particles[i + 1] += (this.particles[i + 3] *= this.speedMultiplier);

         //wrap particles around edges only if they have not been assigned a target pixel
         if (this.particles[i + 4] < 0 && this.particles[i + 5] < 0) {
            if (this.x > this.bounds.width) {
               this.particles[i] = 0;
            } else if (this.x < 0) {
               this.particles[i] = this.bounds.width;
            }

            if (this.y > this.bounds.height) {
               this.particles[i + 1] = 0;
            } else if (this.y < 0) {
               this.particles[i + 1] = this.bounds.height;
            }
         }

         //draw particles
         context.fillRect(this.x, this.y, 1, 1);

      }

   }

};