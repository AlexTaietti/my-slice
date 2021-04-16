import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { PongGame } from '../classes/Pong';

export const Pong: React.FC = () => {

   //create references and define resize handler function
   const canvasContainer = useRef<HTMLDivElement>(null);
   const pong = useRef<PongGame>();

   useEffect(() => {

      pong.current = new PongGame(canvasContainer.current);

      pong.current.animate();

      const handleResize = () => pong.current?.resize();

      window.addEventListener('resize', handleResize);

      return () => window.removeEventListener('resize', handleResize);

   }, []);

   //let's go!
   return <GameContainer ref={canvasContainer} />;

};

const GameContainer = styled.div`

   position: relative;
   display: block;
   width: 100%;
   height: 100%;
   z-index: -1;
   background: #030303;

`;