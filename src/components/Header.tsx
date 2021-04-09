import { ParticleText } from './PerlinText';
import { Me } from './Me';
import styled, { keyframes } from 'styled-components';

export const Header: React.FC = () => {

   return (
      <Hero>
         <ParticleText text={"Hellooooo!"} fontSize={190} offset={{ x: 17, y: 25 }} />
         <Me />
         <MoreButton>Some things I made</MoreButton>
      </Hero>
   );

};

const pulse = keyframes`

   0%{ transform: translateX(-50%) translateY(0); }

   15%{ transform: translateX(-50%) translateY(13%); }

   30%{ transform: translateX(-50%) translateY(0); }

`;

const Hero = styled.header`

   display: block;
   width: 100%;
   position: relative;
   overflow: hidden;

`;

const MoreButton = styled.p`

   display: block;
   position: absolute;
   left: 15%;
   bottom: 20%;
   cursor: pointer;
   color: white; 
   font-family: 'Oswald', sans-serif;
   font-size: 2.3rem;

   &::after{
      content: '👇';
      position: absolute;
      left: 50%;
      top: 120%;
      transform: translateX(-50%);
      font-size: 3rem;
      animation-name: ${pulse};
      animation-iteration-count: infinite;
      animation-duration: 3s;
   }

`;