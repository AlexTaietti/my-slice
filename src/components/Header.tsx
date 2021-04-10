import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { ParticleText } from './PerlinText';
import { Me } from './Me';

export const Header: React.FC = () => {

   const [mobile, setMobile] = useState(window.innerWidth > 1024 ? false : true);

   useEffect(() => {

      const resizeHandler = () => {

         if (window.innerWidth < 1024 && !mobile) setMobile(true);

         if (window.innerWidth >= 1024 && mobile) setMobile(false);

      };

      window.addEventListener('resize', resizeHandler);

      return () => window.removeEventListener('resize', resizeHandler);

   }, [mobile]);

   const scrollToFirstProject = () => {

      const firstProjectOffset = (document.getElementById('projects') as HTMLDivElement).getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
         top: firstProjectOffset,
         behavior: 'smooth'
      });

   };

   return (
      <Hero>
         { !mobile ? <ParticleText text={"Hellooooo!"} fontSize={180} offset={{ x: 17, y: 25 }} /> : <h1>Hellooo!</h1>}
         <Me />
         <MoreButton onClick={scrollToFirstProject}>Things I made</MoreButton>
      </Hero>
   );

};

const pulse = keyframes`

   0%{ transform: translateX(-50%) translateY(0); }

   15%{ transform: translateX(-50%) translateY(6px); }

   30%{ transform: translateX(-50%) translateY(0); }

`;

const Hero = styled.header`

   display: block;
   width: 100%;
   height: 100%;
   position: relative;
   overflow: hidden;
   z-index: 0;
   background: #030303;

   @media screen and (max-width: 1024px) {

      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      align-items: center;
      padding: 0 0 5%;

      h1{
         font-family: 'Pacifico', sans-serif;
         font-size: 12rem;
         color: #0874F7;
      }

   }

`;

const MoreButton = styled.p`

   display: block;
   position: absolute;
   left: 15%;
   bottom: 20%;
   cursor: pointer;
   color: white;
   font-family: 'Oswald', sans-serif;
   font-size: 2.5rem;

   &::after{
      content: '👇';
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      animation-name: ${pulse};
      animation-iteration-count: infinite;
      animation-duration: 3s;
   }

   @media screen and (max-width: 1024px) {
      
      font-size: 4rem;
      position: relative;
      left: 0;
      bottom: 0;

      &::after{
         position: relative;
         margin-left: 10px;
         left: 0;
         top: 0;
      }

   }

`;