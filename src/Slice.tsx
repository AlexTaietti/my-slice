import styled from 'styled-components';
import { Header } from './components';
import { ProjectsContainer } from './components';

export const Slice: React.FC = () => {

   return (
      <AppWrapper>
         <Header />
         <ProjectsContainer />
      </AppWrapper>
   );

};

const AppWrapper = styled.div`

   display: block;
   width: 100%;
   overflow: hidden;

`;