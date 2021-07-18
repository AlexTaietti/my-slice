import styled from 'styled-components'

export const Content = styled.div`

   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 10%;
   max-width: 1400px;
   width: 100%;
   margin: 0 auto;

   @media screen and (min-width: 1024px){

      justify-content: space-evenly;
      flex-direction: row;
      padding: 5%;
      min-height: 650px;
   
   }

`;