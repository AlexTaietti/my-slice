import styled from 'styled-components';

export const PikachuButton: React.FC<{ handleClick?: () => void }> = ({ handleClick }) => {

   return <Button onClick={handleClick}>Nah, don't care</Button>

};

const Button = styled.button`

   background: #fed530;
   padding: 10px 15px;
   transition-property: background;
   transition-duration: .4s;

   &:hover{ background: #fe9130; }

   @media screen and (max-width: 500px){ display: none; }

`;