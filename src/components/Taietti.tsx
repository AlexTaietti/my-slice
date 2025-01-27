import styled from 'styled-components';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content } from './styled/project';
import { ProjectShowcase, ShowcaseContainer } from './ProjectShowcase';
import showcase from '../assets/taietti_screens.png';
import { DemoLink } from './DemoLink';

export const Taietti: React.FC = () => {

   return (

      <TaiettiContainer>

         <Content>

            <TaiettiInfo>

               <Title>taiettimailbox</Title>
               <Description>My family’s business’ website. One of the first and oldest things I have built. This website holds a special place in my heart, it made me realise how software can bring tangible value to anyone, anywhere, especially to the people you love.</Description>

               <ButtonsContainer>
                  <DemoLink link={'https://www.taiettimailbox.it/'} />
               </ButtonsContainer>

            </TaiettiInfo>

            <ProjectShowcase previewImage={showcase} />

         </Content>

      </TaiettiContainer>

   );

};

const TaiettiContainer = styled(Container)`

   background-color: rgb(82, 140, 200);
   
   ${ShowcaseContainer}{ width: 95%; }

   @media screen and (min-width: 480px){

      ${ShowcaseContainer}{ width: 80%; }

   }

   @media screen and (min-width: 1024px){

      ${ShowcaseContainer}{ flex: 0 0 50%; }

   }

`;

const TaiettiInfo = styled(InfoContainer)`

   ${Title}{ color: #FCFCFC; }

   ${Description}{ color: black; }

`;