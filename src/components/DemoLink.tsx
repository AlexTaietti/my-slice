import styled, { keyframes } from 'styled-components';

export const DemoLink: React.FC<{ link: string }> = ({ link }) => {

   return (
      <DemoButton className='demo'>
         <a href={link}><i>🚀</i>Live site</a>
      </DemoButton>
   );

};

const takeoff = keyframes`

   0%{ transform: translate(0px, 0px); }
   49.999%{ transform: translate(40px, -40px); }
   50%{ transform: translate(-40px, 40px); }
   100%{ transform: translate(0px, 0px); }

`;

const DemoButton = styled.button`

   background: #414344;
   display: inline-block;
   color: white;
   transition-property: background;
   transition-duration: .4s;
   overflow: hidden;

   i{
      line-height: 15px;
      margin-right: 10px;
      animation-duration: 1.2s;
      animation-timing-function: cubic-bezier(.4,-0.63,.53,1.59);
      animation-fill-mode: backwards;
   }

   &:hover{
      
      background: #9c07c6;

      i{ animation-name: ${takeoff}; }
   
   }

`