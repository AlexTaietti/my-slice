import styled, { keyframes } from 'styled-components';
import { useState, useEffect } from 'react';
import { ParticleText } from './PerlinText';
import { Me } from './Me';

export const Header: React.FC = () => {

   const [mobile, setMobile] = useState(window.innerWidth > 1024 ? false : true);

   const [phone, setPhone] = useState(window.innerWidth > 500 ? false : true);

   useEffect(() => {

      const resizeHandler = () => {

         if (window.innerWidth < 1024 && !mobile) setMobile(true);

         if (window.innerWidth >= 1024 && mobile) setMobile(false);

         if (window.innerWidth < 500 && !phone) setPhone(true);

         if (window.innerWidth >= 500 && phone) setPhone(false);

      };

      window.addEventListener('resize', resizeHandler);

      return () => window.removeEventListener('resize', resizeHandler);

   }, [mobile, phone]);

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
         { !phone ? <MoreButton onClick={scrollToFirstProject}>Things I made</MoreButton> : <span onClick={scrollToFirstProject}>👇</span>}
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
   min-height: 600px;

   @media screen and (max-width: 1024px){

      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      align-items: center;

      h1{
         font-size: 8rem;
         text-align: center;
         font-family: 'Pacifico', sans-serif;
         color: rgb(8, 116, 247);
      }

   }

   & > span { font-size: 3rem; }

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

   @media screen and (max-width: 1024px){

      display: block;
      text-align: center;
      position: relative;
      top: 0;
      left: 0;
      font-size: 3rem;

      &::after{
         position: relative;
         left: 0;
         top: 0;
         margin-left: 10px;
         transform: none;
         animation: none;
      }

   }

`;