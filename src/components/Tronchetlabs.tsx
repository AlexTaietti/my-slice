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
                    <Description>My lab, a website that I have developed completely from scratch to house my weekly cybersecurity writeups. Every layer of this app is hand made and maintained by me, looking after my very own vps is teaching me plenty about system administration as well as best practices employed in production environments.</Description>

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

   background-color: #70e902;

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