import styled from 'styled-components';
import { ParticleText } from './PerlinText';
import { Me } from './Me';

const Hero = styled.header`

   display: block;
   height: 100%;
   width: 100%;
   position: relative;
   overflow: hidden;

`;

export const Header: React.FC = () => {

   return (
      <Hero>
         <ParticleText text={"Hellooooo!"} fontSize={180} fontFamily={'Pacifico'} offset={{ x: 15, y: 20 }} />
         <Me />
      </Hero>
   );

};