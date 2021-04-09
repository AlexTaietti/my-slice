import styled from 'styled-components'
import { Spoofify } from './Spoofify';
import { Pokedex } from './Pokedex';
import { Taietti } from './Taietti';

export const ProjectsContainer: React.FC = () => {

   return (
      <ProjectsWrapper>
         <Spoofify />
         <Pokedex />
         <Taietti />
      </ProjectsWrapper>
   );

};

const ProjectsWrapper = styled.main`

   display: block;
   position: relative;
   width: 100%;

   section:nth-child(odd){ flex-direction: row-reverse; }

`;