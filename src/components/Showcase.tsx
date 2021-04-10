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

   @media screen and (max-width: 1200px) { max-width: 70%; }

   @media screen and (max-width: 1024px) { width: 80%; }

`;