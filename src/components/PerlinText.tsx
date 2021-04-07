import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PerlinTextProps } from '../@types';
import { PerlinText } from '../classes/PerlinText';

const CanvasContainer = styled.div`

   position: relative;
   display: block;
   width: 100%;
   height: 100%;

   canvas{ font-family: 'Pacifico', sans-serif; }

`;

export const ParticleText: React.FC<PerlinTextProps> = ({ text, fontSize, fontFamily, offset }) => {

   const canvasContainer = useRef<HTMLDivElement>(null);

   const particleText = useRef<PerlinText>();

   const handleResize = () => particleText?.current?.resize();

   useEffect(() => {

      particleText.current = new PerlinText(canvasContainer.current, text, fontSize, fontFamily, offset);

      particleText.current.materialiseText();

      particleText.current.animate();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);

   }, []);

   return <CanvasContainer ref={canvasContainer} />;

};