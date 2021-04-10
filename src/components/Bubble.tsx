import styled from 'styled-components';
import { Arrow } from './Arrow';

export const Bubble: React.FC = () => {

   return (
      <BubbleContainer>
         <span>That's me!</span>
         <ArrowContainer>
            <Arrow />
         </ArrowContainer>
      </BubbleContainer>
   );

};

const BubbleContainer = styled.p`

   position: absolute;
   right: 112%;
   top: 80%;
   color: white;
   font-size: 2rem;
   white-space:nowrap;
   font-family: 'Oswald', serif;
   cursor: default;

   svg{
      width: 40px;
      height: 30px;
      fill: none;
      stroke: white;
   }

   @media screen and (max-width: 1024px) { font-size: 3rem; }

`;

const ArrowContainer = styled.span`
   
   position: absolute;
   left: 100%;
   bottom: 10%;

`;