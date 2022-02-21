import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header, Bio, Footer, Codepen, Taietti, Puppy, Pokedex } from './components';

export const Slice: React.FC = () => {

   const [mobile, setMobile] = useState(window.innerWidth > 1024 ? false : true);

   useEffect(() => {

      const resizeHandler = () => {

         if (window.innerWidth < 1024 && !mobile) setMobile(true);

         if (window.innerWidth >= 1024 && mobile) setMobile(false);

      };

      window.addEventListener('resize', resizeHandler);

      return () => window.removeEventListener('resize', resizeHandler);

   }, [mobile]);

   return (
      <MySlice>
         <Header mobile={mobile} />
         <Bio />
         <ProjectsWrapper>
            <Puppy />
            <Taietti />
            <Codepen />
            <Pokedex />
         </ProjectsWrapper>
         {!mobile && <Footer />}
      </MySlice>
   );

};

const ProjectsWrapper = styled.section`

   position: relative;
   display: block;
   height: auto;
   width: 100%;

`;

const MySlice = styled.div`

   display: block;
   width: 100%;
   height: 100%;

`;