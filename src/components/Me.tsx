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
   width: 300px;
   height: 300px;
   border: 10px solid #cc1929;
   border-radius: 50%;
   background: url(${me});
   background-repeat: no-repeat;
   background-size: cover;
   margin-left: 50px;
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
      text-shadow: 1px 1px 1px black;
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

   @media screen and (max-width: 1024px){

      display: block;
      position: relative;
      top: 0;
      left: 0;
      pointer-events: none;
      margin-left: 0;
      margin-bottom: 50px;

      .letter{

         transition: none;

         &:nth-of-type(1) { transform: translate(77px,-179px) rotateZ(33deg); }

         &:nth-of-type(2) { transform: translate(119px,-148px) rotateZ(49deg); }

         &:nth-of-type(3) { transform: translate(143px,-111px) rotateZ(63deg); }

         &:nth-of-type(4) { transform: translate(158px,-66px) rotateZ(78deg); }

      }

   }

   @media screen and (max-width: 600px){

      width: 250px;
      height: 250px;

      .letter{

         &:nth-of-type(1) { transform: translate(72px,-152px) rotateZ(35deg); }

         &:nth-of-type(2) { transform: translate(108px,-124px) rotateZ(51deg); }

         &:nth-of-type(3) { transform: translate(127px,-92px) rotateZ(64deg); }

         &:nth-of-type(4) { transform: translate(136px,-55px) rotateZ(81deg); }

      }

   }

`;