import styled from 'styled-components';
import { DescriptionProps } from '../@types';
import { ButtonsContainer } from './ButtonsContainer';


export const Description: React.FC<DescriptionProps> = ({ title, info, demoLink, codeLink, SpecialButton, specialButtonClickHandler }) => {

   return (
      <DescriptionContainer>
         <h1 style={{ color: title.color }}>{title.text}</h1>
         <p style={{ color: info.color }}>{info.text}</p>
         <ButtonsContainer demoLink={demoLink} codeLink={codeLink} SpecialButton={SpecialButton} specialButtonClickHandler={specialButtonClickHandler} />
      </DescriptionContainer>
   );

};

const DescriptionContainer = styled.div`

   max-width: 40%;
   font-family: 'Oswald', serif;

   h1{
      font-size: 4rem;
      margin-bottom: 5px;
      text-shadow: 1px 1px 1px black;
   }

   p{
      font-size: 2rem;
      margin-bottom: 20px;
   }

   @media screen and (min-width: 1440px){

      h1{
         font-size: 4.5rem;
         margin-bottom: 10px;
      }

      p{
         font-size: 2.3rem;
         margin-bottom: 25px;
      }

   }

   @media screen and (max-width: 1200px){
      
      margin-bottom: 70px;
      text-align: center;
      max-width: 50%;

      h1{
         font-size: 4.2rem;
         margin-bottom: 10px;
      }

      p{
         font-size: 2.1rem;
         margin-bottom: 25px;
      }

   }

`;