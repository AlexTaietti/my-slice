import styled from 'styled-components';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content } from './styled/project';
import { DemoLink } from './DemoLink';
import { CodeLink } from './CodeLink';
import coinsList from '../assets/crypto-list.png';
import coinsDetails from '../assets/crypto-details.png';
import { DeviceCarousel, Carousel } from './DeviceCarousel';

export const Crypto: React.FC = () => {

   const cryptoScreenshots = [coinsList, coinsDetails];

   return (

      <CryptoContainer>

         <Content>

            <CryptoInfo>

               <Title>Crypto tracker</Title>
               <Description>Like most of my other projects, this mobile app is built with React, styled-components and Typescript. It enables its users to watch in awe as Dodgecoin soars to the moon...any day now 💎🙌</Description>

               <ButtonsContainer>
                  <DemoLink link={'https://sprintt-crypto-tracker.netlify.app'} />
                  <CodeLink link={'https://github.com/AlexTaietti/crypto-tracker'} />
               </ButtonsContainer>

            </CryptoInfo>

            <DeviceCarousel deviceType='mobile' arrowColor='#FCFCFC' images={cryptoScreenshots} />

         </Content>

      </CryptoContainer>

   );

};

const CryptoContainer = styled(Container)`

   background-color: rgb(79, 30, 124);

   ${Carousel}{ width: 200px; }

   @media screen and (min-width: 1024px){

      ${Carousel}{
         flex: 0 0 270px;
         width: unset;
      }

   }

`;

const CryptoInfo = styled(InfoContainer)`

   ${Title}{ color: white; }

   ${Description}{ color: white; }

`;