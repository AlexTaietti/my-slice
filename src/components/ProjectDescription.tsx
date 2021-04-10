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

   @media screen and (max-width: 1200px){
      
      max-width: 60%;
      text-align: center;

      h1{ font-size: 4.5rem; }

      p{ font-size: 2.5rem; }

   }

   @media screen and (max-width: 800px){ max-width: 80%; }

   @media screen and (max-width: 500px){

      h1{ font-size: 3.5rem; }

      p{ font-size: 1.8rem; }

   }

`;