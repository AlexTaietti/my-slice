import styled from 'styled-components';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content } from './styled/project';
import { CodeLink } from './CodeLink';
import { ShowcaseContainer, ProjectShowcase } from './ProjectShowcase';
import puppy from '../assets/puppy.png';

export const Puppy: React.FC = () => {

   return (

      <PuppyContainer>

         <Content>

            <PuppyInfo>

               <Title>Puppy</Title>
               <Description>This is a web crawler I built using the amazing puppeteer.js library, Typescript and whole lot of Promises. A very educational project that has taught me plenty of unexpected lessons about the Web.</Description>

               <ButtonsContainer>
                  <CodeLink link={'https://github.com/AlexTaietti/puppy'} />
               </ButtonsContainer>

            </PuppyInfo>

            <ProjectShowcase previewImage={puppy} />

         </Content>

      </PuppyContainer>

   );

};

const PuppyContainer = styled(Container)`

   background-color: #FFBE25;

   ${ShowcaseContainer}{ max-width: 350px; }

   @media screen and (min-width: 1024px){

      ${ShowcaseContainer}{
         max-width: unset;
         flex: 0 0 40%;
      }

   }

`;

const PuppyInfo = styled(InfoContainer)`

   ${Title}{ color: white; }

   ${Description}{ color: black; }

`;