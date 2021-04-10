import styled from 'styled-components';
import me from '../assets/me.jpg';
import { Bubble } from './Bubble';

export const Me: React.FC = () => {

   return (
      <MeContainer>
         <span className='letter'>A</span>
         <span className='letter'>L</span>
         <span className='letter'>E</span>
         <span className='letter'>X</span>
         <Bubble />
      </MeContainer>
   );

};

const MeContainer = styled.div`

   display: block;
   position: absolute;
   width: 300px;
   height: 300px;
   bottom: 15%;
   right: 15%;
   border: 10px solid #cc1929;
   border-radius: 50%;
   background: url(${me});
   background-repeat: no-repeat;
   background-size: cover;
   cursor: pointer;

   .letter{

      display: inline-block;
      position: absolute;
      top: 50%;
      left: 50%;
      transition: transform 1s;
      font-size: 4rem;
      font-family: 'Oswald', sans-serif;
      color: white;
      z-index: -1;

      &:nth-of-type(1) { transform: translate(-50%, -50%) rotateZ(33deg); }

      &:nth-of-type(2) { transform: translate(-50%, -50%) rotateZ(49deg); }

      &:nth-of-type(3) { transform: translate(-50%, -50%) rotateZ(63deg); }

      &:nth-of-type(4) { transform: translate(-50%, -50%) rotateZ(78deg); }

   }

   &:hover{
      
      .letter{

         &:nth-of-type(1) { transform: translate(78px,-179px) rotateZ(33deg); }

         &:nth-of-type(2) { transform: translate(119px,-148px) rotateZ(49deg); }

         &:nth-of-type(3) { transform: translate(143px,-111px) rotateZ(63deg); }

         &:nth-of-type(4) { transform: translate(158px,-66px) rotateZ(78deg); }

      }

   }

   @media screen and (max-width: 1024px) {
      
      position: relative;
      width: 450px;
      height: 450px;
      bottom: 0;
      right: 0;

      .letter{

         font-size: 5rem;
         transition-duration: .8s;

         &:nth-of-type(1) { transform: translate(166px,-218px) rotateZ(47deg); }

         &:nth-of-type(2) { transform: translate(204px,-173px) rotateZ(56deg); }

         &:nth-of-type(3) { transform: translate(228px,-120px) rotateZ(68deg); }

         &:nth-of-type(4) { transform: translate(238px,-66px) rotateZ(84deg); }

      }
   
   }

`;