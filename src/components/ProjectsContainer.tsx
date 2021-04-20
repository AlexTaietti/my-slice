import styled from 'styled-components'
import { Spoofify } from './Spoofify';
import { Pokedex } from './Pokedex';
import { Taietti } from './Taietti';

export const ProjectsContainer: React.FC = () => {

   return (
      <ProjectsWrapper>
         <Spoofify />
         <Taietti />
         <Pokedex />
      </ProjectsWrapper>
   );

};

const ProjectsWrapper = styled.main`

   display: block;
   position: relative;
   width: 100%;

   section:nth-child(odd){ flex-direction: row-reverse; }

   @media screen and (max-width: 1200px){
      
      section:nth-child(odd){ flex-direction: column; }
   
   }

`;