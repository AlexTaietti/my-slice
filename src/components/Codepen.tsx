import styled from 'styled-components';
import { DemoLink } from './DemoLink';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content } from './styled/project';
import { DeviceCarousel, Carousel } from './DeviceCarousel';
import bubbles from '../assets/bubbles.gif';
import buttons from '../assets/buttons.gif';
import player from '../assets/player.gif';

export const Codepen: React.FC = () => {

   const codepenPics = [bubbles, player, buttons];

   return (

      <CodepenContainer>

         <Content>

            <CodepenInfo>

               <Title>Codepen</Title>
               <Description>My Codepen portfolio showcases interactive frontend experiments, from an intuitive analog-binary clock to physics simulations and CSS explorations. These projects demonstrate creative problem-solving while experimenting with modern web technologies.</Description>

               <ButtonsContainer>
                  <DemoLink link={'https://codepen.io/AlexTaietti'} />
               </ButtonsContainer>

            </CodepenInfo>

            <DeviceCarousel deviceType='desktop' arrowColor='black' images={codepenPics} />

         </Content>

      </CodepenContainer>

   );

};

const CodepenContainer = styled(Container)`

   background-color: rgb(132, 85, 176);

   ${Carousel}{ width: 80%; }

   @media screen and (min-width: 1024px){

      ${Carousel}{
         flex: 0 0 55%;
         width: unset;
      }

   }

`;

const CodepenInfo = styled(InfoContainer)`

   ${Title}{ color: white; }

   ${Description}{ color: black; }

`;