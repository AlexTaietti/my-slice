import styled from 'styled-components';

export const DemoLink: React.FC<{ link: string }> = ({ link }) => {

   return (
      <DemoButton className='demo'>
         <a href={link}><i>🚀</i>Live site</a>
      </DemoButton>
   );

};

const DemoButton = styled.button`

   background: #414344;
   color: white;
   transition-property: background;
   transition-duration: .4s;

   i{
      line-height: 15px;
      margin-right: 10px;
   }

   &:hover{ background: #9c07c6; }

`