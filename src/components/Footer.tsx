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

      <FooterContainer>

         {playing ?

            <Pong />

            :

            <Container>
               <Farewell fadeOut={fadingText}>
                  <Title>Fin.</Title>
                  <Text>Thank you for scrolling this far! Now please, be my guest, <Button onClick={startGame}>play some pong</Button> or <Button onClick={scrollToTop}>go back to the top</Button></Text>
               </Farewell>
            </Container>}

      </FooterContainer>

   );

};

const FooterContainer = styled.footer`

   background: #030303;
   position: relative;
   display: block;
   width: 100%;
   height: 100%;

`;

const Farewell = styled.div<{ fadeOut: boolean }>`

   max-width: 50%;
   color: white;
   transition-property: opacity, transform;
   transition-duration: .3s;
   transform: ${({ fadeOut }) => fadeOut ? 'translateY(-40px)' : 'translateY(0)'};
   opacity: ${({ fadeOut }) => fadeOut ? 0 : 1};

`;

const Button = styled.button`

   background: none;
   font-family: inherit;
   font-size: inherit;
   color: #ff33ff;
   cursor: pointer;
   font-weight: inherit;
   transition: color .2s;

   &:hover{ color: #ee00ee; }

`;

const Title = styled.h2`

   font-size: 4rem;
   text-align: center;
   font-family: 'Pacifico', cursive;

`;

const Text = styled.p`

   font-size: 2.2rem;
   text-align: center;
   font-weight: lighter;
   font-family: 'Oswald', sans-serif;

`;

const Container = styled.div`

   background: #030303;
   position: relative;
   display: flex;
   width: 100%;
   height: 100%;
   align-items: center;
   justify-content: center;

`;