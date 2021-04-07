import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PerlinTextProps } from '../@types';
import { PerlinText } from '../classes/PerlinText';
import webfontloader from 'webfontloader';

const CanvasContainer = styled.div`

   position: relative;
   display: block;
   width: 100%;
   height: 100%;

`;

export const ParticleText: React.FC<PerlinTextProps> = ({ text, fontSize, offset }) => {

   const canvasContainer = useRef<HTMLDivElement>(null);

   const particleText = useRef<PerlinText>();

   const handleResize = () => particleText?.current?.resize();

   useEffect(() => {

      const initialiseParticles = (loadedFont: string) => {

         particleText.current = new PerlinText(canvasContainer.current, text, fontSize, loadedFont, offset);

         particleText.current.materialiseText();

         particleText.current.animate();

      };

      webfontloader.load({

         google: {
            families: ['Pacifico']
         },

         fontactive: (loadedFont) => initialiseParticles(loadedFont)

      });

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);

   }, []);

   return <CanvasContainer ref={canvasContainer} />;

};