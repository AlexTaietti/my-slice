import styled from 'styled-components';
import { Me } from './Me';
import { Description, Title } from './styled/common';

export const Bio: React.FC = () => {

   return (
      <BioContainer id="bio">
         <Content>
            <TextContainer>
               <Title>About me</Title>
               <Description>I am a self-taught developer who wants to become a world class software engineer. I’m willing to roll-up my sleeves and do whatever the job requires to gain hands-on experience and learn from an amazing team. Right after high-school I moved to London on my own in search of opportunity and personal development, and have since had the chance to hone my customer service skills in some of the city’s best restaurants while transitioning into the field I am most passionate about: software engineering.</Description>
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
   background: #a10fe8;
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