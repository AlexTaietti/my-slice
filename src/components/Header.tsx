import styled, { keyframes } from 'styled-components';
import { ParticleText } from './PerlinText';

export const Header: React.FC<{ mobile: boolean }> = ({ mobile }) => {

   const scrollToBio = () => {

      const bio = (document.getElementById('bio') as HTMLDivElement).getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
         top: bio,
         behavior: 'smooth'
      });

   };

   return (
      <Hero id='hero'>
         {!mobile ? <ParticleText text={"Hellooooo!"} fontSize={180} /> : <Ciao>Hellooo!</Ciao>}
         <ScrollTrigger onClick={scrollToBio}>Get to know me</ScrollTrigger>
      </Hero>
   );

};

const pulse = keyframes`

   0%{ transform: translateY(0px); }

   20%{ transform: translateY(10px); }

   40%{ transform: translateY(0px); }

`;

const Ciao = styled.h2`

   font-size: 7.5rem;
   text-align: center;
   font-family: 'Pacifico', sans-serif;
   color: rgb(8, 116, 247);

`;

const ScrollTrigger = styled.span`

   font-size: 2.2rem;
   position: absolute;
   bottom: 3%;
   left: 50%;
   display: inline-block;
   transform: translateX(-50%);
   cursor: pointer;
   color: white;
   font-family: 'Oswald', sans-serif;
   text-align: center;

   &::after{
      animation-name: ${pulse};
      animation-duration: 2s;
      animation-iteration-count: infinite;
      margin-top: 5px;
      display: block;
      content: '👇';
   }

   &:hover::after{
      animation: none;
      content: '🤘';
   }

`;

const Hero = styled.header`

   display: flex;
   justify-content: space-evenly;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
   position: relative;
   overflow: hidden;
   z-index: 0;
   background: #030303;
   min-height: 600px;

   @media screen and (min-width: 1024px){ display: block; }

`;