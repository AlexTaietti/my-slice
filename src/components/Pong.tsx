import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PongGame } from '../classes/Pong';

export const Pong: React.FC = () => {

   const [visible, setVisibility] = useState(false);
   const [instructionsVisible, setInstructionsVisibility] = useState(true);

   //create references and define resize handler function
   const canvasContainer = useRef<HTMLDivElement>(null);
   const pong = useRef<PongGame>();

   const startGame = () => {
      setInstructionsVisibility(false);
      pong.current?.start();
   };

   useEffect(() => {

      pong.current = new PongGame(canvasContainer.current);

      pong.current.init();

      const handleResize = () => pong.current?.resize();

      window.addEventListener('resize', handleResize);

      setVisibility(true);

      const observer = new IntersectionObserver((entry) => {

         if (pong.current && pong.current.playing && !entry[0].isIntersecting) { pong.current.pause(); }

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
   return (
      <GameContainer className={visible ? 'fadeIn' : 'hidden'} ref={canvasContainer}>
         <Instructions onClick={startGame} className={instructionsVisible ? 'show' : 'hidden'}>
            <p>Use the <span>arrow keys</span> to move your paddle, <span>m</span> to mute the sound, the <span>spacebar</span> to pause the game and <span>enter</span> to resume. Click me to start!</p>
         </Instructions>
      </GameContainer>
   );

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

const Instructions = styled.div`

   max-width: 35%;
   background: #ae0b52;
   position: absolute;
   left: 50%;
   top: 50%;
   transform: translate(-50%, -50%);
   font-family: 'Oswald', sans-serif;
   font-size: 1.8rem;
   padding: 12px 15px 15px;
   color: white;
   cursor: pointer;
   text-shadow: 1px 1px 1px black;
   transition-duration: .4s;
   transition-property: opacity, transform;
   text-align: center;
   border: 2px solid #0087ff;
   border-radius: 5px;

   span{ color: #00cfff; }

   &.hidden{
      opacity: 0;
      transform: translate(-50%, -70%);
   }

`;