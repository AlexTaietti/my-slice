import styled from 'styled-components';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content } from './styled/project';
import { DemoLink } from './DemoLink';
import { ShowcaseContainer, ProjectShowcase } from './ProjectShowcase';
import tronchet from '../assets/tronchet.png';

export const TronchetLabs: React.FC = () => {

    return (

        <TronchetLabsContainer>

            <Content>

                <TronchetLabsInfo>

                    <Title>tronchetlabs.io</Title>
                    <Description>A custom-built platform hosting my weekly cybersecurity analysis and writeups. I developed this website from the ground up, managing every aspect from frontend to backend. Maintaining my own VPS has provided valuable hands-on experience with system administration and production environment best practices.</Description>

                    <ButtonsContainer>
                        <DemoLink link={'http://tronchetlabs.io'} />
                    </ButtonsContainer>

                </TronchetLabsInfo>

                <ProjectShowcase previewImage={tronchet} />

            </Content>

        </TronchetLabsContainer>

    );

};

const TronchetLabsContainer = styled(Container)`

   background-color: rgb(121, 172, 74);

   ${ShowcaseContainer}{ max-width: 350px; }

   @media screen and (min-width: 1024px){

      ${ShowcaseContainer}{
         max-width: unset;
         flex: 0 0 40%;
      }

   }

`;

const TronchetLabsInfo = styled(InfoContainer)`

   ${Title}{ color: white; }

   ${Description}{ color: black; }

`;