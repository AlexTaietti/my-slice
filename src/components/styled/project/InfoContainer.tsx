import styled from "styled-components";
import { ButtonsContainer } from './ButtonsContainer'

export const InfoContainer = styled.div`

   font-family: 'Oswald', serif;
   text-align: center;
   margin-bottom: 30px;

   @media screen and (min-width: 768px){ max-width: 70%; }

   @media screen and (min-width: 1024px){

      text-align: left;
      max-width: 40%;
      margin-bottom: 0;
      
      ${ButtonsContainer}{
         justify-content: start;
         margin-bottom: 0;
      }

   }

`;