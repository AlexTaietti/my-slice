import styled from 'styled-components';
import me from '../assets/me.jpg';

export const Me: React.FC = () => {

   return (
      <Container>
         <Letter>A</Letter>
         <Letter>L</Letter>
         <Letter>E</Letter>
         <Letter>X</Letter>
      </Container>
   );

};

const Letter = styled.span`

   display: block;
   position: absolute;
   top: 50%;
   left: 50%;
   transition: transform 1s;
   font-size: 3.5rem;
   font-family: 'Oswald', sans-serif;
   color: white;
   text-shadow: 1px 1px 1px black;
   z-index: -1;

`;

const Container = styled.div`

   display: block;
   position: relative;
   width: 210px;
   height: 210px;
   border: 7px solid #cc1929;
   border-radius: 50%;
   margin-bottom: 16px;
   background: url(${me});
   background-repeat: no-repeat;
   background-size: cover;
   pointer-events: none;

   ${Letter}:nth-of-type(1) { transform: translate(33px,-144px) rotateZ(23deg); }
   ${Letter}:nth-of-type(2) { transform: translate(64px,-130px) rotateZ(38deg); }
   ${Letter}:nth-of-type(3) { transform: translate(87px,-111px) rotateZ(50deg); }
   ${Letter}:nth-of-type(4) { transform: translate(103px,-85px) rotateZ(62deg); }

   &:hover{

      ${Letter}:nth-of-type(1) { transform: translate(60px,-184px) rotateZ(26deg); }
      ${Letter}:nth-of-type(2) { transform: translate(102px,-160px) rotateZ(44deg); }
      ${Letter}:nth-of-type(3) { transform: translate(132px,-129px) rotateZ(56deg); }
      ${Letter}:nth-of-type(4) { transform: translate(151px,-92px) rotateZ(71deg); }

   }
   
   @media screen and (min-width: 600px){

      width: 300px;
      height: 300px;

      ${Letter}:nth-of-type(1) { transform: translate(60px,-184px) rotateZ(26deg); }
      ${Letter}:nth-of-type(2) { transform: translate(102px,-160px) rotateZ(44deg); }
      ${Letter}:nth-of-type(3) { transform: translate(132px,-129px) rotateZ(56deg); }
      ${Letter}:nth-of-type(4) { transform: translate(151px,-92px) rotateZ(71deg); }
   
   }

   @media screen and (min-width: 1024px){

      margin-left: 50px;
      margin-bottom: 0;
      cursor: pointer;
      pointer-events: all;

      ${Letter}:nth-of-type(1) { transform: none; }
      ${Letter}:nth-of-type(2) { transform: none; }
      ${Letter}:nth-of-type(3) { transform: none; }
      ${Letter}:nth-of-type(4) { transform: none; }

   }

`;