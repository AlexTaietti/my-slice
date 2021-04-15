import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PerlinTextProps } from '../@types';
import { PerlinText } from '../classes/PerlinText';

export const ParticleText: React.FC<PerlinTextProps> = ({ text, fontSize }) => {

   //create references and define resize handler function
   const canvasContainer = useRef<HTMLDivElement>(null);
   const particleText = useRef<PerlinText>();

   const handleResize = () => particleText.current?.resize();

   useEffect(() => {

      //create particle text
      particleText.current = new PerlinText(canvasContainer.current, text, fontSize, 'Pacifico');

      //on mount start animating the particles
      particleText.current.animate();

      //intersection obserever to switch off animation when header is out of the viewport
      const observer = new IntersectionObserver((entry) => {

         //here the entry at index 0 will always be the canvas container
         if (particleText.current) {
            if (entry[0].isIntersecting && particleText.current.idle) { particleText.current.resume(); }
            if (!entry[0].isIntersecting) { particleText.current.stop(); }
         }

      });

      //start tracking the canvas' container's visibility
      if (canvasContainer.current) observer.observe(canvasContainer.current);

      //attach resize event to window object
      window.addEventListener('resize', handleResize);

      //detach event handlers and destroy particle text instance
      return () => {

         window.removeEventListener('resize', handleResize);

         if (particleText.current) {

            particleText.current.stop(); //stop anmiation loop

            particleText.current.unmount(); //detach mouse events

            particleText.current = undefined; //free memory

         }

      };

   }, []);

   //let's go!
   return <CanvasContainer ref={canvasContainer} />;

};

const CanvasContainer = styled.div`

   position: relative;
   cursor: crosshair;
   display: block;
   width: 100%;
   height: 100vh;
   z-index: -1;

`;