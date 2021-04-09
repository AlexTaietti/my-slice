import showcase from '../assets/taietti_showcase.png';
import { ProjectContainer } from './ProjectContainer';
import { Showcase } from './Showcase';
import { Description } from './ProjectDescription';

export const Taietti: React.FC = () => {

   return (

      <ProjectContainer background={'#0f79e8'}>

         <Description

            title={{
               text: "taiettimailbox",
               color: 'white'
            }}

            info={{
               text: "My family’s business’ website. One of the first and oldest things I have built. This website holds a special place in my heart, it made me realise how software can bring tangible value to anyone, anywhere, especially to the people you love.",
               color: 'black'
            }}

            demoLink={'https://www.taiettimailbox.it/'} />

         <Showcase picture={showcase} />

      </ProjectContainer>

   );

};