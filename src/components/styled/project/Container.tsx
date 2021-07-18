import styled from 'styled-components';
import { Content } from './Content';

export const Container = styled.div`
   
   position: relative;
   overflow: hidden;

   @media screen and (min-width: 1024px){

      &:nth-child(even) ${Content}{ flex-direction: row-reverse; }

   }

`;