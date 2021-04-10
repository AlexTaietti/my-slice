import React from 'react';
import ReactDOM from 'react-dom';
import { Slice } from './Slice';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

   *, *::before, *::after{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
   }

   html{ font-size: 10px; }

   html, body{
      display: block;
      margin: 0;
      width: 100%;
      height: 100%;
   }

   canvas{ display: block; }

   button {
      outline: none;
      border: none;
      cursor: pointer;
   }

   a{
      text-decoration: none;
      color: inherit;
   }

   #slice{
      display: block;
      width: 100%;
      height: 100%;
   }

`;

ReactDOM.render(
   <React.StrictMode>
      <GlobalStyle />
      <Slice />
   </React.StrictMode>,
   document.getElementById('slice')
);