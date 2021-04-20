import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Header, ProjectsContainer, Bio, Footer } from './components';

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
      <AppWrapper>
         <Header mobile={mobile} />
         <Bio />
         <ProjectsContainer />
         {!mobile && <Footer />}
      </AppWrapper>
   );

};

const AppWrapper = styled.div`

   display: block;
   width: 100%;
   height: 100%;

`;