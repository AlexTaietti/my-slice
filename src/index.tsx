import React from 'react';
import ReactDOM from 'react-dom';
import { Slice } from './Slice';
import { createGlobalStyle } from 'styled-components';

import './style/global-fonts.css';

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
      height: 100%;
      width: 100%;
      min-height: 100%;
      min-width: 100%;
   }

   canvas{ display: block; }

   #slice{
      display: block;
      margin: 0;
      position: relative;
      height: 100%;
      width: 100%;
      min-height: 100%;
      min-width: 100%;
   }

`;

ReactDOM.render(
   <React.StrictMode>
      <GlobalStyle />
      <Slice />
   </React.StrictMode>,
   document.getElementById('slice')
);