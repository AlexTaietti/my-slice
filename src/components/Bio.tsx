import styled from 'styled-components';
import { Me } from './Me';
import { Description, Title } from './styled/common';

export const Bio: React.FC = () => {

   return (
      <BioContainer id="bio">
         <Content>
            <TextContainer>
               <Title>About me</Title>
               <Description>A self-taught software engineer with a focus on web development, combining growing technical expertise with strong interpersonal skills from London's hospitality sector. After relocating to London, I transitioned into software engineering, driven by a passion for problem-solving and continuous learning. I'm eager to contribute to meaningful projects while developing my engineering capabilities as part of a collaborative team.</Description>
            </TextContainer>
            <Me />
         </Content>
      </BioContainer>
   );

};

const Content = styled.div`

   display: flex;
   flex-direction: column-reverse;
   justify-content: space-evenly;
   padding: 10%;
   padding-top: calc(10% + 20px);
   align-items: center;
   max-width: 1400px;
   margin: 0 auto;

`;

const TextContainer = styled.div`

   max-width: 80%;
   font-family: 'Oswald', sans-serif;
   font-weight: lighter;

`;

const BioContainer = styled.section`

   position: relative;
   display: block;
   background: rgb(132, 71, 162);
   isolation: isolate;

   ${Title}{ color: #FCFCFC; }

   ${Description}{ color: black; }

   @media screen and (min-width: 1024px){

      ${Content}{
         min-height: 650px;
         padding: 5%;
         flex-direction: row;
      }

      ${TextContainer}{ max-width: 45%; }

   }

`;