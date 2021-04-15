import styled from 'styled-components';
import { Me } from './Me';

export const Bio: React.FC = () => {

   return (
      <BioContainer id="bio">
         <div className='text'>
            <h1>About me</h1>
            <p>I am a self-taught developer who wants to become a world class software engineer. I’m willing to roll-up my sleeves and do whatever the job requires to gain hands-on experience and learn from an amazing team. Right after high-school I moved to London on my own in search of opportunity and personal development, and have since had the chance to hone my customer service skills in some of the city’s best restaurants while transitioning into the field I am most passionate about: software engineering.</p>
         </div>
         <Me />
      </BioContainer>
   );

};

const BioContainer = styled.section`

   display: flex;
   position: relative;
   align-items: center;
   justify-content: center;
   width: 100%;
   padding: 15% 0;
   background: #0f79e8;
   z-index: -2;

   .text{

      max-width: 45%;
      font-family: 'Oswald', sans-serif;
      font-weight: lighter;

      h1{
         font-size: 4rem;
         color: white;
         text-shadow: 1px 1px 1px black;
      }

      p{
         font-size: 2rem;
      }

   }

   @media screen and (max-width: 1024px){

      flex-direction: column-reverse;

      .text{
         max-width: 75%;
      }

   }

`;