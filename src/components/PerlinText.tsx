import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PerlinTextProps } from '../@types';
import { PerlinText } from '../classes/PerlinText';

export const ParticleText: React.FC<PerlinTextProps> = ({ text, fontSize }) => {

   const canvasContainer = useRef<HTMLDivElement>(null);
   const particleText = useRef<PerlinText>();

   const handleResize = () => particleText.current?.resize();

   useEffect(() => {

      particleText.current = new PerlinText(canvasContainer.current, text, fontSize, 'Pacifico');

      particleText.current.animate();

      //intersection obserever to switch off animation when header is out of the viewport
      const observer = new IntersectionObserver((entry) => {

         if (particleText.current) {
            if (entry[0].isIntersecting && particleText.current.idle) { particleText.current.resume(); }
            if (!entry[0].isIntersecting) { particleText.current.stop(); }
         }

      });

      if (canvasContainer.current) observer.observe(canvasContainer.current);

      window.addEventListener('resize', handleResize);

      return () => {

         window.removeEventListener('resize', handleResize);

         if (particleText.current) {

            particleText.current.stop();

            particleText.current.unmount();

            particleText.current = undefined; //free memory on unmount

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