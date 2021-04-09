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
   height: 100vh;
   background: ${(props: { background: string }) => props.background};
   padding: 10%;
   align-items: center;
   justify-content: space-between;
   overflow: hidden;

`;