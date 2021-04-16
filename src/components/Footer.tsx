import { useState } from 'react';
import styled from 'styled-components';
import { Pong } from './Pong';

export const Footer: React.FC = () => {

   const [playing, setPlayState] = useState(false);

   const [fadingText, setFadingText] = useState(false);

   const startGame = () => {

      setFadingText(true);

      setTimeout(() => setPlayState(true), 400);

   };

   const scrollToTop = () => {

      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });

   };

   //let's go!
   return (

      playing ?

         <Pong />

         :

         <FooterContainer className={fadingText ? 'fadeOut' : 'active'}>
            <div className='text'>
               <h1>Fin.</h1>
               <p>Thank you for scrolling this far! Now please, be my guest, <span onClick={startGame}>play some pong</span> or <span onClick={scrollToTop}>go back to the top</span></p>
            </div>
         </FooterContainer>

   );

};

const FooterContainer = styled.footer`

   background: #030303;
   position: relative;
   display: flex;
   width: 100%;
   height: 100%;
   align-items: center;
   justify-content: center;

   .text{

      max-width: 50%;
      color: white;
      transition-property: opacity, transform;
      transition-duration: .3s;
      
      h1{
         font-size: 4rem;
         text-align: center;
         font-family: 'Pacifico', cursive;
      }

      p{
         font-size: 2.2rem;
         text-align: center;
         font-weight: lighter;
         font-family: 'Oswald', sans-serif;
      }

      span{
         color: #ee00ee;
         cursor: pointer;
      }
   
   }

   &.fadeOut .text{

      transform: translateY(-40px);
      opacity: 0;

   }

`;