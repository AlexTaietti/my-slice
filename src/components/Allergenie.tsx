import styled from 'styled-components';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content } from './styled/project';
import { DemoLink } from './DemoLink';
import { ShowcaseContainer, ProjectShowcase } from './ProjectShowcase';
import allergenie from '../assets/allergenie.png';

export const Allergenie: React.FC = () => {

    return (

        <AllergenieContainer>

            <Content>

                <AllergenieInfo>

                    <Title>allergenie.co.uk</Title>
                    <Description>A web application I designed from scratch to streamline allergen management for restaurants through an intuitive interface. Built with scalability in mind, the system employs a modular architecture to support future expansions and additional features.</Description>

                    <ButtonsContainer>
                        <DemoLink link={'https://allergenie.co.uk'} />
                    </ButtonsContainer>

                </AllergenieInfo>

                <ProjectShowcase previewImage={allergenie} />

            </Content>

        </AllergenieContainer>

    );

};

const AllergenieContainer = styled(Container)`

   background: #1c1b22;

   ${ShowcaseContainer}{ max-width: 350px; }

   @media screen and (min-width: 1024px){

      ${ShowcaseContainer}{
         max-width: unset;
         flex: 0 0 40%;
      }

   }

`;

const AllergenieInfo = styled(InfoContainer)`

   ${Title}{ color: white; }

   ${Description}{ color: white; }

`;