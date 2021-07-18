import styled, { keyframes } from 'styled-components';
import { Button } from './styled/project';

export const DemoLink: React.FC<{ link: string }> = ({ link }) => {

   return (
      <DemoLinkButton href={link}>
         <RocketIcon>🚀</RocketIcon>
         <LinkText>Live site</LinkText>
      </DemoLinkButton>
   );

};

const takeoff = keyframes`

   0%{ transform: translate(0px, 0px); }
   49.999%{ transform: translate(40px, -40px); }
   50%{ transform: translate(-40px, 40px); }
   100%{ transform: translate(0px, 0px); }

`;

const RocketIcon = styled.i`

   line-height: 15px;
   display: inline-block;
   margin-right: 10px;
   animation-duration: 1.2s;
   animation-timing-function: cubic-bezier(.4,-0.63,.53,1.59);
   animation-fill-mode: backwards;

`;


const LinkText = styled.span`
   
   color: white;
   
`;

const DemoLinkButton = styled(Button)`

   background: #414344;
   display: inline-block;
   transition-property: background;
   transition-duration: .4s;
   overflow: hidden;

   &:hover{
      
      background: #9c07c6;

      ${RocketIcon}{ animation-name: ${takeoff}; }
   
   }

`