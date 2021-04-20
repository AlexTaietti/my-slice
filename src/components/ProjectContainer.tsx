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

   @media screen and (max-width: 1200px){
      flex-direction: column;
      height: auto;
      padding: 10% 0;
   }

   @media screen and (min-width: 1500px){ max-height: 1000px; }

`;