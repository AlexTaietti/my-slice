import styled from 'styled-components';
import { DemoLink } from './DemoLink';
import { CodeLink } from './CodeLink';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content } from './styled/project';
import { DeviceCarousel, Carousel } from './DeviceCarousel';
import lightTheme from '../assets/genres_view.png';
import likedView from '../assets/liked_songs_view.png';
import darkTheme from '../assets/dark_theme_lighter.png';

export const Spoofify: React.FC = () => {

   const musicAppScreenshots = [darkTheme, lightTheme, likedView]

   return (

      <SpoofifyContainer>

         <Content>

            <SpoofifyInfo>

               <Title>A Spotify spoof</Title>
               <Description>This spotify clone is one of the projects I am most proud of, it includes playback functionality, dark/light theme switch and a whole suite of features inspired by the original app.</Description>

               <ButtonsContainer>
                  <DemoLink link={'https://sprintt-music.netlify.app/'} />
                  <CodeLink link={'https://github.com/AlexTaietti/spotify'} />
               </ButtonsContainer>

            </SpoofifyInfo>

            <DeviceCarousel deviceType='desktop' arrowColor='black' images={musicAppScreenshots} />

         </Content>

      </SpoofifyContainer>

   );

};

const SpoofifyContainer = styled(Container)`

   background-color: #FCFCFC;

   ${Carousel}{ width: 80%; }

   @media screen and (min-width: 1024px){

      ${Carousel}{
         flex: 0 0 55%;
         width: unset;
      }

   }

`;

const SpoofifyInfo = styled(InfoContainer)`

   ${Title}{ color: #5DD382; }

   ${Description}{ color: black; }

`;