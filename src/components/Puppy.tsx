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

               <Title>pup.py</Title>
               <Description>A Wikipedia pathway finder that leverages natural language processing and cosine similarity algorithms to discover connections between any two English Wikipedia articles. By implementing fundamental text processing techniques, the application maps meaningful paths through Wikipedia's vast knowledge network.</Description>

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

   background-color:rgb(236, 199, 113);

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