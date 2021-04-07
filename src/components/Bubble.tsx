import styled from 'styled-components';
import { Arrow } from './Arrow';

const TextContainer = styled.div`

   position: absolute;
   right: 112%;
   top: 80%;
   color: white;
   z-index: 1;
   font-size: 2rem;
   white-space:nowrap;
   font-family: 'Oswald', serif;

   svg{
      width: 40px;
      height: 30px;
      fill: none;
      stroke: white;
   }

`;

const ArrowContainer = styled.span`
   
   position: absolute;
   left: 100%;
   bottom: 10%;

`;

export const Bubble: React.FC = () => {

   return (
      <TextContainer>
         <span>That's me, Alex!</span>
         <ArrowContainer>
            <Arrow />
         </ArrowContainer>
      </TextContainer>
   );

};