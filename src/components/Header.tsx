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
         { !mobile ? <ParticleText text={"Hellooooo!"} fontSize={180} /> : <h1>Hellooo!</h1>}
         <span onClick={scrollToBio}>Get to know me</span>
      </Hero>
   );

};

const pulse = keyframes`

   0%{ transform: translateY(0px); }

   20%{ transform: translateY(10px); }

   40%{ transform: translateY(0px); }

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

   span{

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