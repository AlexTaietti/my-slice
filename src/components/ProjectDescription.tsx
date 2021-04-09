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

   max-width: 45%;
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

`;