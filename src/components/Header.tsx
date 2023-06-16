import styled, { keyframes } from 'styled-components';
import { Particles } from './Particles';

export const Header: React.FC = () => {

   const scrollToBio = () => {

      const bio = (document.getElementById('bio') as HTMLDivElement).getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
         top: bio,
         behavior: 'smooth'
      });

   };

   return (
      <Hero id='hero'>
         <Particles />
         <div className="greeting">
            <div className="inner">
               <span>W</span><span>e</span><span>l</span><span>c</span><span>o</span><span>m</span><span>e</span><span>!</span><span>👋</span>
            </div>
         </div>
         <ScrollTrigger onClick={scrollToBio}>Get to know me</ScrollTrigger>
      </Hero>
   );

};

const pulse = keyframes`

   0%{ transform: translateY(0px); }

   20%{ transform: translateY(10px); }

   40%{ transform: translateY(0px); }

`;

const ScrollTrigger = styled.span`

   font-size: 2.2rem;
   position: absolute;
   bottom: 3%;
   display: inline-block;
   cursor: pointer;
   color: white;
   font-family: 'Oswald', sans-serif;
   text-align: center;

   &::after{
      animation-name: ${pulse};
      animation-duration: 2s;
      animation-iteration-count: infinite;
      margin-top: 5px;
      display: block;
      content: '👇';
   }

   &:hover::after{
      animation: none;
      content: '🤘';
   }

`;

const Hero = styled.header`

   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
   width: 100%;
   height: 100%;
   position: relative;
   overflow: hidden;
   z-index: 0;
   background: #030303;
   min-height: 600px;

   .greeting {

      font-family: Oswald, serif;
      font-size: 8rem;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
      letter-spacing: -5px;

      .inner {

         white-space: nowrap;
         perspective: 275px;
      
         span {
            transition: all .5s;
            display: inline-block;
            transform: rotateY(0deg);
         }
      
         &:hover {
      
            @for $i from 1 through 9 {
               $delay: 0.03s * $i;
               span:nth-of-type( #{$i}) {
                  transition-delay: $delay;
               }
            }
      
            span {
               transform: rotateY(360deg);
            }
      
         }
      
         @for $i from 1 through 9 {
      
            $target: #{10-$i};
            $delay: 0.03s * $i;
      
            span:nth-of-type( #{$target}) {
               transition-delay: $delay;
            }
      
         }
      
      }

   }

   @media only screen and (min-width: 650px) {
      .greeting{ font-size: 11rem; }
   }

   @media only screen and (min-width: 1200px) {
      .greeting{ font-size: 15rem; }
   }


`;