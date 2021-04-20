import styled from 'styled-components';
import { ButtonsContainerProps } from '../@types';
import { CodeLink } from './CodeLink';
import { DemoLink } from './DemoLink';

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({ demoLink, specialButtonText, codeLink, SpecialButton, specialButtonClickHandler }) => {

   return (
      <Container>
         <DemoLink link={demoLink} />
         { codeLink && <CodeLink link={codeLink} />}
         { SpecialButton ? specialButtonClickHandler ? <SpecialButton handleClick={specialButtonClickHandler}>{specialButtonText}</SpecialButton> : <SpecialButton>{specialButtonText}</SpecialButton> : null}
      </Container>
   );

};

const Container = styled.div`

   display: flex;
   flex-wrap: nowrap;

   button{
      
      white-space: nowrap;
      border-radius: 5px;
      font-size: 1.5rem;

      a{
         display: inline-flex;
         align-items: center;
         padding: 10px 15px;
      }

      &:not(:last-of-type){ margin-right: 10px; }

   }

   @media screen and (max-width: 1200px){
      justify-content: center;
      margin-bottom: 30px;
   }

`;