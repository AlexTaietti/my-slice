import styled from "styled-components";

export const Button = styled.a`

   white-space: nowrap;
   border-radius: 5px;
   font-size: 1.5rem;
   display: inline-flex;
   align-items: center;
   cursor: pointer;
   padding: 10px 15px;

   &:not(:last-of-type){ margin-right: 10px; }

`;