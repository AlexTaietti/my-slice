import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PerlinTextProps } from '../@types';
import { PerlinText } from '../classes/PerlinText';

export const ParticleText: React.FC<PerlinTextProps> = ({ text, fontSize, offset }) => {

   const canvasContainer = useRef<HTMLDivElement>(null);

   const particleText = useRef<PerlinText>();

   const handleResize = () => particleText.current?.resize();

   useEffect(() => {

      particleText.current = new PerlinText(canvasContainer.current, text, fontSize, 'Pacifico', offset);

      particleText.current.animate();

      window.addEventListener('resize', handleResize);

      return () => {

         window.removeEventListener('resize', handleResize);

         if (particleText.current) {

            window.cancelAnimationFrame(particleText.current.frameID);

            particleText.current = undefined;

         }

      };

   }, []);

   return <CanvasContainer ref={canvasContainer} />;

};

const CanvasContainer = styled.div`

   position: relative;
   display: block;
   width: 100%;
   height: 100vh;
   z-index: -1;

`;