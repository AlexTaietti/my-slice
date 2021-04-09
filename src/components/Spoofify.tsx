import showcase from '../assets/spoofify_showcase.png';
import { ProjectContainer } from './ProjectContainer';
import { Showcase } from './Showcase';
import { Description } from './ProjectDescription';

export const Spoofify: React.FC = () => {

   return (

      <ProjectContainer background={'#FFFFFF'}>

         <Description

            title={{
               text: "A Spotify spoof",
               color: '#5DD382'
            }}

            info={{
               text: "The biggest front end project I have taken on so far. This app includes playback functionality, dark/light theme switch and a whole suite of features inspired by the original app.",
               color: 'black'
            }}

            demoLink={'https://sprintt-music.netlify.app/'}

            codeLink={'https://github.com/AlexTaietti/spotify'} />

         <Showcase picture={showcase} />

      </ProjectContainer>

   );

};