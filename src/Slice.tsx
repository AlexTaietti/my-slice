import styled from 'styled-components';
import { Header } from './components';

const AppWrapper = styled.div`

   display: block;
   height: 100%;
   width: 100%;
   min-width: 100%;
   min-height: 100%;

`;

export const Slice: React.FC = () => {

   return (
      <AppWrapper>
         <Header />
      </AppWrapper>
   );

};