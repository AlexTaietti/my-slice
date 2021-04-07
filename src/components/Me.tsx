import styled from 'styled-components';
import me from '../assets/me.jpg';
import { Bubble } from './Bubble';

const PictureContainer = styled.div`

   width: 300px;
   height: 300px;
   border-radius: 50%;
   background: url(${me});
   background-repeat: no-repeat;
   background-size: cover;
   display: block;
   position: absolute;
   bottom: 15%;
   right: 15%;
   border: 10px solid #cc1929;
   cursor: pointer;

`;

export const Me: React.FC = () => {

   return (
      <PictureContainer>
         <Bubble />
      </PictureContainer>
   );

};