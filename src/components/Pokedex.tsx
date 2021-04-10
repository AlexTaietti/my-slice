import { useState } from 'react';
import styled from 'styled-components';
import showcase from '../assets/pokemon_showcase.png';
import pikachu from '../assets/surprised_pika.png';
import { ProjectContainer } from './ProjectContainer';
import { Showcase } from './Showcase';
import { PikachuButton } from './PikachuButton';
import { Description } from './ProjectDescription';


export const Pokedex: React.FC = () => {

   const [surprised, setSurprised] = useState(false);

   const surprise = () => {

      if (surprised) return;

      setSurprised(true);

      setTimeout(() => setSurprised(false), 4000);

   };

   return (

      <ProjectContainer background={'#EE2E2E'}>

         <Description
            title={{ text: "React meets Pokémon", color: 'white' }}
            info={{ text: "This little project is entirely powered by React and nostalgia. All the assets I used in this adorable little app have been provided by the awesome people at PokeAPI.co. It allows users to browse through hundreds of pokémons and check some of their details...yes, even their weight.", color: 'black' }}
            demoLink={'http://pokething.surge.sh/'}
            codeLink={'https://github.com/AlexTaietti/React-Pokedex'}
            SpecialButton={PikachuButton}
            specialButtonClickHandler={surprise} />

         <Showcase picture={showcase} />

         <SurprisedPikachu className={surprised ? 'surprised' : 'happy'}>
            <img alt='surprised pika' src={pikachu} />
         </SurprisedPikachu>

      </ProjectContainer>

   );

};

const SurprisedPikachu = styled.div`

   position: absolute;
   left: 50px;
   top: 100%;
   height: 100px;
   transition: transform .5s;
   transform: translateY(0);

   img{ height: 100%; }

   &.surprised{ transform: translateY(-100%); }

`;