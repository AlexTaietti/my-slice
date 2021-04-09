import styled from 'styled-components';

export const ProjectContainer: React.FC<{ background?: string }> = ({ children, background = 'white' }) => {

   return (
      <Project background={background}>
         {children}
      </Project>
   );

};

const Project = styled.section`

   display: flex;
   position: relative;
   width: 100%;
   height: 800px;
   background: ${(props: { background: string }) => props.background};
   padding: 10%;
   align-items: center;
   justify-content: space-evenly;
   overflow: hidden;

   @media screen and (min-width: 1440px){ padding: 15%; }

   @media screen and (max-width: 1200px){
      
      padding: 5% 0 10%;
      height: auto;
      flex-direction: column;
   
   }

`;