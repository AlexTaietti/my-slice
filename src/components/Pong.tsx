import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PongGame } from '../classes/Pong';

export const Pong: React.FC = () => {

   const [visible, setVisibility] = useState(false);
   const [instructionsVisible, setInstructionsVisibility] = useState(true);
   const [instructionsMount, setInstructionsMount] = useState(true);

   //create references and define resize handler function
   const canvasContainer = useRef<HTMLDivElement>(null);
   const pong = useRef<PongGame>();

   const startGame = () => {

      if (pong.current?.playing) return;

      setInstructionsVisibility(false);
      pong.current?.start();

   };

   const unmountInstructions = () => setInstructionsMount(false);

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

      <GameContainer visible={visible} ref={canvasContainer}>

         {instructionsMount &&

            <InstructionsContainer onTransitionEnd={unmountInstructions} onClick={startGame} instructionsVisible={instructionsVisible}>
               <Instructions>Use the <Highlight>arrow keys</Highlight> to move your paddle, <Highlight>m</Highlight> to mute the sound, the <Highlight>spacebar</Highlight> to pause the game and <Highlight>enter</Highlight> to resume. Click me to start!</Instructions>
            </InstructionsContainer>}

      </GameContainer>

   );

};

const GameContainer = styled.div<{ visible: boolean }>`

   position: relative;
   display: block;
   width: 100%;
   height: 100%;
   background: #030303;
   opacity: ${({ visible }) => visible ? 1 : 0};
   transform:  ${({ visible }) => visible ? 'translateY(0)' : 'translateY(-40px)'};
   transition-duration: .4s;
   transition-property: opacity, transform;

`;

const Instructions = styled.p`

   font-family: 'Oswald', sans-serif;
   font-size: 1.8rem;
   color: white;
   text-align: center;
   text-shadow: 1px 1px 1px black;

`;

const Highlight = styled.span`

   color: #00cfff;

`;

const InstructionsContainer = styled.div<{ instructionsVisible: boolean }>`

   max-width: 35%;
   background: #ae0b52;
   position: absolute;
   left: 50%;
   top: 50%;
   opacity: ${({ instructionsVisible }) => instructionsVisible ? 1 : 0};
   transform:  ${({ instructionsVisible }) => instructionsVisible ? 'translate(-50%, -50%)' : 'translate(-50%, -70%)'} ;
   padding: 12px 15px 15px;
   cursor: pointer;
   transition-duration: .4s;
   transition-property: opacity, transform;
   border: 2px solid #0087ff;
   border-radius: 5px;

`;