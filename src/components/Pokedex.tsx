import { useState } from 'react';
import styled from 'styled-components';
import showcase from '../assets/pokemons.png';
import pikachu from '../assets/surprised_pika.png';
import { Description, Title } from './styled/common';
import { Container, ButtonsContainer, InfoContainer, Content, Button } from './styled/project';
import { CodeLink } from './CodeLink';
import { DemoLink } from './DemoLink';
import { ProjectShowcase, ShowcaseContainer } from './ProjectShowcase';

export const Pokedex: React.FC = () => {

   const [surprised, setSurprised] = useState(false);

   const surprise = () => {

      if (surprised) return;

      setSurprised(true);
      setTimeout(() => setSurprised(false), 4000);

   };

   return (

      <PokedexContainer>

         <Content>

            <PokedexInfo>

               <Title>React meets Pokémon</Title>
               <Description>This little project is entirely powered by React and nostalgia. All the assets I used in this adorable little app have been provided by the awesome people at PokeAPI.co. It allows users to browse through hundreds of pokémons and check some of their details...yes, even their weight.</Description>

               <ButtonsContainer>
                  <DemoLink link={'http://pokething.surge.sh/'} />
                  <CodeLink link={'https://github.com/AlexTaietti/React-Pokedex'} />
                  <PikachuButton onClick={surprise}>Nah, don't care</PikachuButton>
               </ButtonsContainer>

            </PokedexInfo>

            <ProjectShowcase previewImage={showcase} />

         </Content>

         <SurprisedPikachu surprised={surprised}>
            <PICachu alt='surprised pika' src={pikachu} />
         </SurprisedPikachu>

      </PokedexContainer>

   );

};

const PokedexContainer = styled(Container)`

   background-color: #FF2525;

   ${ShowcaseContainer}{ max-width: 500px; }

   @media screen and (min-width: 1024px){

      ${ShowcaseContainer}{
         max-width: unset;
         flex: 0 0 40%;
      }

   }

`;

const PICachu = styled.img`

   height: 100%;

`;

const PokedexInfo = styled(InfoContainer)`

   ${Title}{ color: white; }

   ${Description}{ color: black; }

`

const SurprisedPikachu = styled.div<{ surprised: boolean }>`

   position: absolute;
   left: 50px;
   top: 100%;
   height: 100px;
   transition: transform .5s;
   transform: ${({ surprised }) => surprised ? 'translateY(-100%)' : 'translateY(0)'};

`;

const PikachuButton = styled(Button)`

   background: #fed530;
   padding: 10px 15px;
   transition-property: background;
   transition-duration: .4s;

   &:hover{ background: #fe9130; }

   @media screen and (max-width: 500px){ display: none; }

`;