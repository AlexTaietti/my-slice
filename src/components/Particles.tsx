import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SeekerParticles } from '../classes/SeekerParticles';

export const Particles: React.FC = () => {

   const canvasContainer = useRef<HTMLDivElement>(null);
   const seekerParticles = useRef<SeekerParticles>();

   const handleResize = () => seekerParticles.current?.resize();

   useEffect(() => {

      seekerParticles.current = new SeekerParticles(canvasContainer.current);

      seekerParticles.current.animate();

      //intersection obserever to switch off animation when header is out of the viewport
      const observer = new IntersectionObserver((entry) => {

         if (seekerParticles.current) {
            if (entry[0].isIntersecting && seekerParticles.current.idle) { seekerParticles.current.resume(); }
            if (!entry[0].isIntersecting) { seekerParticles.current.stop(); }
         }

      });

      if (canvasContainer.current) observer.observe(canvasContainer.current);

      window.addEventListener('resize', handleResize);

      return () => {

         window.removeEventListener('resize', handleResize);

         if (seekerParticles.current) {
            seekerParticles.current.unmount();
            seekerParticles.current = undefined; //free memory on unmount
         }

      };

   }, []);

   //let's go!
   return <CanvasContainer ref={canvasContainer} />;

};

const CanvasContainer = styled.div`

   position: relative;
   cursor: crosshair;
   display: block;
   width: 100%;
   height: 100vh;
   z-index: -1;

`;