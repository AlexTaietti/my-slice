import styled from 'styled-components';
import me from '../assets/me.jpg';

export const Me: React.FC = () => {

   return (
      <MeContainer>
         <span className='letter'>A</span>
         <span className='letter'>L</span>
         <span className='letter'>E</span>
         <span className='letter'>X</span>
      </MeContainer>
   );

};

const MeContainer = styled.div`

   display: block;
   position: relative;
   width: 250px;
   height: 250px;
   border: 10px solid #cc1929;
   border-radius: 50%;
   background: url(${me});
   background-repeat: no-repeat;
   background-size: cover;
   pointer-events: none;

   .letter{

      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transition: transform 1s;
      font-size: 4rem;
      font-family: 'Oswald', sans-serif;
      color: white;
      text-shadow: 1px 1px 1px black;
      z-index: -1;

      &:nth-of-type(1) { transform: translate(60px,-158px) rotateZ(31deg); }
      &:nth-of-type(2) { transform: translate(93px,-137px) rotateZ(46deg); }
      &:nth-of-type(3) { transform: translate(115px,-111px) rotateZ(58deg); }
      &:nth-of-type(4) { transform: translate(129px,-80px) rotateZ(70deg); }


   }

   &:hover{

      .letter{

         &:nth-of-type(1) { transform: translate(60px,-184px) rotateZ(26deg); }
         &:nth-of-type(2) { transform: translate(102px,-160px) rotateZ(44deg); }
         &:nth-of-type(3) { transform: translate(132px,-129px) rotateZ(56deg); }
         &:nth-of-type(4) { transform: translate(151px,-92px) rotateZ(71deg); }

      }

   }
   
   @media screen and (min-width: 600px){

      width: 300px;
      height: 300px;

      .letter{

         &:nth-of-type(1) { transform: translate(60px,-184px) rotateZ(26deg); }
         &:nth-of-type(2) { transform: translate(102px,-160px) rotateZ(44deg); }
         &:nth-of-type(3) { transform: translate(132px,-129px) rotateZ(56deg); }
         &:nth-of-type(4) { transform: translate(151px,-92px) rotateZ(71deg); }

      }
   
   }

   @media screen and (min-width: 1024px){

      position: relative;
      top: 0;
      left: 0;
      margin-left: 50px;
      margin-left: 50px;
      margin-bottom: 50px;
      cursor: pointer;
      pointer-events: all;
      
      .letter{

         &:nth-of-type(1) { transform: none; }
         &:nth-of-type(2) { transform: none; }
         &:nth-of-type(3) { transform: none; }
         &:nth-of-type(4) { transform: none; }

      }

   }

`;