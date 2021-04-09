import styled from 'styled-components';
import me from '../assets/me.jpg';
import { Bubble } from './Bubble';

export const Me: React.FC = () => {

   return (
      <MeContainer>
         <Bubble />
      </MeContainer>
   );

};

const MeContainer = styled.div`

   display: block;
   position: absolute;
   width: 300px;
   height: 300px;
   bottom: 15%;
   right: 15%;
   border: 10px solid #cc1929;
   border-radius: 50%;
   background: url(${me});
   background-repeat: no-repeat;
   background-size: cover;
   cursor: pointer;

`;