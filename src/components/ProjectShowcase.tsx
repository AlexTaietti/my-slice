import styled from "styled-components";

export const ProjectShowcase: React.FC<{ previewImage: string }> = ({ previewImage }) => {

   return (
      <ShowcaseContainer>
         <ProjectPreviewImage src={previewImage} alt='project preview' />
      </ShowcaseContainer>
   );

}

export const ShowcaseContainer = styled.div`

   display: block;
   position: relative;

`;

const ProjectPreviewImage = styled.img`

   display: block;
   width: 100%;

`;