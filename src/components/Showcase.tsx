import styled from 'styled-components';

export const Showcase: React.FC<{ picture: string }> = ({ picture }) => {

   return (
      <ShowcaseContainer>
         <img src={picture} alt='project showcase' />
      </ShowcaseContainer>
   );

};

const ShowcaseContainer = styled.div`

   max-width: 45%;

   img{ width: 100%; }

   @media screen and (max-width: 800px){ max-width: 65%; }

   @media screen and (min-width: 1500px){ max-width: 30%; }

`;