import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { ParticleText } from './PerlinText';

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

   const scrollToBio = () => {

      const bio = (document.getElementById('bio') as HTMLDivElement).getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
         top: bio,
         behavior: 'smooth'
      });

   };

   return (
      <Hero>
         { !mobile ? <ParticleText text={"Hellooooo!"} fontSize={180} /> : <h1>Hellooo!</h1>}
         <span onClick={scrollToBio} />
      </Hero>
   );

};

const Hero = styled.header`

   display: block;
   width: 100%;
   height: 100%;
   position: relative;
   overflow: hidden;
   z-index: 0;
   background: #030303;
   min-height: 600px;

   span{

      font-size: 2.5rem;
      position: absolute;
      bottom: 3%;
      left: 50%;
      display: inline-block;
      transform: translateX(-50%);
      cursor: pointer;

      &::after{ content: '👇'; }

      &:hover::after{ content: '🤘'; }

   }

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

`;