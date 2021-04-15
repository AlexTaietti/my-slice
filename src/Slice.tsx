import styled from 'styled-components';
import { Header, ProjectsContainer, Bio, Pong } from './components';

export const Slice: React.FC = () => {

   return (
      <AppWrapper>
         <Header />
         <Bio />
         <ProjectsContainer />
         <Pong />
      </AppWrapper>
   );

};

const AppWrapper = styled.div`

   display: block;
   width: 100%;
   height: 100%;

`;