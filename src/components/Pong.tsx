import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PongGame } from '../classes/Pong';

export const Pong: React.FC = () => {

   const [visible, setVisibility] = useState(false);

   //create references and define resize handler function
   const canvasContainer = useRef<HTMLDivElement>(null);
   const pong = useRef<PongGame>();

   useEffect(() => {

      pong.current = new PongGame(canvasContainer.current);

      pong.current.start();

      const handleResize = () => pong.current?.resize();

      window.addEventListener('resize', handleResize);

      setVisibility(true);

      const observer = new IntersectionObserver((entry) => {

         if (pong.current && !entry[0].isIntersecting) { pong.current.pause(); }

      });

      if (canvasContainer.current) observer.observe(canvasContainer.current);

      return () => {

         window.removeEventListener('resize', handleResize);

         if (pong.current) {

            pong.current.end();

            pong.current = undefined; //free memory on unmount

         }

      }

   }, []);

   //let's go!
   return <GameContainer className={visible ? 'fadeIn' : 'hidden'} ref={canvasContainer} />;

};

const GameContainer = styled.div`

   position: relative;
   display: block;
   width: 100%;
   height: 100%;
   background: #030303;
   opacity: 0;
   transform: translateY(-40px);
   transition-duration: .4s;
   transition-property: opacity, transform;

   &.fadeIn{
      opacity: 1;
      transform: translateY(0);
   }

`;